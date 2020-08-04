import React from 'react';
import {storiesOf} from '@storybook/react';
import nameof from 'ts-nameof.macro';

import Button from 'components/Button/Button';

function Default() {
  return <Button type="default"/>;
}

function Primary() {
  return <Button type="primary"/>;
}

storiesOf('Button', module)
  .add(nameof(Default), Default)
  .add(nameof(Primary), Primary);
