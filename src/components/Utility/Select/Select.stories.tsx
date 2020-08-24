import React, { Reducer } from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import { Model, ModelFilter } from 'react3l/core';
import { Observable } from 'rxjs';
import Select from './Select';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { advanceFilterService, advanceFilterReducer, AdvanceFilterAction } from 'services/advance-filter-service';
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

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

function Default() {
  const [selectModel, setSelectModel] = React.useState<Model>({id: 0, name: 'Ban hành chính', code: 'FAD'});

  const [selectModelFilter] = React.useState<ModelFilter>(new ModelFilter());

  const [isMaterial, setIsMaterial] = React.useState(false);

  const [filter, dispatch] = React.useReducer<Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, IdFilter>>>(advanceFilterReducer, new DemoFilter());

  const [item, setValue] = advanceFilterService.useIdFilter<DemoFilter, IdFilter, Model>(dispatch, 'id', 'equal');

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
      setIsMaterial(event.target.value);
  }, []);

  const handleSetModel = React.useCallback((item: Model) => {
    setSelectModel(item);
  }, []);

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
      <Select placeHolder={'Select Organization'} 
                 model={item}
                 isMaterial={isMaterial}
                 modelFilter={selectModelFilter}
                 searchProperty={nameof(selectModel.name)}
                 render={handleRenderModel}
                 setModel={setValue}
                 getList={demoSearchFunc}/>

      <div style={{margin: '10px', width: '300px'}}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
            <Radio value={true}>Material Style</Radio>
            <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </div>;
}

storiesOf('Select', module)
  .add(nameof(Default), Default);
