import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';
import TextArea from './TextArea';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import FormItem, { ValidateStatus } from '../FormItem/FormItem';

function Default() {
    const [isMaterial, setIsMaterial] = React.useState(false);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
    }, []);

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <TextArea isMaterial={isMaterial}
            placeHolder={'Enter text...'}/>

        <div style={{marginTop: '10px', width: '250px'}}>
            <FormItem validateStatus={ValidateStatus.error}
                label={'Select field:'}
                message={'Field required!'}
                hasIcon={!isMaterial}>
                <TextArea isMaterial={isMaterial}
                    placeHolder={'Enter text...'}/>
            </FormItem>
        </div>

        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
                        <Radio value={true}>Material Style</Radio>
                        <Radio value={false}>Normal Style</Radio>
                    </Radio.Group>
        </div>
    </div>;
}
  
storiesOf('TextArea', module)
    .add(nameof(Default), Default);