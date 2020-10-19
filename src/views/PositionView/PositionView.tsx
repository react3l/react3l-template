import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './PositionView.scss';
import PositionDetail from './PositionDetail/PositionDetail';
import PositionMaster from './PositionMaster/PositionMaster';

function PositionView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PositionMaster, PositionDetail };
export default PositionView;
