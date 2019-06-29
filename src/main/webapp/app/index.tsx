import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from 'react-hot-loader';

import DevTools from './config/devtools';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import { loadIcons } from './config/icon-loader';
import { Container } from 'app/container';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

// Will get the application every 5 minutes to keep it awake (for heroku)
setInterval(() => {
  axios.get('https://epem-vibe.herokuapp.com/#/');
}, 300000); // every 5 minutes (300000)

export const theme = createMuiTheme({
  typography: {
    // Use the system font.
    fontFamily: '"Product Sans"'
  }
});

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const vibeRender = () => ReactDOM.render(<Container />, rootEl);

vibeRender();

const render = Component =>
  ReactDOM.render(
    <ErrorBoundary>
      <AppContainer>
        <Provider store={store}>
          <div>
            {/* If this slows down the app in dev disable it and enable when required  */}
            {devTools}
            <Component />
          </div>
        </Provider>
      </AppContainer>
    </ErrorBoundary>,
    rootEl
  );
// render(AppComponent);
