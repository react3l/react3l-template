import {ModelFilter} from 'react3l/core';
import {IdFilter} from 'react3l-advanced-filters/IdFilter';

export class ProvinceFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
}
