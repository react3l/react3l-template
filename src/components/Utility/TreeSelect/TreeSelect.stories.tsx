import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import TreeSelect from './TreeSelect';
import { Model, ModelFilter } from 'react3l/core';
import { Observable } from 'rxjs';
import { IdFilter } from 'react3l-advanced-filters/IdFilter';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';

export class DistrictFilter extends ModelFilter {
    public id: IdFilter = new IdFilter();
  
    public name: StringFilter = new StringFilter();
  
    public provinceId: IdFilter = new IdFilter();
}
interface changeAction<T extends Model> {
    type: string;
    data: Model[];
}

function reducerFunc(state: Model, action: changeAction<Model>): Model[] {
    switch(action.type) {
        case 'UPDATE_MODEL':
            return action.data;
    }
    return;
}

const demoList = [{id: 1, name: 'Ban hành chính', code: 'FAD', parentId: null},
{id: 2, name: 'Ban công nghệ thông tin', code: 'FIM', parentId: 1}, 
{id: 3, name:'Ban nhân sự', code: 'FHR',  parentId: null},
{id: 4, name: 'Ban truyền thông', code: 'FCC', parentId: 2},
{id: 5, name: 'Ban công nghệ', code: 'FTI', parentId: 4},
{id: 6, name: 'Ban giám đốc', code: 'BOD', parentId: 3},
{id: 7, name: 'Ban quản trị', code: 'BOM', parentId: 4}];

const demoObservable = new Observable<Model[]>((observer) => {
    setTimeout(() => {
      observer.next(demoList);
    }, 2000);
});

const demoSearchFunc = (TModelFilter: ModelFilter) => {
    return demoObservable;
};

function Default() {
    const [listItem, dispatch] = React.useReducer(reducerFunc, demoList);
    const handleChangeItem = React.useCallback((items: Model[], isMultiple) => {
        if (isMultiple) {
            dispatch({type: 'UPDATE_MODEL', data: items});
        } else {
            dispatch({type: 'UPDATE_MODEL', data: items});
        }
    }, []);
    return <div style={{margin: '10px', width: '300px'}}>
                <TreeSelect checkable={false} 
                    selectable={true}
                    filterClass={DistrictFilter}
                    onChange={handleChangeItem}
                    listItem={listItem}
                    getTreeData={demoSearchFunc}/> 
           </div>;
}
  
storiesOf('TreeSelect', module)
    .add(nameof(Default), Default);