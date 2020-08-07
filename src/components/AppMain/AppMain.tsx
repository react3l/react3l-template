import React from 'react';
import {Switch} from 'react-router';
import {renderRoutes, RouteConfig} from 'react-router-config';
import './AppMain.scss';

export interface AppMainProps {
  routes: RouteConfig[];
}

function AppMain(props: AppMainProps) {
  const {routes} = props;

  return (
    <main>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </main>
  );
}

export default AppMain;
