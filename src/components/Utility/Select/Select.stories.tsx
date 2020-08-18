import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import { Model, ModelFilter } from 'react3l/core';
import { Observable } from 'rxjs';
import Select from './Select';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
    {id: 0, name: 'Ban hành chính', code: 'FAD'},
    {id: 1, name: 'Ban công nghệ thông tin', code: 'FIM'}, 
    {id: 2, name:'Ban nhân sự', code: 'FHR'},
    {id: 3, name: 'Ban tài chính', code: 'FAF'}]);
  }, 1000);
});
const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

function Default() {
  const [selectModel, setSelectModel] = React.useState<Model>({id: 0, name: 'Ban hành chính', code: 'FAD'});
  const [selectModelFilter] = React.useState<ModelFilter>(new ModelFilter());
  const [isMaterial, setIsMaterial] = React.useState(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
      setIsMaterial(event.target.value);
  }, []);

  const handleSetModel = React.useCallback((item: Model) => {
    setSelectModel(item);
  }, []);

  const handleRenderModel = React.useCallback((item: Model) => {
    if(item) {
      return item.name;
    } else {
      return '';
    }
  }, []);
  
  return <div style={{margin: '10px', width: '250px'}}>
      <Select placeHolder={'Select Organization'} 
                 model={selectModel}
                 isMaterial={isMaterial}
                 modelFilter={selectModelFilter}
                 searchProperty={nameof(selectModel.name)}
                 render={handleRenderModel}
                 setModel={handleSetModel}
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
