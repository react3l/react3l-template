import React, { RefObject } from 'react';
import './InputSelect.scss';
import { Model } from 'react3l/core/model';

export interface InputSelectProps <T extends Model> {
  model?: T;
  expanded?: boolean;
  placeHolder?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
}

function InputSelect(props: InputSelectProps<Model>) {
  const {
    model,
    expanded,
    placeHolder,
    render,
    onClear,
    onSearch,
  } = props;

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const [internalModel, setInternalModel] = React.useState('');

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalModel(event.target.value);
    if (typeof onSearch === 'function') {
      onSearch(event.target.value);
    }
  }, [onSearch]);

  const handleForResolve = React.useCallback(() => null, []);

  const handleClearInput = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setInternalModel('');
    inputRef.current.focus();
    event.stopPropagation();
  },[]);

  const handleClearItem = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClear(null);
    event.stopPropagation();
  }, [onClear]);

  const handleShowList = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    inputRef.current.focus();
    event.stopPropagation();
  },[]);

  return (
    <>
      <div className="input-select__container">
        { expanded ? 
          <>
            <input type="text"
              value={internalModel}
              onChange={handleChange}
              placeholder={model ? render(model) : placeHolder}
              ref={inputRef} 
              className="component__input"/>
              {internalModel && <i className="input-select__icon tio-clear" onClick={handleClearInput}></i>}
          </> :
          <>
            <input type="text"
              value={render(model)}
              onChange={handleForResolve}
              placeholder={placeHolder} 
              className="component__input"/>
              { model ? 
                <i className="input-select__icon tio-clear" onClick={handleClearItem}></i> :
                <i className="input-select__icon tio-chevron_down" onClick={handleShowList}></i>
              }
          </>
        }
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

InputSelect.defaultProps = {
  render: defaultRenderObject,
  expanded: false,
};

export default InputSelect;
