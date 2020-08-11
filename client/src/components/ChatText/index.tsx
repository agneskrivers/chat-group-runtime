import React, { FunctionComponent } from 'react';

// Style
import Style from './_index.scss';

interface ChatTextProps {
    text: string;
    avatar: string;
    fullName: string;
    me: boolean;
}

const ChatText: FunctionComponent<ChatTextProps> = (props: ChatTextProps) => {
    const { text, avatar, fullName, me } = props;
    let avatarUrl = 'https://picsum.photos/200/300';

    if (avatar.length !== 0) {
        avatarUrl = avatar;
    }

    return (
        <div className={`${Style.chat} ${me ? Style.me : ''}`}>
            {!me && <div className={Style.fullName}>{fullName}</div>}
            <div className={Style.content}>
                <div
                    className={Style.avatar}
                    style={{ backgroundImage: `url(${avatarUrl})` }}></div>
                <div className={Style.text}>{text}</div>
            </div>
        </div>
    );
};

export default ChatText;
