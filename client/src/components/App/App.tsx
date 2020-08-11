import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Component
import Login from '../Login/index';
import Signup from '../Signup/index';
import Home from '../Home/index';

const App: FunctionComponent = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUsers] = useState(null);

    return (
        <Router>
            <Switch>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/'>{isLogin ? <Home /> : <Login />}</Route>
            </Switch>
        </Router>
    );
};

export default App;
