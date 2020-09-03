import React from 'react';
import { storiesOf } from '@storybook/react';
import nameof from 'ts-nameof.macro';
import FormValidation, { ValidateStatus } from './FormValidation';
import InputText from '../Input/InputText/InputText';
import Select from '../Select/Select';
import { ModelFilter } from 'react3l/core';

function Default() {
    return <>
        <div style={{margin: '10px', width: "250px"}}>
            <FormValidation validateStatus={ValidateStatus.error} 
                message={'Field required!'} 
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."} title={'Field1: '}/>
            </FormValidation>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormValidation validateStatus={ValidateStatus.warning} 
                message={'Field required!'}
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormValidation>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormValidation validateStatus={ValidateStatus.success} 
                message={'Field required!'}
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormValidation>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
            <FormValidation validateStatus={ValidateStatus.validating}
                renderIcon={<i className="tio-star_outlined"></i>} 
                message={'Field required!'}
                hasIcon={true}>
                <InputText placeHolder={"Enter text..."}/>
            </FormValidation>
        </div>
        <div style={{margin: '10px', width: "250px"}}>
        <FormValidation validateStatus={ValidateStatus.error}
                message={'Field required!'}
                hasIcon={true}>
                <Select placeHolder={'Select Organization'} 
                    classFilter={ModelFilter}/>
            </FormValidation>
        </div>
    </>;
}

storiesOf('FormValidation', module).add(nameof(Default), Default);