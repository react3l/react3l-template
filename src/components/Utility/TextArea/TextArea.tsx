import React, { RefObject } from 'react';
import './TextArea.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

interface TextAreaProps<T extends Model> {
  value?: string;                                                                      
  isMaterial?: boolean;
  isError?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
}

function TextArea(props: TextAreaProps<Model>) {
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

  const inputRef: RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <div className="text-area__container">
        { isMaterial ? 
          <div className="material__input">
            <label className={classNames({'material--error': isError})}>
              <textarea
                value={internalValue}
                onChange={handleChange}
                ref={inputRef}
                disabled={disabled}
                required></textarea>
              <span className="placeholder">{placeHolder ? placeHolder : 'Insert text...'}</span>
              { internalValue && <i className="tio-clear" onClick={handleClearInput}></i>}  
            </label>
          </div> :
          <>
            <textarea
              value={internalValue}
              onChange={handleChange}
              placeholder={placeHolder}
              ref={inputRef}
              disabled={disabled} 
              className="component__text-area"></textarea>
            {internalValue && <i className="text-area__icon tio-clear" onClick={handleClearInput}></i>}
          </>
        }
      </div>
    </>
  );
}

TextArea.defaultProps = {
  isMaterial: false,
  disabled: false,
  className: '',
};

export default TextArea;
