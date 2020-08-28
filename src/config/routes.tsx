import { RouteConfig } from 'react-router-config';
import path from 'path';
import nameof from 'ts-nameof.macro';
import { GeneralActions } from 'config/general-actions';

import { INDIRECT_SALES_ORDER_ROUTE_PREFIX, PROVINCE_ROOT_ROUTE, PROVINCE_DETAIL_ROUTE, PROVINCE_ROUTE, PAYMENT_REQUEST_ROOT_ROUTE, PAYMENT_REQUEST_DETAIL_ROUTE, PAYMENT_REQUEST_ROUTE } from 'config/route-consts';
import ProvinceMasterView from 'views/App/ProvinceView/ProvinceMasterView/ProvinceMasterView';
import ProvinceDetailView from 'views/App/ProvinceView/ProvinceDetailView/ProvinceDetailView';
import AppMain from 'components/AppMain/AppMain';
import IndirectSalesOrderView from 'views/App/IndirectSalesOrderView/IndirectSalesOrderView';
import IndirectSalesOrderMasterView from 'views/App/IndirectSalesOrderView/IndirectSalesOrderMasterView/IndirectSalesOrderMasterView';
import IndirectSalesOrderDetailView from 'views/App/IndirectSalesOrderView/IndirectSalesOrderDetailView/IndirectSalesOrderDetailView';
import ProvinceView from 'views/App/ProvinceView/ProvinceView';
import PaymentRequestView, { PaymentRequestDetailView, PaymentRequestMasterView } from 'views/App/PaymentRequestView/PaymentRequestView';

// const ProvinceView = React.lazy(() => import('views/App/ProvinceView/ProvinceView'));

export const routes: RouteConfig[] = [
  {
    key: 'main',
    path: '/',
    component: AppMain,
    routes: [
      {
        path: PAYMENT_REQUEST_ROOT_ROUTE,
        component: PaymentRequestView,
        children: [
          {
            path: path.join(PAYMENT_REQUEST_DETAIL_ROUTE, ':id'),
            component: PaymentRequestDetailView,
          },
          {
            path: path.join(PAYMENT_REQUEST_ROUTE),
            component: PaymentRequestMasterView,
          },
        ],
      },
      {
        path: PROVINCE_ROOT_ROUTE,
        component: ProvinceView,
        children: [
          {
            path: path.join(PROVINCE_DETAIL_ROUTE, ':id'),
            component: ProvinceDetailView,
          },
          {
            path: path.join(PROVINCE_ROUTE),
            component: ProvinceMasterView,
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
