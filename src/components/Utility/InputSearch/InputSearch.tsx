import React, { RefObject } from 'react';
import './InputSearch.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

interface InputSearch<T extends Model> {
  value?: string;
  isMaterial?: boolean;
  title?: string;
  isError?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
}

function InputSearch(props: InputSearch<Model>) {
  const {
    value,
    isMaterial,
    title,
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
      <div className="input-search__container">
        {title &&
          <div className="input-search__title">{title}</div>
        }
        <div className="input-search__wrapper">
          <span className="input-search_icon-search"><i className="tio-search" /></span>
          <input type="text"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeHolder ? placeHolder : 'Nhập nội dung tìm kiếm...'}
            ref={inputRef}
            disabled={disabled}
            className={classNames('component__input', { 'component__input--material': isMaterial })} />
          {internalValue ?
            <i className="input-icon input-search__icon tio-clear" onClick={handleClearInput}></i> :
            className &&
            <i className={classNames('input-icon', 'input-search__icon', className)}></i>
          }
        </div>
      </div>
    </>
  );
}

InputSearch.defaultProps = {
  isMaterial: false,
  disabled: false,
  className: '',
};

export default InputSearch;
