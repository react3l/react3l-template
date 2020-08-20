import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import InputText from './InputText';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';

function Default() {
    const [isMaterial, setIsMaterial] = React.useState(false);

    const [isTitle, setIsTitle] = React.useState(false);

    const [iconName, setIconName] = React.useState('');

    const [title, setTitle] = React.useState('');
    
    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
        if (event.target.value) {
            setIconName('tio-files_labeled_outlined');
        } else setIconName('');
    }, []);

    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
        setIsTitle(event.target.value);
        if (event.target.value) {
            setTitle('Input text');
        } else setTitle('');
    }, []);

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <InputText isMaterial={isMaterial}
            title={title}
            placeHolder={'Enter text...'}
            className={iconName}/>

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
  
storiesOf('InputText', module)
    .add(nameof(Default), Default);