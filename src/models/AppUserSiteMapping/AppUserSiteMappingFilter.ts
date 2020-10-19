import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class AppUserSiteMappingFilter extends ModelFilter  {
  public appUserId?: IdFilter = new IdFilter();
  public siteId?: IdFilter = new IdFilter();
}
