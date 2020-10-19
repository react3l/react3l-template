import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './PermissionContentView.scss';
import PermissionContentDetail from './PermissionContentDetail/PermissionContentDetail';
import PermissionContentMaster from './PermissionContentMaster/PermissionContentMaster';

function PermissionContentView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PermissionContentMaster, PermissionContentDetail };
export default PermissionContentView;
