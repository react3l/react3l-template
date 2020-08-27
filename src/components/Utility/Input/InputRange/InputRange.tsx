import React from 'react';
import './InputRange.scss';
import InputNumber, { InputNumberProps } from '../InputNumber/InputNumber';
import { Model } from 'react3l/core';

export interface InputRange <T extends Model> extends InputNumberProps<Model> {
  valueRange: [number, number];
  title?: string;
  error?: string;
  placeHolderRange?: [string, string];
  onChangeRange: (T: [number, number]) => void;
}

function InputRange(props: InputRange<Model>) {
  const {
    valueRange,
    title,
    error,
    placeHolderRange = [null, null],
    onChangeRange,
  } = props;

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

  const validateRange = React.useCallback((fromValue, toValue) => {
    if (fromValue === null || toValue === null) return true;
    if (fromValue > toValue) return false;
    return true;
  }, []);

  const handleBlurFrom = React.useCallback((number: number) => {
    if (validateRange(number, valueRange[1])) {
      onChangeRange([number, valueRange[1]]);
    } else {
      onChangeRange([null, null]);
    }
  }, [onChangeRange, valueRange, validateRange]);

  const handleBlurTo = React.useCallback((number: number) => {
    if (validateRange(valueRange[0], number)) {
      onChangeRange([valueRange[0], number]);
    } else {
      onChangeRange([null, null]);
    }
  }, [onChangeRange, valueRange, validateRange]);

  return (
    <>
      <div className="input-range__container">
        { title && 
          <div className={classNames('input-range__title', {'error-text': isError})}>{title}</div>
        }
        <div className="input-range__wrapper">
          <div className="input-range__input-number">
            <InputNumber {...props} value={valueRange[0]}
              title={null}
              onBlur={handleBlurFrom} 
              placeHolder={placeHolderRange[0]}/>
          </div>
          <span className="input-range__icon">
            <i className="tio-arrow_large_forward_outlined"></i>
          </span>
          <div className="input-range__input-number">
            <InputNumber {...props} value={valueRange[1]}
              title={null}
              onBlur={handleBlurTo}  
              placeHolder={placeHolderRange[1]}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputRange;
