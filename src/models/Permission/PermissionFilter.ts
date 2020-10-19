import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PermissionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public roleId?: IdFilter = new IdFilter();
  public menuId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
}
