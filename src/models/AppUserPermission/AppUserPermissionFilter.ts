import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class AppUserPermissionFilter extends ModelFilter  {
  public permissionId?: IdFilter = new IdFilter();
  public appUserId?: IdFilter = new IdFilter();
  public path?: StringFilter = new StringFilter();
  public count?: NumberFilter = new NumberFilter();
}
