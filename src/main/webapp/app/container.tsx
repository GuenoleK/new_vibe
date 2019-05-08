import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { VibeLayout } from 'app/components/layout-components/layout';
import './container.scss';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from '.';
import { userStore } from './stores/user-store';
import { observable } from 'mobx';
import { userApi } from './api/user-apix';
import { observer } from 'mobx-react';

@observer
export class Container extends React.Component {
  @observable
  canRenderChildren = false;
  render() {
    return (
      <div data-component="vibe-container">
        <MuiThemeProvider theme={theme}>
          <Router>{this.canRenderChildren && <VibeLayout />}</Router>
        </MuiThemeProvider>
      </div>
    );
  }

  /**
   * Here we initialize the data for everywhere
   */
  async componentDidMount() {
    userStore.user = await userStore.initUserStore();
    if (userStore.user && userStore.user.id) {
      userStore.extendedUser = await userApi.getExtendedUser(userStore.user.id);
    }
    this.canRenderChildren = true;
  }
}
