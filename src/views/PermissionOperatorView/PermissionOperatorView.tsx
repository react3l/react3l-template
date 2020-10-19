import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './PermissionOperatorView.scss';
import PermissionOperatorDetail from './PermissionOperatorDetail/PermissionOperatorDetail';
import PermissionOperatorMaster from './PermissionOperatorMaster/PermissionOperatorMaster';

function PermissionOperatorView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PermissionOperatorMaster, PermissionOperatorDetail };
export default PermissionOperatorView;
