import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './PageView.scss';
import PageDetail from './PageDetail/PageDetail';
import PageMaster from './PageMaster/PageMaster';

function PageView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PageMaster, PageDetail };
export default PageView;
