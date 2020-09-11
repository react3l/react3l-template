import { ModelFilter } from "@react3l/react3l/core";
import { IdFilter } from "@react3l/advanced-filters/IdFilter";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";

export class SalesOrderTypeFilter extends ModelFilter {
  id?: IdFilter = new IdFilter();
  code?: StringFilter = new StringFilter();
  name?: StringFilter = new StringFilter();
}
