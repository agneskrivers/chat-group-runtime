import React, { FunctionComponent } from 'react';

// Component SVG
import SearchSVG from '../SVGs/Search/index';

// Style
import Style from './_index.scss';

interface Props {
    users: UserInterface[];
    idUser: string;
}
interface UserInterface {
    id: string;
    avatar: string;
    fullName: string;
}

const Online: FunctionComponent<Props> = (props: Props) => {
    const { users, idUser } = props;

    return (
        <div className={Style.online}>
            <div className={Style.search}>
                <input
                    className={Style.search_text}
                    type='text'
                    placeholder='Search...'
                />
                <SearchSVG />
            </div>
            <div className={Style.users}>
                {users &&
                    users.map(
                        (user: UserInterface): JSX.Element => {
                            const { id, fullName, avatar } = user;
                            const urlAvatar =
                                avatar && avatar.length !== 0
                                    ? avatar
                                    : 'https://picsum.photos/200/300';

                            if (id && id !== idUser) {
                                return (
                                    <div className={Style.user} key={id}>
                                        <div
                                            className={Style.avatar}
                                            style={{
                                                backgroundImage: `url(${urlAvatar})`,
                                            }}></div>
                                        <div className={Style.name}>
                                            {fullName}
                                        </div>
                                        <div className={Style.active}></div>
                                    </div>
                                );
                            }
                        },
                    )}
            </div>
        </div>
    );
};

export default Online;
