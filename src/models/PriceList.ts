import Model from "core/models/Model";
import { Moment } from "moment";
import { ModelFilter } from "@react3l/react3l/core";
import { IdFilter, StringFilter, DateFilter } from "@react3l/advanced-filters";
import { Organization } from "./Organization";
import { SalesOrderType } from "./PriceList/SalesOrderType";
import { StoreType } from "./StoreType";
import { Province } from "./Province";

export class PriceList extends Model {
  id?: number;
  rowId?: string;
  code?: string;
  name?: string;
  startDate?: Moment;
  endDate?: Moment;
  updatedAt?: Moment;
  statusId?: number = 1;
  organizationId?: number;
  priceListTypeId?: number;
  salesOrderTypeId?: number;
  priceListStoreMappings?: PriceListStoreMappings[];
  organization: Organization;
  saleOrderType: SalesOrderType;
}

export class PriceListFilter extends ModelFilter {
  id?: IdFilter = new IdFilter();
  code?: StringFilter = new StringFilter();
  name?: StringFilter = new StringFilter();
  startDate?: DateFilter = new DateFilter();
  endDate?: DateFilter = new DateFilter();
  updatedAt?: DateFilter = new DateFilter();
  statusId?: IdFilter = new IdFilter();
  organizationId?: IdFilter = new IdFilter();
  priceListTypeId?: IdFilter = new IdFilter();
  salesOrderTypeId?: IdFilter = new IdFilter();
}

export class PriceListStoreMappings extends Model {
  priceListId?: number;
  storeId?: number;
  store?: Store;
  storeCode?: string;
  storeName?: string;
  storeTypeName?: string;
  storeTypeId?: number;
  storeType?: StoreType;
  storeGroupingId?: number;
  provinceId?: number;
  province?: Province;
}

export class Store extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public parentStoreId?: number;

  public organizationId?: number;

  public storeTypeId?: number;

  public storeGroupingId?: number;

  public telephone?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public address?: string;

  public deliveryAddress?: string;

  public latitude?: number;

  public longitude?: number;

  public deliveryLatitude?: number;

  public deliveryLongitude?: number;

  public ownerName?: string;

  public ownerPhone?: string;

  public ownerEmail?: string;

  public statusId?: number = 1;

  public parentStore?: Store;

  public storeScoutingId?: number;
}
