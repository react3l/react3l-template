import { storiesOf } from "@storybook/react";
import React from 'react';
import nameof from "ts-nameof.macro";
import UploadFile, { UPLOADTYPE } from "./UploadFile";

const menu = [
    {path: "/assets/img/demoImage1.png", isDelete: true, name: "demoImage1.png"},
    {path: "/assets/img/demoImage2.png", isDelete: true, name: "demoImage2.png"},
    {path: "/assets/img/demoImage1.png", isDelete: true, name: "demoImage3.png"},
];

function Default () {
    
    return <div style={{margin: "20px 20px", width: "600px"}}>
        <div style={{width: "100%", padding: "10px 10px"}}>
            <UploadFile files={menu} type={UPLOADTYPE.IMAGE}></UploadFile>
        </div>
        <div style={{width: "100%", padding: "10px 10px"}}>
            <UploadFile files={[]} type={UPLOADTYPE.BUTTON}></UploadFile>
        </div>
        <div style={{width: "100%", padding: "10px 10px"}}>
            <UploadFile files={[]} type={UPLOADTYPE.ZONE}></UploadFile>
        </div>
    </div>;
}

storiesOf("UploadFile", module).add(nameof(Default), Default);