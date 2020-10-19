import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './ActionView.scss';
import ActionDetail from './ActionDetail/ActionDetail';
import ActionMaster from './ActionMaster/ActionMaster';

function ActionView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { ActionMaster, ActionDetail };
export default ActionView;
