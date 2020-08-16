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

interface SignupInterface {
    user: string;
    pass: string;
}

const App: FunctionComponent = () => {
    // State
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [errorSignup, setErrorSignup] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);

    // Use Effect
    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:9000/api/check', {
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
        const url = 'http://localhost:9000/api/signup';
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
        const url = 'http://localhost:9000/api/login';
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

    return (
        <Provider
            value={{
                ...user,
                logout: hanldeLogout,
            }}>
            <Router>
                <Switch>
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
