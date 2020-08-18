import React, { RefObject } from 'react';
import './InputSelect.scss';
import { Model } from 'react3l/core/model';

export interface InputSelectProps <T extends Model> {
  model?: T;
  disabled?: boolean;
  expanded?: boolean;
  isMaterial?: boolean;
  placeHolder?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
}

function InputSelect(props: InputSelectProps<Model>) {
  const {
    model,
    disabled,
    expanded,
    isMaterial,
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

  React.useEffect(() => {
    if (expanded) {
      setInternalModel('');
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className="input-select__container">
        { expanded ? 
          <>
            { !isMaterial ? 
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
                <div className="material__input">
                  <label>
                    <input type="text"
                      value={internalModel}
                      onChange={handleChange}
                      ref={inputRef} required
                      disabled={disabled}/>
                    <span className="placeholder">{model ? render(model) : placeHolder}</span>
                    { internalModel ? 
                      <i className="tio-clear" onClick={handleClearInput}></i> :
                      <i className="tio-chevron_down"></i>
                    }  
                  </label>
                </div>
              </>
            }
          </> :
          <>
            { !isMaterial ? 
              <>
                <input type="text"
                  value={render(model)}
                  onChange={handleForResolve}
                  placeholder={placeHolder} 
                  className="component__input"
                  disabled={disabled}/>
                { model ? 
                  <i className="input-select__icon tio-clear" onClick={handleClearItem}></i> :
                  <i className="input-select__icon tio-chevron_down"></i>
                }
              </> :
              <>
                <div className="material__input">
                  <label>
                    <input type="text"
                      value={render(model)}
                      onChange={handleForResolve}
                      disabled={disabled} required/>
                    <span className="placeholder">{placeHolder}</span>
                    { model ? 
                      <i className="input-select__icon tio-clear" onClick={handleClearItem}></i> :
                      <i className="input-select__icon tio-chevron_down"></i>
                    }  
                  </label>
                </div>
              </>
            }
          </>
        }
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
