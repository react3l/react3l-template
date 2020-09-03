import { ModelFilter } from "react3l/core";
import { IdFilter } from "react3l-advanced-filters/IdFilter";
import { StringFilter } from "react3l-advanced-filters/StringFilter";

export class PriceListStatusFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
}
