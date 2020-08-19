import React from 'react';
import { Switch, withRouter } from 'react-router';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import './AppMain.scss';
function AppMain(props: RouteConfigComponentProps) {
  const { route } = props;

  return (
    <main>
      <Switch>
        {route?.routes instanceof Array && renderRoutes(route.routes)}
      </Switch>
    </main>
  );
}

export default withRouter(AppMain);
