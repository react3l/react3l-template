import {renderRoutes, RouteConfig} from 'react-router-config';

export function renderRouteChildren(route: RouteConfig) {
  return route?.routes instanceof Array && renderRoutes(route.routes);
}
