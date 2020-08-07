import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../Login/index';
import Signup from '../Signup/index';

const App: FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
