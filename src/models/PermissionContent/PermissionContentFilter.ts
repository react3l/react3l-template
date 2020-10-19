import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PermissionContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public permissionId?: IdFilter = new IdFilter();
  public fieldId?: IdFilter = new IdFilter();
  public permissionOperatorId?: IdFilter = new IdFilter();
  public value?: StringFilter = new StringFilter();
}
