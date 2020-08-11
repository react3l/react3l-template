import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import { TreeSelect } from 'antd';

function Default() {
    return <TreeSelect/>;
}
  
storiesOf('TreeSelect', module)
    .add(nameof(Default), Default);