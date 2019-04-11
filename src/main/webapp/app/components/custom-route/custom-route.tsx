import React from 'react';
import { userStore } from 'app/stores/user-store';
import { Route, Redirect } from 'react-router';

interface ICustomRouteProps {
  component: any;
  path: string;
}

export class CustomRoute extends React.Component<ICustomRouteProps> {
  render() {
    return <div>{this.InternalRoute}</div>;
  }

  get InternalRoute() {
    const { path, component } = this.props;
    if (userStore.icConnected) {
      return <Route exact path={path} component={component} />;
    }
    return (
      <Route exact path={path}>
        <Redirect to="/" />
      </Route>
    );
  }
}
