import { IdFilter } from "@react3l/advanced-filters/IdFilter";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import { ModelFilter } from "@react3l/react3l/core";

export class CommuneFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public englishName?: StringFilter = new StringFilter();

  public administrativeTypeId?: IdFilter = new IdFilter();

  public districtId?: IdFilter = new IdFilter();
}
