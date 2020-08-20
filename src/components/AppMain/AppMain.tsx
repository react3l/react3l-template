import React from 'react';
import { Switch } from 'react-router';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import './AppMain.scss';
function AppMain(props: RouteConfigComponentProps) {
  const { route } = props;

  return (
    <div className="app-content">
      <Switch>
        {route?.routes instanceof Array && renderRoutes(route.routes)}
      </Switch>
    </div>
  );
}

export default AppMain;
