import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './SiteView.scss';
import SiteDetail from './SiteDetail/SiteDetail';
import SiteMaster from './SiteMaster/SiteMaster';

function SiteView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { SiteMaster, SiteDetail };
export default SiteView;
