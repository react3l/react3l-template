import React from 'react';
import { RouteConfig } from 'react-router-config';
import path from 'path';
import nameof from 'ts-nameof.macro';
import { GeneralActions } from 'config/general-actions';

import { PROVINCE_ROUTE_PREFIX, INDIRECT_SALES_ORDER_ROUTE_PREFIX } from 'config/route-consts';
import ProvinceMasterView from 'views/App/ProvinceView/ProvinceMasterView/ProvinceMasterView';
import ProvinceDetailView from 'views/App/ProvinceView/ProvinceDetailView/ProvinceDetailView';
import AppMain from 'components/AppMain/AppMain';
import IndirectSalesOrderView from 'views/App/IndirectSalesOrderView/IndirectSalesOrderView';
import IndirectSalesOrderMasterView from 'views/App/IndirectSalesOrderView/IndirectSalesOrderMasterView/IndirectSalesOrderMasterView';
import IndirectSalesOrderDetailView from 'views/App/IndirectSalesOrderView/IndirectSalesOrderDetailView/IndirectSalesOrderDetailView';

const ProvinceView = React.lazy(() => import('views/App/ProvinceView/ProvinceView'));

export const routes: RouteConfig[] = [
  {
    key: 'main',
    path: '',
    component: AppMain,
    routes: [
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

      {
        path: INDIRECT_SALES_ORDER_ROUTE_PREFIX,
        component: IndirectSalesOrderView,
        routes: [
          {
            path: path.join(INDIRECT_SALES_ORDER_ROUTE_PREFIX),
            component: IndirectSalesOrderMasterView,
            exact: true,
          },
          {
            path: path.join(INDIRECT_SALES_ORDER_ROUTE_PREFIX, nameof(GeneralActions.create)),
            component: IndirectSalesOrderDetailView,
          },
          {
            path: path.join(INDIRECT_SALES_ORDER_ROUTE_PREFIX, ':id'),
            component: IndirectSalesOrderDetailView,
          },
        ],
      },

    ],
  },

];
