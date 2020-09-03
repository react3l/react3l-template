import React, { RefObject } from 'react';
import './InputSelect.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

export interface InputSelectProps <T extends Model> {
  model?: T;
  title?: string;
  disabled?: boolean;
  expanded?: boolean;
  isMaterial?: boolean;
  placeHolder?: string;
  error?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
}

function InputSelect(props: InputSelectProps<Model>) {
  const {
    model,
    title,
    disabled,
    expanded,
    isMaterial,
    placeHolder,
    error,
    render,
    onClear,
    onSearch,
  } = props;

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const [internalModel, setInternalModel] = React.useState('');

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalModel(event.target.value);
    if (typeof onSearch === 'function') {
      onSearch(event.target.value);
    }
  }, [onSearch]);

  const handleClearInput = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setInternalModel('');
    inputRef.current.focus();
    event.stopPropagation();
  },[]);

  const handleClearItem = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClear(null);
    event.stopPropagation();
  }, [onClear]);

  React.useEffect(() => {
    if (expanded) {
      setInternalModel('');
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className="input-select__container">
        { title && 
          <div className={classNames('component__title', {'error-text': isError})}>{title}</div>
        }
        { expanded ? 
          <div className="input-select__wrapper">
            <input type="text"
              value={internalModel}
              onChange={handleChange}
              placeholder={model ? render(model) : placeHolder}
              ref={inputRef}
              disabled={disabled} 
              className={classNames('component__input', 
              {'component__input--material': isMaterial, 'component__input--bordered': !isMaterial})}/>
            { internalModel ? 
              <i className="input-select__icon tio-clear" onClick={handleClearInput}></i> :
              ( model ? <i className="input-select__icon tio-clear" onClick={handleClearItem}></i> : null)}
          </div> :
          <div className="input-select__wrapper">
            <input type="text"
              value={render(model) || ''}
              readOnly
              placeholder={placeHolder} 
              className={classNames('component__input', 
              {'component__input--material': isMaterial, 'component__input--bordered': !isMaterial, 'error-border': isError})}
              disabled={disabled}/>
            { model ? 
              <i className="input-select__icon tio-clear" onClick={handleClearItem}></i> :
              <i className={classNames('input-select__icon', 'tio-chevron_down', {'error-text': isError})}></i>
            }
          </div>
          }
          {isError && <span className="error-text error-message">{error}</span>}
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name || '';
}

InputSelect.defaultProps = {
  render: defaultRenderObject,
  isMaterial: false,
  expanded: false,
  disabled: false,
};

export default InputSelect;
