import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import { InputNumber } from 'antd';

function Default() {
    return <InputNumber />;
}
  
storiesOf('InputNumber', module)
    .add(nameof(Default), Default);