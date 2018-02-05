import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Redirect, IndexRoute } from 'react-router';

import './styles/button.css';
import './styles/card.css';

import Layout from '../components/Layout'
import Home from '../components/Home/Home';
import NewPlayer from '../components/Player/NewPlayer';
import MyNavbar from '../components/navbar';
import Page404 from './Page404'

const routes =
    <Route component={Layout}>
        <Redirect from='/' to='/home' />
        {/* <Route path='/' component={Layout} /> */}
        <Route path="/home" component={Home} />
        <Route path='players' >
            <IndexRoute component={Home} />
            {/* <Route path=':playerId' component={Show} /> */}
            <Route path='new' component={NewPlayer} />
        </Route>
        {/* <Route component={Page404} /> */}
    </Route>;

export default routes;