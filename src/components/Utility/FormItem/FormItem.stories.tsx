import React from 'react';
import { storiesOf } from '@storybook/react';
import nameof from 'ts-nameof.macro';
import FormItem, { ValidateStatus } from './FormItem';
import InputText from '../Input/InputText/InputText';
import Select from '../Select/Select';
import { ModelFilter } from 'react3l/core';

function Default() {
    return <>
        <div style={{margin: '10px', width: "250px"}}>
            <FormItem validateStatus={ValidateStatus.error} 
                message={'Field required!'} 
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormItem>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormItem validateStatus={ValidateStatus.warning} 
                message={'Field required!'}
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormItem>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormItem validateStatus={ValidateStatus.success} 
                message={'Field required!'}
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormItem>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormItem validateStatus={ValidateStatus.validating}
                renderIcon={<i className="tio-star_outlined"></i>} 
                message={'Field required!'}
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormItem>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormItem validateStatus={ValidateStatus.error}
                message={'Field required!'}
                hasIcon={true}>
                <Select placeHolder={'Select Organization'} 
                    classFilter={ModelFilter}/>
            </FormItem>
        </div>
    </>;
}

storiesOf('FormItem', module).add(nameof(Default), Default);