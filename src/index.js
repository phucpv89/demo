import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

/**
 * Redux and router, remove this if redux is not needed
 */
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

/**
 * createHashHistory: hash history
 * createBrowserHistory: browser history
 * remove this if redux is not needed
 */
import createHistory from 'history/createHashHistory';

/**
 * remove this if redux is not needed
 */
import configureStore from './configure-store';

import App from './containers/app';

/**
 * remove this if redux is not needed
 */
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('root');

/**
 * If using redux and router
 */
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

/**
 * If using redux
 */
// const render = () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     MOUNT_NODE
//   );
// };

/**
 * If not using redux and router
 */
// const render = () => {
//   ReactDOM.render(<App />, MOUNT_NODE);
// };

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./containers/app'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
