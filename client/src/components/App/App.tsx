import React, { FunctionComponent, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Context
import { Provider } from '../../helpers/Context';

// Helper
import FetchAPI from '../../helpers/fetch';

// Component
import Login from '../Login/index';
import Signup from '../Signup/index';
import Home from '../Home/index';
import Profile from '../Profile/index';

// Interface
import { UserInterface, UpdateUserInterface } from '../../helpers/Interface';

const App: FunctionComponent = () => {
    // State
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [errorSignup, setErrorSignup] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);

    // Use Effect
    useEffect(() => {
        const token: string = localStorage.getItem('token');

        fetch('/api/check', {
            method: 'GEt',
            headers: {
                'access-token': token,
            },
        })
            .then(res => res.json())
            .then(result => {
                const { token } = result;

                if (token) {
                    const { data } = result;

                    setIsLogin(true);
                    setUser(data.data);
                } else {
                    localStorage.removeItem('token');
                }
            });
    }, []);

    // Hande Signup Function
    const handleSignup = async (
        user: string,
        pass: string,
        fullName: string,
    ): Promise<void> => {
        const url = '/api/signup';
        const fetchData = await FetchAPI(url, user, pass, fullName);

        const { signup } = fetchData;

        if (signup) {
            window.location.href = '/';
        } else {
            const { message } = fetchData;

            setErrorSignup(message);
        }
    };

    // Hande Login Function
    const handleLogin = async (
        user: string,
        pass: string,
        keep: boolean,
    ): Promise<void> => {
        const url = '/api/login';
        const fetchData = await FetchAPI(url, user, pass, null, keep);

        const { login } = fetchData;

        if (login) {
            const { token, data } = fetchData;

            localStorage.setItem('token', token);
            setIsLogin(login);
            setUser(data);
        } else {
            const { message } = fetchData;

            setErrorLogin(message);
        }
    };

    // Handle Logout Function
    const hanldeLogout = (): void => {
        setIsLogin(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    // Handle Fetch Avatar
    const handleFetchAvatar = (data: FormData): void => {
        fetch('/api/profile', {
            method: 'POST',
            body: data,
        })
            .then(res => res.json())
            .then((result: UpdateUserInterface) => {
                const { profile, fullName, avatar } = result;

                let newUser: UserInterface;

                if (profile) {
                    newUser = {
                        ...user,
                        fullName: fullName,
                        avatar: avatar,
                    };
                } else {
                    newUser = {
                        ...user,
                        fullName: fullName,
                    };
                }

                setUser(() => newUser);

                localStorage.removeItem('token');
            });
    };

    return (
        <Provider
            value={{
                ...user,
                logout: hanldeLogout,
            }}>
            <Router>
                <Switch>
                    <Route path='/profile'>
                        {user && (
                            <Profile
                                avatar={user.avatar}
                                fullName={user.fullName}
                                user={user.user}
                                id={user.id}
                                handleFetchAvatar={handleFetchAvatar}
                            />
                        )}
                    </Route>
                    <Route path='/signup'>
                        <Signup
                            handleSignup={handleSignup}
                            error={errorSignup}
                        />
                    </Route>
                    <Route path='/'>
                        {isLogin ? (
                            <Home />
                        ) : (
                            <Login
                                handleLogin={handleLogin}
                                error={errorLogin}
                            />
                        )}
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
