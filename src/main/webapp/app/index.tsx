import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppComponent from './app';
// import DevTools from './config/devtools';
import { loadIcons } from './config/icon-loader';
import initStore from './config/store';
import ErrorBoundary from './shared/error/error-boundary';


// const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          <Component />
        </div>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);
