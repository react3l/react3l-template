import React, { RefObject } from 'react';
import './TextArea.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

interface TextAreaProps<T extends Model> {
  value?: string;
  title?: string;                                                                      
  isMaterial?: boolean;
  error?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
}

function TextArea(props: TextAreaProps<Model>) {
  const {
    value,
    title,
    isMaterial,
    error,
    disabled,
    placeHolder,
    className,
    onChange,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>('');

  const inputRef: RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

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
        { title && 
          <div className={classNames('text-area__title', {'error-text': isError})}>{title}</div>
        }
        <div className="text-area_wrapper">
          <textarea
            value={internalValue}
            onChange={handleChange}
            placeholder={placeHolder}
            ref={inputRef}
            disabled={disabled}
            className={classNames('component__text-area', 
            {'component__text-area--material': isMaterial, 'component__text-area--bordered': !isMaterial, 'error-border': isError})}>
          </textarea>
          { internalValue ? 
            <i className="text-area__icon tio-clear" onClick={handleClearInput}></i> :
            className && 
            <i className={classNames('text-area__icon', className, {'error-text': isError})}></i>
          }
          </div>
          {isError && <span className="error-text error-message">{error}</span>}
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
