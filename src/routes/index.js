import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Redirect, IndexRoute } from 'react-router';

import './styles/button.css';
import './styles/card.css';

import c from '../components/'
import Page404 from './Page404'

const routes =
    <Route component={c.Layout}>
        <Redirect from='/' to='/home' />
        {/* <Route path='/' component={Layout} /> */}
        <Route path="/home" component={c.Home} />
        <Route path='players' >
            <IndexRoute component={c.Home} />
            {/* <Route path=':playerId' component={Show} /> */}
            <Route path='new' component={c.NewPlayer} />
        </Route>
        <Route path='matches'>
            <IndexRoute component={c.MatchesCollection} />
            <Route path='new' component={c.NewMatch} />
            <Route path=':matchId' component={c.ShowMatch} />
        </Route>
        <Route path='*' component={Page404} />
    </Route>;

export default routes;