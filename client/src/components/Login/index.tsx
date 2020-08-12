import React, {
    FunctionComponent,
    ChangeEvent,
    MouseEvent,
    useState,
} from 'react';
import { Link } from 'react-router-dom';

// Style
import Style from './_index.scss';

// Helper
import validation from '../../helpers/validationLogin';

// Interface
interface Props {
    handleLogin: (user: string, pass: string, keep: boolean) => Promise<void>;
    error: string;
}

const Login: FunctionComponent<Props> = (props: Props) => {
    // Props
    const { handleLogin, error } = props;

    // State
    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);
    const [keep, setKeep] = useState(false);
    const [errorValidation, setErrorValidation] = useState([]);

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
            setErrorValidation(errorNew);
            return;
        }

        handleLogin(user, pass, keep);
    };
    const handleClickKeep = (): void => {
        setKeep(!keep);
    };

    return (
        <div className={Style.login}>
            <h1 className={Style.title}>Chat Group Runtime</h1>
            {errorValidation &&
                errorValidation.map((item, index) => (
                    <div className={Style.error} key={index}>
                        {item}
                    </div>
                ))}
            {error && <div className={Style.error}>{error}</div>}
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
                <input type='checkbox' onClick={handleClickKeep} />
                <p className={Style.remember_text}>Duy trì đăng nhập</p>
            </div>
            <Link className={Style.signup} to='/signup'>
                Đăng Ký
            </Link>
        </div>
    );
};

export default Login;
