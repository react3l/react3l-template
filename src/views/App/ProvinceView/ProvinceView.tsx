import React from 'react';
import 'views/App/ProvinceView/ProvinceView.scss';
import {Switch} from 'react-router';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';

function ProvinceView(props: Partial<RouteConfigComponentProps>) {
  const {route} = props;

  return (
    <Switch>
      {route?.routes instanceof Array && renderRoutes(route.routes)}
    </Switch>
  );
}

export default ProvinceView;
