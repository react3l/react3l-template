import { join } from "path";

export const PROVINCE_ROUTE_PREFIX: string = "/province";

/* product routes */

export const PROVINCE_ROOT_ROUTE: string = "/province";
export const PROVINCE_ROUTE: string = join(
  PROVINCE_ROOT_ROUTE,
  "province-master"
);

export const PROVINCE_DETAIL_ROUTE: string = join(
  PROVINCE_ROOT_ROUTE,
  "province-detail"
);

export const INDIRECT_SALES_ORDER_ROUTE_PREFIX: string = "/indirect-sale-order";
