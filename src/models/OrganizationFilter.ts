import { IdFilter, NumberFilter, StringFilter } from "react3l-advanced-filters";
import { ModelFilter } from "react3l/core";

export class OrganizationFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public parentId?: IdFilter = new IdFilter();
  public path?: StringFilter = new StringFilter();
  public level?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public phone?: StringFilter = new StringFilter();
  public address?: StringFilter = new StringFilter();
  public latitude?: NumberFilter = new NumberFilter();
  public longitude?: NumberFilter = new NumberFilter();
  public filterType?: NumberFilter = new NumberFilter();
}
