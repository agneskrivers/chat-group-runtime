import React, { FunctionComponent, useEffect, useRef } from 'react';

// Component
import ChatText from '../ChatText/index';

// Style
import Style from './_index.scss';

const ChatBox: FunctionComponent = () => {
    const scrollBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <>
            <h2 className={Style.title}>Chat Group Runtime</h2>
            <div className={Style.chat}>
                <div ref={scrollBottomRef} />
            </div>
            <div className={Style.send}>
                <input
                    className={Style.input}
                    type='text'
                    placeholder='Nhập tin nhắn...'
                />
                <button className={Style.button}>Gửi</button>
            </div>
        </>
    );
};

export default ChatBox;
