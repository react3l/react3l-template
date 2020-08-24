import React from 'react';
import './AdvanceNumberRangeFilter.scss';
import { Model } from 'react3l/core';
import InputNumber, { InputNumberProps } from 'components/Utility/Input/InputNumber/InputNumber';

export interface AdvanceNumberRangeFilter <T extends Model> extends InputNumberProps<Model> {
  valueRange?: [number, number];
  title?: string;
  placeHolderRange?: [string, string];
  onChangeRange?: (T: [number, number]) => void;
}

function AdvanceNumberRangeFilter(props: AdvanceNumberRangeFilter<Model>) {
  const {
    valueRange,
    title,
    placeHolderRange = [null, null],
    onChangeRange,
  } = props;

  const validateRange = React.useCallback((fromValue, toValue) => {
    if (fromValue === null || toValue === null) return true;
    if (fromValue > toValue) return false;
    return true;
  }, []);

  const handleChangeFrom = React.useCallback((number: number) => {
    if (validateRange(number, valueRange[1])) {
      onChangeRange([number, valueRange[1]]);
    } else {
      const changeValue = valueRange[0] === null ? undefined : null;
      onChangeRange([changeValue, valueRange[1]]);
    }
  }, [onChangeRange, valueRange, validateRange]);

  const handleChangeTo = React.useCallback((number: number) => {
    if (validateRange(valueRange[0], number)) {
      onChangeRange([valueRange[0], number]);
    } else {
      const changeValue = valueRange[1] === null ? undefined : null;
      onChangeRange([valueRange[0], changeValue]);
    }
  }, [onChangeRange, valueRange, validateRange]);

  return (
    <>
      <div className="input-range__container">
        { title && 
          <div className="input-range__title">{title}</div>
        }
        <div className="input-range__wrapper">
          <div className="input-range__input-number">
            <InputNumber {...props} value={valueRange[0]}
              title={null} 
              placeHolder={placeHolderRange[0]}
              onChange={handleChangeFrom}/>
          </div>
          <span className="input-range__icon">
            <i className="tio-arrow_large_forward_outlined"></i>
          </span>
          <div className="input-range__input-number">
            <InputNumber {...props} value={valueRange[1]}
              title={null} 
              placeHolder={placeHolderRange[1]}
              onChange={handleChangeTo}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvanceNumberRangeFilter;
