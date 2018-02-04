import React, { Component } from 'react';

import Routes from './routes'

import stores from './stores';
import { Provider } from 'mobx-react';



class App extends Component {
  render() {
    return (
      <Provider players={stores.players}>
        <Routes />
      </Provider>
    )
  }
}

export default App;
