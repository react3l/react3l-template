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
      {id: 4, name: 'Ban truyền thông', code: 'FCC', parentId: 2},
      {id: 5, name: 'Ban công nghệ', code: 'FTI', parentId: 4},
      {id: 6, name: 'Ban giám đốc', code: 'BOD', parentId: 3},
      {id: 7, name: 'Ban quản trị', code: 'BOM', parentId: 4}]);
    }, 2000);
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
    return <Tree getTreeData={demoSearchFunc}
                height={300}
                selectable={false}
                checkable={true}
                virtual
                titleRender={(treeNode: TreeNode<Model>) => (treeNode.item?.name + ' - ' +treeNode.item?.code)}/>;
}
  
storiesOf('Tree', module)
    .add(nameof(Default), Default);