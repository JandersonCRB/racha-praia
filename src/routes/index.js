import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/button.css';
import './styles/card.css';

import Home from '../components/Home/Home';
import NewPlayer from '../components/Player/NewPlayer';
import MyNavbar from '../components/navbar';

export default () => (
    <BrowserRouter>
        <div>
            <MyNavbar />
            <Switch>
                <Route path="/" exact component={Home} >
                </Route>
                <Route path="/players/new" exact component={NewPlayer} />
                {/* <Route component={Page404} /> */}
            </Switch>
        </div>
    </BrowserRouter>
)