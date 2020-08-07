import {IdFilter} from 'react3l-advanced-filters/IdFilter';
import {StringFilter} from 'react3l-advanced-filters/StringFilter';
import {ModelFilter} from 'react3l/core';

export class AdministrativeTypeFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();
}
