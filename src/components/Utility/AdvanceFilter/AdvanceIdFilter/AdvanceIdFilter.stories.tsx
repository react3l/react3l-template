import React, { Reducer } from 'react';
import nameof from 'ts-nameof.macro';
import { Model, ModelFilter } from 'react3l/core';
import { Observable } from 'rxjs';
import AdvanceIdFilter from './AdvanceIdFilter';
import { advanceFilterService, advanceFilterReducer, AdvanceFilterAction } from 'services/AdvanceFilterService';
import { IdFilter } from 'react3l-advanced-filters/IdFilter';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
    {id: 4, name: 'Ban hành chính', code: 'FAD'},
    {id: 1, name: 'Ban công nghệ thông tin', code: 'FIM'}, 
    {id: 2, name:'Ban nhân sự', code: 'FHR'},
    {id: 3, name: 'Ban tài chính', code: 'FAF'}]);
  }, 1000);
});

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const filterValue = new DemoFilter();
filterValue.id.equal = 1;

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

export function AdvanceIdFilterStories() {
  const [AdvanceIdFilterModelFilter] = React.useState<ModelFilter>(new ModelFilter());

  const [filter, dispatch] = React.useReducer<Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, IdFilter>>>(advanceFilterReducer, filterValue);

  const [id, setValue] = advanceFilterService.useIdFilter<DemoFilter, IdFilter>(filter, dispatch, 'id', 'equal');

  const handleRenderModel = React.useCallback((item: Model) => {
    if(item) {
      return item.name ;
    } else {
      return '';
    }
  }, []);

  React.useEffect(() => {
  }, [filter]);
  
  return <div style={{margin: '10px', width: '250px'}}>
      <AdvanceIdFilter placeHolder={'AdvanceIdFilter Organization'}
                value={id}
                classFilter={DemoFilter} 
                modelFilter={AdvanceIdFilterModelFilter}
                searchProperty={nameof(DemoFilter.name)}
                render={handleRenderModel}
                setId={setValue}
                getList={demoSearchFunc}/>
    </div>;
}
