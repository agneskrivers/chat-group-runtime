import React, { FunctionComponent } from 'react';

// Component
import Online from '../Online/index';
import Profile from '../User/index';
import ChatBox from '../ChatBox/index';

// Style
import Style from './_index.scss';

const Home: FunctionComponent = () => {
    return (
        <div className={Style.home}>
            <div className={Style.left}>
                <Profile />
                <Online />
            </div>
            <div className={Style.right}>
                <ChatBox />
            </div>
        </div>
    );
};

export default Home;
