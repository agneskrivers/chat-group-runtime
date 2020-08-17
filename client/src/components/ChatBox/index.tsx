import React, {
    FunctionComponent,
    useEffect,
    useRef,
    useState,
    ChangeEvent,
    KeyboardEvent,
} from 'react';

// Component
import ChatText from '../ChatText/index';

// Style
import Style from './_index.scss';

// Interface
import { ChatTextInterface } from '../../helpers/Interface';
interface Props {
    data: ChatTextInterface[];
    idAdmin: string;
    handleSendChatText: (text: string) => void;
}

const ChatBox: FunctionComponent<Props> = (props: Props) => {
    // Props
    const { data, idAdmin, handleSendChatText } = props;

    // State
    const [active, setActive] = useState(null);
    const [value, setValue] = useState('');

    // Ref
    const scrollBottomRef = useRef<HTMLDivElement>(null);

    // Effect
    useEffect(() => {
        scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    // Handle Event
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const text = e.target.value;

        setValue(text);

        if (text.length > 0) {
            setActive(true);
        }

        if (text.length === 0) {
            setActive(false);
        }
    };
    const handleClickButton = (): void => {
        if (active) {
            handleSendChatText(value);
            setValue('');
            setActive(false);
        }
    };
    const handleEnterChat = (e: KeyboardEvent): void => {
        e.preventDefault();

        if (e.keyCode === 13) {
            handleClickButton();
        }
    };

    return (
        <>
            <h2 className={Style.title}>Chat Group Runtime</h2>
            <div className={Style.chat}>
                {data &&
                    data.map((chat: ChatTextInterface) => {
                        const { id, text, fullName, avatar, idUser } = chat;
                        const urlAvatar =
                            avatar && avatar.length !== 0
                                ? avatar
                                : 'https://picsum.photos/100/100';

                        return (
                            <ChatText
                                key={id}
                                text={text}
                                avatar={urlAvatar}
                                fullName={fullName}
                                me={idAdmin === idUser ? true : false}
                            />
                        );
                    })}
                <div ref={scrollBottomRef} />
            </div>
            <div className={Style.send}>
                <input
                    className={Style.input}
                    type='text'
                    placeholder='Nhập tin nhắn...'
                    onChange={handleChangeInput}
                    onKeyUp={handleEnterChat}
                    value={value}
                />
                <button
                    className={`${Style.button} ${
                        active ? Style.button_active : ''
                    }`}
                    onClick={handleClickButton}>
                    Gửi
                </button>
            </div>
        </>
    );
};

export default ChatBox;
