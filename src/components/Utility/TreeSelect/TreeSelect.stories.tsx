import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import TreeSelect from './TreeSelect';

function Default() {

    return <div style={{margin: '10px', width: '300px'}}>
                <TreeSelect /> 
           </div>;
}
  
storiesOf('TreeSelect', module)
    .add(nameof(Default), Default);