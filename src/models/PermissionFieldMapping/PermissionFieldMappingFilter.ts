import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PermissionFieldMappingFilter extends ModelFilter  {
  public permissionId?: IdFilter = new IdFilter();
  public fieldId?: IdFilter = new IdFilter();
  public value?: StringFilter = new StringFilter();
}
