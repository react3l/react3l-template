import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';

import Select from 'components/Select/Select';
import { Model, ModelFilter } from 'react3l/core';
import { Observable } from 'rxjs';

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
  return <Select placeHolder={'Select Organization'} 
                 model={selectModel}
                 modelFilter={selectModelFilter}
                 searchProperty={nameof(selectModel.name)}
                 render={handleRenderModel}
                 setModel={handleSetModel}
                 getList={demoSearchFunc}/>;
}

storiesOf('Button', module)
  .add(nameof(Default), Default);
