import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';

// API
import APIs from './API/api';

// Config Process ENV
dotenv.config();

// Connect Database
mongoose.connect('mongodb://localhost:27017/chat-group-runtime', {
    useNewUrlParser: true,
});
mongoose.connection.on(
    'error',
    console.error.bind(console, 'Connection Error'),
);
mongoose.connection.once('open', () => {
    console.log('Database is connection!');
});

const app: Application = express();

const PORT: number = parseInt(process.env.PORT as string);
const corsOption: CorsOptions = {
    origin: 'http://localhost:8080',
};

// App Use
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOption));
// App Use API
app.use('/api', APIs);

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(PORT, () => console.log(`Server runnint is port ${PORT}`));
