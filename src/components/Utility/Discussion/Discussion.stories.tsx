import { storiesOf } from "@storybook/react";
import React from "react";
import nameof from "ts-nameof.macro";

function Default() {
    return <div style={{width: '350px', height: '450px', margin: 'auto'}}>

    </div>;
};

storiesOf("Discussion", module).add(nameof(Default), Default);