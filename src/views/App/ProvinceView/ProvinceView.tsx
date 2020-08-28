// import { renderRouteChildren } from 'helpers/react-router';
import React from 'react';
import { Switch } from 'react-router';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import 'views/App/ProvinceView/ProvinceView.scss';
import ProvinceDetailView from './ProvinceDetailView/ProvinceDetailView';
import ProvinceMasterView from './ProvinceMasterView/ProvinceMasterView';

function ProvinceView(props: RouteConfigComponentProps) {
  const { route } = props;
  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { ProvinceMasterView, ProvinceDetailView };
export default ProvinceView;
