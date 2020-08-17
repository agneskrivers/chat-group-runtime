import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from 'react';

// Helper
import Context from '../../helpers/Context';
import Websocket from '../../helpers/Websocket';

// Component
import Online from '../Online/index';
import User from '../User/index';
import ChatBox from '../ChatBox/index';

// Style
import Style from './_index.scss';

// Interface
import {
    ContextInterface,
    UserOnline,
    ChatTextInterface,
} from '../../helpers/Interface';

const Home: FunctionComponent = () => {
    // State
    const [usersOnline, setUsersOnline] = useState(null);
    const [chatTexts, setChatTexts] = useState(null);

    // Context
    const { id, user, fullName, avatar, logout }: ContextInterface = useContext<
        ContextInterface
    >(Context);

    // Effect
    useEffect(() => {
        Websocket.send(
            JSON.stringify({
                type: 'online',
                data: { id, user, fullName, avatar },
            }),
        );
    }, [id]);
    useEffect(() => {
        return () => {
            Websocket.send(JSON.stringify({ type: 'offline' }));
            Websocket.close();
        };
    }, []);

    // Web Socket
    Websocket.onmessage = message => {
        const messageParse = JSON.parse(message.data.toString());
        const type: string = messageParse.type;
        const { data } = messageParse;

        if (type === 'user-online') {
            setUsersOnline(data);
        }

        if (type === 'data-first') {
            const { online, chatData } = data;

            setUsersOnline(() => online);
            setChatTexts(() => chatData);
        }

        if (type === 'offline') {
            const oldUsersOnline: UserOnline[] = [...usersOnline];
            const findIDOffline: UserOnline = oldUsersOnline.find(
                (user: UserOnline) => user.id === data,
            );
            const indexOffline: number = oldUsersOnline.indexOf(findIDOffline);

            const newUsersOnline: UserOnline[] = [
                ...oldUsersOnline.slice(0, indexOffline),
                ...oldUsersOnline.slice(
                    indexOffline + 1,
                    oldUsersOnline.length,
                ),
            ];

            setUsersOnline(() => newUsersOnline);
        }

        if (type === 'new-text') {
            const newChatTexts: ChatTextInterface[] = [...chatTexts, data];

            setChatTexts(newChatTexts);
        }
    };

    // Handle Event
    const handleSendChatText = (text: string): void => {
        const newChatText: ChatTextInterface = {
            idUser: id,
            fullName: fullName,
            text: text,
            avatar: avatar,
        };

        if (chatTexts) {
            Websocket.send(
                JSON.stringify({ type: 'new-text', data: newChatText }),
            );
        }
    };

    return (
        <div className={Style.home}>
            <div className={Style.left}>
                {fullName && (
                    <User avatar={avatar} fullName={fullName} logout={logout} />
                )}
                <Online users={usersOnline} idUser={id} />
            </div>
            <div className={Style.right}>
                <ChatBox
                    data={chatTexts}
                    idAdmin={id}
                    handleSendChatText={handleSendChatText}
                />
            </div>
        </div>
    );
};

export default Home;
