import React, { RefObject } from 'react';
import './AdvanceNumberFilter.scss';
import { Model } from 'react3l/core';
import classNames from 'classnames';

export const DECIMAL: string = 'DECIMAL';
export const LONG: string = 'LONG';

export interface AdvanceNumberFilterProps<T extends Model> {
  value?: number;
  title?: string;
  allowPositive?: boolean;
  isMaterial?: boolean;
  isError?: boolean;
  numberType?: string;
  isReverseSymb?: boolean;
  decimalDigit?: number;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (T: number) => void;
}

function AdvanceNumberFilter(props: AdvanceNumberFilterProps<Model>) {
  const {
    value,
    title,
    allowPositive,
    numberType,
    decimalDigit,
    isReverseSymb,
    placeHolder,
    disabled,
    onChange,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>('');

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const buildRegex = React.useCallback(() => {
    var regExDecimal = '';
    var regExString = '';
    for (let i=1; i <= decimalDigit; i++) {
      regExDecimal += '\\d';
    }
    if (isReverseSymb) {
      regExString = '(\\d)(?=(?:\\d{3})+(?:,|$))|(,' + regExDecimal + '?)\\d*$';
    } else {
      regExString = '(\\d)(?=(?:\\d{3})+(?:\\.|$))|(\\.' + regExDecimal + '?)\\d*$';
    }
    return new RegExp(regExString, 'g');
  }, [decimalDigit, isReverseSymb]);

  const formatString = React.useCallback((inputValue: string): string => {
    const newRegEx = buildRegex();
    if (isReverseSymb) {
      switch (numberType) {
        case DECIMAL:
          if (allowPositive) {
            inputValue = inputValue.replace(/[^0-9,-]/g, '')
              .replace(',', 'x') 
              .replace(/,/g, '')
              .replace('x', ',')
              .replace(/(?!^)-/g, '');
          } else {
            inputValue = inputValue.replace(/[^0-9,]/g, '')
              .replace(',', 'x')
              .replace(/,/g, '')
              .replace('x', ',');
          }
          return (inputValue).replace(newRegEx, 
            (m, s1, s2) => {
              return s2 || (s1 + '.');
            },
          );
        default:
          if (allowPositive) {
            inputValue = inputValue.replace(/[^0-9-]/g, '')
              .replace(/(?!^)-/g, '');
          } else {
            inputValue = inputValue.replace(/[^0-9]/g, '');
          }
          return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
    } else {
      switch (numberType) {
        case DECIMAL:
          if (allowPositive) {
            inputValue = inputValue.replace(/[^0-9.-]/g, '')
              .replace('.', 'x') 
              .replace(/\./g, '')
              .replace('x', '.')
              .replace(/(?!^)-/g, '');
          } else {
            inputValue = inputValue.replace(/[^0-9.]/g, '')
              .replace('.', 'x')
              .replace(/\./g, '')
              .replace('x', '.');
          }
          return (inputValue).replace(newRegEx, 
            (m, s1, s2) => {
              return s2 || (s1 + ',');
            },
          );
        default:
          if (allowPositive) {
            inputValue = inputValue.replace(/[^0-9-]/g, '')
              .replace(/(?!^)-/g, '');
          } else {
            inputValue = inputValue.replace(/[^0-9]/g, '');
          }
          return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  }, [isReverseSymb, numberType, buildRegex, allowPositive]);

  const parseNumber = React.useCallback((value: string): [number, boolean] => {
    var isOutOfRange, number, stringValue;
    if (isReverseSymb) {
      stringValue = value.replace(/[,.]/g, m => (m === '.' ? ',' : '.'));
      stringValue = stringValue.replace(/,/g, '');
    } else {
      stringValue = value.replace(/,/g, '');
    }
    switch(numberType) {
      case DECIMAL:
        isOutOfRange = stringValue.length > 21 ? true : false;
        number = parseFloat(stringValue);
        return [number, isOutOfRange];
      default:
        isOutOfRange = stringValue.length > 17 ? true : false;
        number = parseInt(stringValue);
        return [number, isOutOfRange];
    }
  }, [numberType, isReverseSymb]);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = formatString(event.target.value);
    const [numberValue, isOutOfRange] = parseNumber(stringValue);
    if (!isOutOfRange) {
      setInternalValue(stringValue);
      if (typeof onChange === 'function') {
        onChange(numberValue);
      }
    }
  }, [formatString, parseNumber, onChange]);

  const handleClearInput = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setInternalValue('');
    if (typeof onChange === 'function') {
      onChange(null);
    }
    inputRef.current.focus();
  }, [onChange]);

  React.useEffect(() => {
    if (value) {
      var stringValue = '' + value;
      if (isReverseSymb) {
        stringValue = stringValue.replace(/\./g, ',');
      }
      if (stringValue !== internalValue) {
        setInternalValue(formatString(stringValue));
      }
    } else {
      setInternalValue('');
    }
  }, [value, formatString, isReverseSymb]);

  return (
    <>
      <div className="advance-number-filter__container">
        { title && 
          <div className="advance-number-filter__title">{title}</div>
        }
        <div className="advance-number-filter__wrapper">
          <input type="text"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeHolder}
            ref={inputRef}
            disabled={disabled} 
            className={classNames('component__input')}/>
          { internalValue && <i className="advance-number-filter__icon tio-clear" onClick={handleClearInput}></i>}
        </div>
      </div>
    </>
  );
}

AdvanceNumberFilter.defaultProps = {
  allowPositive: false,
  isReverseSymb: false,
  numberType: LONG,
  decimalDigit: 4,
  disabled: false,
};

export default AdvanceNumberFilter;
