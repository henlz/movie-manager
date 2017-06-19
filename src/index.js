import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store, {history} from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const target = document.querySelector('#root');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();
