import React, { FunctionComponent } from 'react';

// Component SVG
import SearchSVG from '../SVGs/Search/index';

// Style
import Style from './_index.scss';

const Online: FunctionComponent = () => {
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
                <div className={Style.user}>
                    <div className={Style.avatar}></div>
                    <div className={Style.name}>Test Chat</div>
                    <div className={Style.active}></div>
                </div>
            </div>
        </div>
    );
};

export default Online;
