import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './AppUserPermissionView.scss';
import AppUserPermissionDetail from './AppUserPermissionDetail/AppUserPermissionDetail';
import AppUserPermissionMaster from './AppUserPermissionMaster/AppUserPermissionMaster';

function AppUserPermissionView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { AppUserPermissionMaster, AppUserPermissionDetail };
export default AppUserPermissionView;
