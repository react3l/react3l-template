import {PROVINCE_ROUTE_PREFIX} from 'config/route-consts';
import {RouteConfig} from 'react-router-config';
import {translate} from 'react3l/helpers';

export const menu: RouteConfig[] = [
  {
    name: translate('menu.province'),
    path: PROVINCE_ROUTE_PREFIX,
    routes: [
      {
        name: translate('menu.province'),
        path: PROVINCE_ROUTE_PREFIX,
      },
    ],
  },
];
