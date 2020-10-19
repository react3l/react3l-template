import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './DistrictView.scss';
import DistrictDetail from './DistrictDetail/DistrictDetail';
import DistrictMaster from './DistrictMaster/DistrictMaster';

function DistrictView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { DistrictMaster, DistrictDetail };
export default DistrictView;
