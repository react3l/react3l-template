import React from 'react';
import {RouteConfig} from 'react-router-config';
import path from 'path';
import nameof from 'ts-nameof.macro';
import {GeneralActions} from 'config/general-actions';

import {PROVINCE_ROUTE_PREFIX} from 'config/route-consts';
import ProvinceMasterView from 'views/App/ProvinceView/ProvinceMasterView/ProvinceMasterView';
import ProvinceDetailView from 'views/App/ProvinceView/ProvinceDetailView/ProvinceDetailView';

const ProvinceView = React.lazy(() => import('views/App/ProvinceView/ProvinceView'));

export const routes: RouteConfig[] = [
  {
    path: PROVINCE_ROUTE_PREFIX,
    component: ProvinceView,
    routes: [
      {
        path: path.join(PROVINCE_ROUTE_PREFIX),
        component: ProvinceMasterView,
        exact: true,
      },
      {
        path: path.join(PROVINCE_ROUTE_PREFIX, nameof(GeneralActions.create)),
        component: ProvinceDetailView,
      },
      {
        path: path.join(PROVINCE_ROUTE_PREFIX, ':id'),
        component: ProvinceDetailView,
      },
    ],
  },
];
