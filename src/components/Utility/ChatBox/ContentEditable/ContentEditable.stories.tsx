import React from 'react';
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import ContentEditable from './ContentEditable';
import { of } from 'rxjs';

const userList = [
    {id: 1, name: 'Le Duc Thang', displayName: 'thangld19@fpt.com.vn'},
    {id: 2, name: 'Dang Tuan Vu', displayName: 'vudt19@fpt.com.vn'},
    {id: 1, name: 'Bui Quang Huy', displayName: 'huybq11@fpt.com.vn'},
];

const demoGetList = (value: string) => {
    return of(userList);
};

function Default () {
    const contentEditableRef: React.LegacyRef<HTMLDivElement> = React.useRef<HTMLDivElement>();
    
    return <div style={{width: '300px', height: '200px', margin: '300px auto', border: '1px solid black'}}>
        <ContentEditable suggestList = {demoGetList} 
            ref={contentEditableRef}></ContentEditable>
    </div>;
}

storiesOf("ContentEditable", module).add(nameof(Default), Default);