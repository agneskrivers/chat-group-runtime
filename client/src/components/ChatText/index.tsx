import React, { FunctionComponent } from 'react';

// Style
import Style from './_index.scss';

interface Props {
    text: string;
    avatar: string;
    fullName: string;
    me: boolean;
}

const ChatText: FunctionComponent<Props> = (props: Props) => {
    const { text, avatar, fullName, me } = props;
    const avatarUrl: string =
        avatar.length !== 0 ? avatar : 'https://picsum.photos/100/100';

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
