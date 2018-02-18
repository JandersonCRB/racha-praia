import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router, browserHistory } from 'react-router';

import stores from './stores';
import { Provider } from 'mobx-react';

import routes from './routes';

ReactDOM.render(
    <Provider {...stores}>
        <Router routes={routes} history={browserHistory} />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
