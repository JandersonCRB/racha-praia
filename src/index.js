import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router, browserHistory } from 'react-router';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import stores from './stores';
import { Provider } from 'mobx-react';

import routes from './routes';
import { api } from 'fronto-api';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: red[300],
            main: red[700],
            dark: red[700],
        },
        secondary: {
            light: grey.A200,
            main: grey[300],
            dark: grey.A700,
        },
    },
});

const endpoint = api({
    endpoint: 'http://localhost:3000/',
    header: (h) => {
        h.append('Content-Type', 'application/json');
        h.append('Authorization', localStorage.getItem('token'));
    }
});

const models = {
    match: new stores.Match(endpoint),
    player: new stores.Player(endpoint),
}
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider {...stores} {...models}>
            <Router routes={routes} history={browserHistory} />
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
