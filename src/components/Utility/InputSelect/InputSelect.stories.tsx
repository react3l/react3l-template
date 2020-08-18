import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import InputSelect from './InputSelect';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';


function Default() {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleExpanded = React.useCallback((event: RadioChangeEvent) => {
        setExpanded(event.target.value);
    }, []);

    const [isMaterial, setIsMaterial] = React.useState(false);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
    }, []);
    
    return <>
        <div style={{margin: '10px', width: '250px'}}>
                    <InputSelect expanded={expanded}
                        isMaterial={isMaterial}
                        placeHolder={'Select tree node...'}/>
        </div>
        <div style={{margin: '10px', width: '300px'}}>
                        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
                            <Radio value={true}>Material Style</Radio>
                            <Radio value={false}>Normal Style</Radio>
                        </Radio.Group>
        </div>
        <div style={{margin: '10px', width: '300px'}}>
                        <Radio.Group onChange={handleExpanded} value={expanded}>
                            <Radio value={true}>Open Select</Radio>
                            <Radio value={false}>Close Select</Radio>
                        </Radio.Group>
        </div>  
    </>;
}

storiesOf('InputSelect', module)
    .add(nameof(Default), Default);