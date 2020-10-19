import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './AppUserView.scss';
import AppUserDetail from './AppUserDetail/AppUserDetail';
import AppUserMaster from './AppUserMaster/AppUserMaster';

function AppUserView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { AppUserMaster, AppUserDetail };
export default AppUserView;
