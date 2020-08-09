import React, { FunctionComponent } from 'react';

// Style
import Style from './_index.scss';

const Profile: FunctionComponent = () => {
    return (
        <div className={Style.profile}>
            <div className={Style.avatar}></div>
            <div className={Style.name}>Test chat</div>
            <div className={Style.logout}>Log Out</div>
        </div>
    );
};

export default Profile;
