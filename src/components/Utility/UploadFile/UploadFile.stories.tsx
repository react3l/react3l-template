import { storiesOf } from "@storybook/react";
import React from 'react';
import nameof from "ts-nameof.macro";
import UploadFile from "./UploadFile";

function Default () {
    
    return <div style={{margin: "20px 20px", width: "600px"}}>
        <UploadFile></UploadFile>
    </div>;
}

storiesOf("UploadFile", module).add(nameof(Default), Default);