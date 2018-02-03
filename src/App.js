import React, { Component } from 'react';
import Index from './components/index.js'

import stores from './stores';

import { Provider } from 'mobx-react';

class App extends Component {
  render() {
    return (
      <Provider contacts={stores.contacts}>
        <Index />
      </Provider>
    )
  }
}

export default App;
