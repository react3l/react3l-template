import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import InputSelect from './InputSelect';

function Default() {
    return (<div style={{margin: '10px', width: '250px'}}>
                <InputSelect 
                    placeHolder={'Select tree node...'}/>
            </div>);
}

storiesOf('InputSelect', module)
    .add(nameof(Default), Default);