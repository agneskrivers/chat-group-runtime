import React, {
    FunctionComponent,
    ChangeEvent,
    MouseEvent,
    useState,
} from 'react';

// Style
import Style from './_index.scss';

// Helper
import validation from '../../helpers/validationLogin';

const Login: FunctionComponent = () => {
    // State
    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);
    const [error, setError] = useState([]);

    // Handle Event
    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>): void => {
        const userNew = e.target.value;

        setUser(userNew);
    };
    const handleChangePass = (e: ChangeEvent<HTMLInputElement>): void => {
        const passNew = e.target.value;

        setPass(passNew);
    };
    const handleClickSummit = (e: MouseEvent): void => {
        e.preventDefault();

        const errorNew: string[] = validation(user, pass);

        if (errorNew.length !== 0) {
            setError(errorNew);
            return;
        }

        console.log(
            `
                user: ${user}
                pass: ${pass}
                error: ${error}
            `,
        );
    };

    return (
        <div className={Style.login}>
            <h1 className={Style.title}>Chat Group Runtime</h1>
            {error &&
                error.map((item, index) => (
                    <div className={Style.error} key={index}>
                        {item}
                    </div>
                ))}
            <h3 className={Style.description}>
                Liên hệ ngay với mọi người trong cuộc sống
            </h3>
            <h3 className={Style.start}>Đăng nhập để bắt đầu</h3>
            <input
                className={Style.input}
                type='text'
                placeholder='Username'
                onChange={handleChangeUser}
            />
            <input
                className={Style.input}
                type='password'
                placeholder='Password'
                onChange={handleChangePass}
            />
            <button className={Style.summit} onClick={handleClickSummit}>
                Tiếp Tục
            </button>
            <div className={Style.remember}>
                <input type='checkbox' />
                <p className={Style.remember_text}>Duy trì đăng nhập</p>
            </div>
            <a className={Style.signup} href='/signup'>
                Đăng Ký
            </a>
        </div>
    );
};

export default Login;
