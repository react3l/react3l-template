import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import InputTag from './InputTag';
import { Model } from 'react3l/core';
import { debounce } from 'react3l/helpers';
import { DEBOUNCE_TIME_300 } from 'react3l/config';
const demoItemList = [
    {id: 1, name: 'Tag 1', code: '1'},
    {id: 2, name: 'Tag 2', code: '2'},
    {id: 3, name: 'Tag 3', code: '3'},
    {id: 4, name: 'Tag 3', code: '4'},
    {id: 5, name: 'Tag 3', code: '5'},
];
function Default() {
    const [listItem, setListItem] = React.useState<Model[]>(demoItemList);
    const handleClearItem = React.useCallback((item: Model) => {
        const newListItem = listItem.filter((currentItem) => currentItem.id !== item.id);
        setListItem(newListItem);
    },[listItem]);
    const handleSearchItem = React.useCallback(debounce((searchTerm: string) => {
        // write call api here
      }, DEBOUNCE_TIME_300), []);

    return (<div style={{margin: '10px', width: '380px'}}>
                <InputTag listItem={listItem}
                    placeHolder={'Select tree node...'}
                    onSearch={handleSearchItem}
                    onClear={handleClearItem}/>
                <button className="btn btn-info" 
                    style={{marginTop: '10px'}}
                    onClick={() => setListItem(demoItemList)}>
                    Reset
                </button>
            </div>);
}

storiesOf('InputTag', module)
    .add(nameof(Default), Default);