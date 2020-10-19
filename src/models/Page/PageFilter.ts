import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PageFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public path?: StringFilter = new StringFilter();
}
