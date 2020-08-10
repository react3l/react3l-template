import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import Tree from './Tree';
import { Observable } from 'rxjs';
import { Model, ModelFilter } from 'react3l/core';
import { TreeNode } from 'models/TreeNode';

const demoObservable = new Observable<Model[]>((observer) => {
    setTimeout(() => {
      observer.next([
      {id: 1, name: 'Ban hành chính', code: 'FAD', parentId: null},
      {id: 2, name: 'Ban công nghệ thông tin', code: 'FIM', parentId: 1}, 
      {id: 3, name:'Ban nhân sự', code: 'FHR',  parentId: null},
      {id: 4, name: 'Ban tài chính', code: 'FAF', parentId: 3}]);
    }, 1000);
});

const flatArray: TreeNode<Model>[] = [
    {title: 'Test', key: 0, item: {}, children: [
        {title: 'TestChild', key: 3, item: {}, children: []},
        {title: 'TestChild1', key: 4, item: {}, children: []},
        {title: 'TestChild2', key: 5, item: {}, children: []},
    ]},
    {title: 'Test1', key: 1, item: {}, children: []},
    {title: 'Test2', key: 2, item: {}, children: []},
];

const demoSearchFunc = (TModelFilter: ModelFilter) => {
    return demoObservable;
};

function Default() {
    // const demoSearchFunc = React.useCallback(() => {
    //     return demoObservable;
    // }, []);
    return <Tree getTreeData={demoSearchFunc}/>;
}
  
storiesOf('Tree', module)
    .add(nameof(Default), Default);