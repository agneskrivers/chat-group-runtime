import React, {
    FunctionComponent,
    useState,
    ChangeEvent,
    MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';

// Style
import Style from './_index.scss';

// Hepler
import validation from '../../helpers/validationLogin';

const Signup: FunctionComponent = () => {
    // State
    const [fullName, setFullName] = useState(null);
    const [user, setUser] = useState(null);
    const [pass, setPass] = useState(null);
    const [error, setError] = useState([]);

    // Handle Event Change
    const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>): void => {
        const newEvent = e.target.value;

        setFullName(newEvent);
    };
    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>): void => {
        const newEvent = e.target.value;

        setUser(newEvent);
    };
    const handleChangePass = (e: ChangeEvent<HTMLInputElement>): void => {
        const newEvent = e.target.value;

        setPass(newEvent);
    };

    // Handle Event Click
    const handleClickSummit = (e: MouseEvent): void => {
        e.preventDefault();
        const checkError: string[] = validation(user, pass);

        if (checkError.length !== 0) {
            setError(checkError);
            return;
        }

        console.log(fullName, user, pass);
    };

    return (
        <div className={Style.signup}>
            <h3 className={Style.text}>Sign Up</h3>
            <h1 className={Style.title}>Chat Group Runtime</h1>
            {error &&
                error.map((item, index) => (
                    <div className={Style.error} key={index}>
                        {item}
                    </div>
                ))}
            <input
                className={Style.input}
                type='text'
                onChange={handleChangeFullName}
                placeholder='Full Name'
            />
            <input
                className={Style.input}
                type='text'
                onChange={handleChangeUser}
                placeholder='Username'
            />
            <input
                className={Style.input}
                type='password'
                onChange={handleChangePass}
                placeholder='Password'
            />
            <button className={Style.summit} onClick={handleClickSummit}>
                Đăng Kí
            </button>
            <Link className={Style.login} to='/'>
                Đăng Nhập
            </Link>
        </div>
    );
};

export default Signup;
