import Model from "core/models/Model";
import { Store } from "antd/lib/form/interface";
import { StoreType } from "models/StoreType";
import { Province } from "models/Province";

export class PriceListStoreMappings extends Model {
  priceListId?: number;
  storeId?: number;
  store?: Store;
  storeCode?: string;
  storeName?: string;
  storeTypeId?: number;
  storeGroupingId?: number;
  provinceId?: number;
  storeType: StoreType;
  province: Province;
}
