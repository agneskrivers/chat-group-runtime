import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

// Style
import Style from './_index.scss';

interface Props {
    avatar: string;
    fullName: string;
    logout: () => void;
}

const User: FunctionComponent<Props> = (props: Props) => {
    const { avatar, fullName, logout } = props;

    const urlAvatar: string =
        avatar && avatar.length !== 0
            ? avatar
            : 'https://picsum.photos/100/100';

    // Handle Event
    const handleClickLougout = (): void => logout();

    return (
        <div className={Style.profile}>
            <Link
                to='/profile'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                }}>
                <div
                    className={Style.avatar}
                    style={{ backgroundImage: `url(${urlAvatar})` }}></div>
                <div className={Style.name}>{fullName}</div>
            </Link>
            <div className={Style.logout} onClick={handleClickLougout}>
                Log Out
            </div>
        </div>
    );
};

export default User;
