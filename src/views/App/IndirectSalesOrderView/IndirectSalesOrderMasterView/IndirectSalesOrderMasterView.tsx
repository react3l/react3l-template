import React from 'react';
import { ModelFilter } from 'react3l/core';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';
import { NumberFilter } from 'react3l-advanced-filters/NumberFilter';
import { queryStringService } from 'services/QueryStringService';
import { advanceFilterService } from 'services/AdvanceFilterService';
import AdvanceStringFilter from 'components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter';

class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  number: NumberFilter = new NumberFilter();
  skip: number = 0;
  take: number = 10;
}

function IndirectSalesOrderMasterView() {
  const [filter, dispatch] = queryStringService.useQueryString<DemoFilter>(DemoFilter);

  const [value, setValue] = advanceFilterService.useStringFilter<DemoFilter, StringFilter>(filter, dispatch, 'name', 'startWith');

  return (
    <AdvanceStringFilter
      value={value}
      onChange={setValue}
      placeHolder={'Enter text...'}/>
  );
}

export default IndirectSalesOrderMasterView;
