import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import InputRange from './InputRange';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';

function Default() {
    const [isMaterial, setIsMaterial] = React.useState(false);

    const [valueFrom, setValueFrom] = React.useState<number>();

    const [valueTo, setValueTo] = React.useState<number>();

    const [iconName, setIconName] = React.useState('');

    const [isTitle, setIsTitle] = React.useState(false);

    const [title, setTitle] = React.useState('');

    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
        setIsTitle(event.target.value);
        if (event.target.value) {
            setTitle('Input text');
        } else setTitle('');
    }, []);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
        if (event.target.value) {
            setIconName('tio-dollar');
        } else setIconName('');
    }, []);

    const handleChangeTo = React.useCallback((value: number) => {
        setValueTo(value);
    }, []);

    const handleChangeFrom = React.useCallback((value: number) => {
        setValueFrom(value);
    }, []);

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <InputRange isMaterial={isMaterial}
            title={title}
            placeHolderFrom={'To...'}
            placeHolderTo={'From...'}
            valueFrom={valueFrom}
            valueTo={valueTo}
            className={iconName}
            onChangeFrom={handleChangeFrom}
            onChangeTo={handleChangeTo}
            />
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
                        <Radio value={true}>Material Style</Radio>
                        <Radio value={false}>Normal Style</Radio>
                    </Radio.Group>
        </div>
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeTitle} value={isTitle}>
                        <Radio value={true}>Titled</Radio>
                        <Radio value={false}>Untitled</Radio>
                    </Radio.Group>
        </div>
    </div>;
}
  
storiesOf('InputRange', module)
    .add(nameof(Default), Default);