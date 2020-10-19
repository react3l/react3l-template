import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './PermissionView.scss';
import PermissionDetail from './PermissionDetail/PermissionDetail';
import PermissionMaster from './PermissionMaster/PermissionMaster';

function PermissionView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PermissionMaster, PermissionDetail };
export default PermissionView;
