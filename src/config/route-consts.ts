import { join } from "path";

/* province routes */

export const PROVINCE_ROOT_ROUTE: string = "/province";
export const PROVINCE_ROUTE: string = join(
  PROVINCE_ROOT_ROUTE,
  "province-master",
);

export const PROVINCE_DETAIL_ROUTE: string = join(
  PROVINCE_ROOT_ROUTE,
  "province-detail",
);

export const INDIRECT_SALES_ORDER_ROUTE_PREFIX: string = "/indirect-sale-order";

/* payment request routes */

export const PAYMENT_REQUEST_ROOT_ROUTE: string = "/payment-request";
export const PAYMENT_REQUEST_ROUTE: string = join(
  PAYMENT_REQUEST_ROOT_ROUTE,
  "payment-request-master",
);

export const PAYMENT_REQUEST_DETAIL_ROUTE: string = join(
  PAYMENT_REQUEST_ROOT_ROUTE,
  "payment-request-detail",
);

export const PRICE_LIST_ROUTE_PREFIX: string = "/price-list";
