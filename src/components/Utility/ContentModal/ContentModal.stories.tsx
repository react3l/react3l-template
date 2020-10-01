import { storiesOf } from "@storybook/react";
import { PaymentFilter } from "models/PaymenFilter";
import React from "react";
import nameof from "ts-nameof.macro";

const filter = new PaymentFilter();

function Default() {
  return <></>;
}

storiesOf("ContentModal", module).add(nameof(Default), Default);
