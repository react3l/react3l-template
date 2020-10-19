import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './ThemeView.scss';
import ThemeDetail from './ThemeDetail/ThemeDetail';
import ThemeMaster from './ThemeMaster/ThemeMaster';

function ThemeView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { ThemeMaster, ThemeDetail };
export default ThemeView;
