import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import InputNumber, { DECIMAL, LONG } from './InputNumber';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';


function Default() {
    const [value, setValue] = React.useState(null);

    const [numberType, setNumberType] = React.useState<string>(LONG);

    const [isReverse, setIsReverse] = React.useState(false);

    const [isMaterial, setIsMaterial] = React.useState(false);

    const handleChangeType = React.useCallback((event: RadioChangeEvent) => {
        setNumberType(event.target.value);
        setValue(undefined);
    }, []);

    const handleChangeSeperation = React.useCallback((event: RadioChangeEvent) => {
        setIsReverse(event.target.value);
        setValue(undefined);
    }, []);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
        setValue(undefined);
    }, []);

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <InputNumber placeHolder={'Enter number...'}
            isMaterial={isMaterial}
            value={value} 
            numberType={numberType} 
            isReverseSymb={isReverse}/>
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeType} value={numberType}>
                        <Radio value={DECIMAL}>Decimal</Radio>
                        <Radio value={LONG}>Long</Radio>
                    </Radio.Group>
        </div>
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeSeperation} value={isReverse}>
                        <Radio value={true}>Reverse Seperation</Radio>
                        <Radio value={false}>Normal</Radio>
                    </Radio.Group>
        </div>
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
                        <Radio value={true}>Material Style</Radio>
                        <Radio value={false}>Normal Style</Radio>
                    </Radio.Group>
        </div>
    </div>;
}
  
storiesOf('InputNumber', module)
    .add(nameof(Default), Default);