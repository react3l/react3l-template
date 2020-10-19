import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './ProvinceView.scss';
import ProvinceDetail from './ProvinceDetail/ProvinceDetail';
import ProvinceMaster from './ProvinceMaster/ProvinceMaster';

function ProvinceView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { ProvinceMaster, ProvinceDetail };
export default ProvinceView;
