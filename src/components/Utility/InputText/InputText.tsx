import React, { RefObject } from 'react';
import './InputText.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

interface InputText<T extends Model> {
  value?: string;                                                                      
  isMaterial?: boolean;
  isError?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
}

function InputText(props: InputText<Model>) {
  const {
    value,
    isMaterial,
    isError,
    disabled,
    placeHolder,
    className,
    onChange,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>('');

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
    if (typeof onChange === 'function') {
      onChange(event.target.value);
    }
  }, [onChange]);

  const handleClearInput = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setInternalValue('');
    if (typeof onChange === 'function') {
      onChange(null);
    }
    inputRef.current.focus();
  }, [onChange]);

  React.useEffect(() => {
    if (value) {
      setInternalValue(value);
    } else {
      setInternalValue('');
    }
  }, [value]);

  return (
    <>
      <div className="input-text__container">
        { isMaterial ? 
          <div className="material__input">
            <label className={classNames({'material--error': isError})}>
              <input type="text"
                value={internalValue}
                onChange={handleChange}
                ref={inputRef} required
                disabled={disabled}/>
              <span className="placeholder">{placeHolder ? placeHolder : 'Enter number...'}</span>
              { internalValue ? 
                <i className="tio-clear" onClick={handleClearInput}></i> :
                <i className={classNames(className)}></i>
              }  
            </label>
          </div> :
          <>
            <input type="text"
              value={internalValue}
              onChange={handleChange}
              placeholder={placeHolder}
              ref={inputRef}
              disabled={disabled} 
              className="component__input"/>
            {internalValue && <i className="input-text__icon tio-clear" onClick={handleClearInput}></i>}
          </>
        }
      </div>
    </>
  );
}

InputText.defaultProps = {
  isMaterial: false,
  disabled: false,
  className: '',
};

export default InputText;
