import { storiesOf } from "@storybook/react";
import React from "react";
import nameof from "ts-nameof.macro";



function Default() {
  return <>
  </>;
}

storiesOf("Modal", module).add(nameof(Default), Default);
