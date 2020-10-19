import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class AppUserRoleMappingFilter extends ModelFilter  {
  public appUserId?: IdFilter = new IdFilter();
  public roleId?: IdFilter = new IdFilter();
}
