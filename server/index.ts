import path from 'path';
import * as http from 'http';
import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import ws from 'ws';
import { v2 as cloudinary } from 'cloudinary';

// Middleware
import Auth from './middlewares/Auth.middleware';

// Model
import ChatTexts from './models/ChatTexts';

// Helper
import {
    MessParseInterface,
    DataTypeOnlineInterface,
    UserOnlineInterface,
    TextDBInterface,
    TextInterface,
    TextDBPopulateInterface,
} from './helpers/interface';

// Interface
interface CustomSocket extends ws {
    id?: string;
    user?: string;
    fullName?: string;
    avatar?: string;
}

// API
import APIs from './API/api';

// TODO: Developer
// // Config Process ENV
// import * as dotenv from 'dotenv';
// dotenv.config();

// Process ENV
const PORT: number = parseInt(process.env.PORT as string);
const URL_MONGO: string = process.env.URL_MONGO as string;
const CLOUD_NAME: string = process.env.CLOUD_NAME as string;
const API_KEY: string = process.env.API_KEY as string;
const API_SECRET: string = process.env.API_SECRET as string;

// Connect Database
mongoose.connect(URL_MONGO, {
    useNewUrlParser: true,
    useFindAndModify: false,
});
mongoose.connection.on(
    'error',
    console.error.bind(console, 'Connection Error'),
);
mongoose.connection.once('open', () => {
    console.log('Database is connection!');
});

// Config Cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

// Config Server
const app: Application = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

// App Use
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(Auth);

// App Use API
app.use('/api', APIs);

// TODO: Product Deploy
app.use(express.static(path.join(__dirname, '/views')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Web Socket
wss.on('connection', (socket: CustomSocket): void => {
    socket.on('message', mess => {
        const messParse = JSON.parse(mess.toString());
        const { type, data } = messParse as MessParseInterface;

        if (type === 'online') {
            const {
                id,
                user,
                fullName,
                avatar,
            } = data as DataTypeOnlineInterface;
            let online: UserOnlineInterface[] = [];

            // Set Id, User, Full Name and Avatar in Socket
            socket.id = id;
            socket.user = user;
            socket.fullName = fullName;
            socket.avatar = avatar;

            wss.clients.forEach((client: CustomSocket): void => {
                if (client.readyState === ws.OPEN) {
                    online.push({
                        id: client.id,
                        fullName: client.fullName,
                        avatar: client.avatar,
                    } as UserOnlineInterface);
                }
            });

            wss.clients.forEach(client => {
                if (client !== socket && client.readyState === ws.OPEN) {
                    client.send(
                        JSON.stringify({ type: 'user-online', data: online }),
                    );
                }
            });

            ChatTexts.find()
                .populate('user')
                .exec((error, result: TextDBPopulateInterface[]) => {
                    if (error) throw error;

                    const newResult: TextInterface[] = result.map(
                        (item: TextDBPopulateInterface): TextInterface => {
                            const { text, id, user } = item;

                            return {
                                id: id,
                                text: text,
                                idUser: user.id,
                                fullName: user.fullName,
                                avatar: user.avatar,
                            };
                        },
                    );

                    socket.send(
                        JSON.stringify({
                            type: 'data-first',
                            data: {
                                online: online,
                                chatData: newResult,
                            },
                        }),
                    );
                });
        }

        if (type === 'offline') {
            wss.clients.forEach((client: CustomSocket): void => {
                if (client !== socket && client.readyState === ws.OPEN) {
                    client.send(
                        JSON.stringify({ type: 'offline', data: socket.id }),
                    );
                }
            });
        }

        if (type === 'new-text') {
            const { idUser, fullName, avatar, text } = data as TextInterface;

            const newChatText = new ChatTexts({
                text: text,
                user: idUser,
            });

            newChatText.save((error, result) => {
                if (error) throw error;

                const { id } = result;

                wss.clients.forEach((client: CustomSocket): void => {
                    if (client.readyState === ws.OPEN) {
                        client.send(
                            JSON.stringify({
                                type: 'new-text',
                                data: {
                                    id: id,
                                    idUser: idUser,
                                    avatar: avatar,
                                    fullName: fullName,
                                    text: text,
                                } as TextInterface,
                            }),
                        );
                    }
                });
            });
        }
    });
});

server.listen(PORT, () => console.log(`Server runnint is port ${PORT}`));
