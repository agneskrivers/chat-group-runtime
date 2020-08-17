import React, { FunctionComponent, useState, useRef, ChangeEvent } from 'react';

// Style
import Style from './_index.scss';

// Interface
interface Props {
    id: string;
    avatar: string;
    fullName: string;
    user: string;
    handleFetchAvatar: (data: FormData) => void;
}

const Profile: FunctionComponent<Props> = (props: Props) => {
    // Props
    const { id, avatar, fullName, user, handleFetchAvatar } = props;

    // State
    const [fullNameTemp, setFullNameTemp] = useState(() => fullName);
    const [file, setFile] = useState(null);

    const urlAvatar =
        avatar.length !== 0 ? avatar : 'https://picsum.photos/100/100';

    // Ref
    const inputFileRef = useRef(null);

    // Handle Event
    const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>): void =>
        setFullNameTemp(e.target.value);
    const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>): void =>
        setFile(e.target.files[0]);
    const handleClickAvatar = (): void => {
        inputFileRef.current.click();
    };
    const handleClickCancel = (): void => {
        location.href = '/';
    };
    const handleClickSummit = (): void => {
        const data = new FormData();

        data.append('id', id);

        if (!fullNameTemp || fullNameTemp === '') {
            data.append('fullName', fullName);
        } else {
            data.append('fullName', fullNameTemp);
        }

        if (!file) {
            data.append('avatar', avatar);
            data.append('upload', 'false');
        } else {
            data.append('avatar', file);
            data.append('upload', 'true');
        }

        handleFetchAvatar(data);
    };

    return (
        <div className={Style.profile}>
            <div
                className={Style.avatar}
                style={{ backgroundImage: `url(${urlAvatar})` }}
                onClick={handleClickAvatar}></div>
            <input
                ref={inputFileRef}
                type='file'
                style={{ display: 'none' }}
                onChange={handleChangeFileInput}
            />
            <input
                className={Style.input}
                type='text'
                onChange={handleChangeFullName}
                placeholder={fullNameTemp}
            />
            <input
                className={Style.input}
                placeholder={user}
                type='text'
                disabled
            />
            <div className={Style.buttonDiv}>
                <button className={Style.button} onClick={handleClickSummit}>
                    Save
                </button>
                <button className={Style.button} onClick={handleClickCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Profile;
