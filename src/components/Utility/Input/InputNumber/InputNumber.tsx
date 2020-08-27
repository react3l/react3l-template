import React, { RefObject } from 'react';
import './InputNumber.scss';
import { Model } from 'react3l/core';
import classNames from 'classnames';

export const DECIMAL: string = 'DECIMAL';
export const LONG: string = 'LONG';

export interface InputNumberProps<T extends Model> {
  value?: number;
  title?: string;
  allowPositive?: boolean;
  isMaterial?: boolean;
  error?: string;
  numberType?: string;
  isReverseSymb?: boolean;
  decimalDigit?: number;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (T: number) => void;
  onEnter?: (T: number) => void;
  onBlur?: (T: number) => void;
}

function InputNumber(props: InputNumberProps<Model>) {
  const {
    value,
    title,
    allowPositive,
    isMaterial,
    error,
    numberType,
    decimalDigit,
    isReverseSymb,
    placeHolder,
    className,
    disabled,
    onChange,
    onEnter,
    onBlur,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>('');

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

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
    if (value) {
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
    } else {
      return [null, false];
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
    inputRef.current.focus();
    if (typeof onChange === 'function') {
      onChange(null);
    }
  }, [onChange]);

  const handleKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if (typeof onEnter === 'function') {
        onEnter(parseNumber(event.currentTarget.value)[0]);
      }
    }
  }, [onEnter, parseNumber]);

  const handleBlur = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      if (typeof onBlur === 'function') {
        onBlur(parseNumber(event.currentTarget.value)[0]);
      }
  }, [onBlur, parseNumber]);

  React.useEffect(() => {
    if (value) {
      var stringValue = '' + value;
      if (isReverseSymb) {
        stringValue = stringValue.replace(/\./g, ',');
      }
      setInternalValue(formatString(stringValue));
    } else {
      setInternalValue('');
    }
  }, [value, formatString, isReverseSymb]);

  return (
    <>
      <div className="input-number__container">
        { title && 
          <div className={classNames('input-number__title', {'error-text': isError})}>{title}</div>
        }
        <div className="input-number__wrapper">
          <input type="text"
            value={internalValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            placeholder={placeHolder}
            ref={inputRef}
            disabled={disabled} 
            className={classNames('component__input', 
            {'component__input--material': isMaterial, 'component__input--bordered': !isMaterial, 'error-border': isError})}/>
          { internalValue ? 
            <i className="input-number__icon tio-clear" onClick={handleClearInput}></i> :
            className && 
            <i className={classNames('input-number__icon', className, {'error-text': isError})}></i>
          }
        </div>
        {isError && <span className="error-text error-message">{error}</span>}
      </div>
    </>
  );
}

InputNumber.defaultProps = {
  allowPositive: false,
  isReverseSymb: false,
  numberType: LONG,
  decimalDigit: 4,
  isMaterial: false,
  disabled: false,
};

export default InputNumber;
