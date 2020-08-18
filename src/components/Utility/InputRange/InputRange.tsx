import React from 'react';
import './InputRange.scss';
import InputNumber, { InputNumberProps } from '../InputNumber/InputNumber';
import { Model } from 'react3l/core';

export interface InputRange <T extends Model> extends InputNumberProps<Model> {
  valueTo?: number;
  valueFrom?: number;
  placeHolderTo?: string;
  placeHolderFrom?: string;
  onChangeTo?: (T: number) => void;
  onChangeFrom?: (T: number) => void;
}

function InputRange(props: InputRange<Model>) {
  const {
    valueTo,
    valueFrom,
    placeHolderTo,
    placeHolderFrom,
    onChangeTo,
    onChangeFrom,
  } = props;
  return (
    <>
      <div className="input-range__container">
        <div className="input-range__input-number">
          <InputNumber {...props} value={valueFrom} 
            placeHolder={placeHolderFrom}
            onChange={onChangeFrom}/>
        </div>
        <span className="input-range__icon">
          <i className="tio-arrow_large_forward_outlined"></i>
        </span>
        <div className="input-range__input-number">
          <InputNumber {...props} value={valueTo}
            placeHolder={placeHolderTo}
            onChange={onChangeTo}/>
        </div>
      </div>
    </>
  );
}

export default InputRange;
