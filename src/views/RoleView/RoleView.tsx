import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './RoleView.scss';
import RoleDetail from './RoleDetail/RoleDetail';
import RoleMaster from './RoleMaster/RoleMaster';

function RoleView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { RoleMaster, RoleDetail };
export default RoleView;
