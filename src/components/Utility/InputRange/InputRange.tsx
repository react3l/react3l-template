import React from 'react';
import './InputRange.scss';
import InputNumber, { InputNumberProps } from '../InputNumber/InputNumber';
import { Model } from 'react3l/core';

export interface InputRange <T extends Model> extends InputNumberProps<Model> {
  valueTo?: number;
  valueFrom?: number;
  title?: string;
  placeHolderTo?: string;
  placeHolderFrom?: string;
  onChangeTo?: (T: number) => void;
  onChangeFrom?: (T: number) => void;
}

function InputRange(props: InputRange<Model>) {
  const {
    valueTo,
    valueFrom,
    title,
    placeHolderTo,
    placeHolderFrom,
    onChangeTo,
    onChangeFrom,
  } = props;
  return (
    <>
      <div className="input-range__container">
        { title && 
          <div className="input-range__title">{title}</div>
        }
        <div className="input-range__wrapper">
          <div className="input-range__input-number">
            <InputNumber {...props} value={valueFrom}
              title={null} 
              placeHolder={placeHolderFrom}
              onChange={onChangeFrom}/>
          </div>
          <span className="input-range__icon">
            <i className="tio-arrow_large_forward_outlined"></i>
          </span>
          <div className="input-range__input-number">
            <InputNumber {...props} value={valueTo}
              title={null} 
              placeHolder={placeHolderTo}
              onChange={onChangeTo}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputRange;
