import {
  PROVINCE_ROUTE_PREFIX,
  INDIRECT_SALES_ORDER_ROUTE_PREFIX,
} from "config/route-consts";
import { RouteConfig } from "react-router-config";
import { translate } from "react3l/helpers";

export const menu: RouteConfig[] = [
  {
    notTitle: true,
    name: translate("menu.provinceTitle"),
    path: "/title-route",
  },
  {
    notTitle: false,
    name: translate("menu.province"),
    path: "/province/master",
    key: "province-title",
    icon: "tio tio-node_multiple",
    children: [
      {
        name: translate("menu.province"),
        path: PROVINCE_ROUTE_PREFIX,
        key: PROVINCE_ROUTE_PREFIX,
        icon: "tio tio-swap_vs",
      },
      {
        name: translate("menu.salesmanMonitor"),
        path: INDIRECT_SALES_ORDER_ROUTE_PREFIX,
        key: INDIRECT_SALES_ORDER_ROUTE_PREFIX,
        icon: "tio tio-poi_user",
      },
    ],
  },
  {
    name: translate("menu.salesmanMonitor"),
    path: INDIRECT_SALES_ORDER_ROUTE_PREFIX,
    key: INDIRECT_SALES_ORDER_ROUTE_PREFIX,
    icon: "tio tio-poi_user",
  },
];
