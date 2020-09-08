import { ModelFilter } from "@react3l/react3l/core";

import { StringFilter, IdFilter } from "@react3l/advanced-filters";

export class PriceListStoreMappingsFilter extends ModelFilter {
  storeCode?: StringFilter = new StringFilter();
  storeName?: StringFilter = new StringFilter();
  storeTypeId?: IdFilter = new IdFilter();
  storeGroupingId?: IdFilter = new IdFilter();
  provinceId?: IdFilter = new IdFilter();
}
