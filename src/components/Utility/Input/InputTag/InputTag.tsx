import React, { RefObject } from 'react';
import './InputTag.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

export interface InputTagProps <T extends Model> {
  listItem?: T[];
  title?: string;
  placeHolder?: string;
  disabled?: boolean;
  isMaterial?: boolean;
  error?: string;
  render?: (t: T) => string;
  onClear?: (T: T) => void;
  onSearch?: (T: string) => void;
}
function InputTag(props: InputTagProps<Model>) {
  const { 
    listItem,
    title,
    placeHolder,
    disabled,
    isMaterial,
    error,
    render,
    onClear,
    onSearch,
  } = props;

  const internalListItem = React.useMemo<Model[]>(() => {
    return listItem;
  },[listItem]);

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const inputRef: RefObject<HTMLInputElement> = React.useRef();

  const handleChangeInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (typeof onSearch === 'function') {
      onSearch(event.target.value);
    }
  }, [onSearch]);

  const handleClearItem = React.useCallback(
    (item) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => 
      {
        event.stopPropagation();
        if (typeof onClear === 'function') {
          onClear(item);
        }
      }, 
    [onClear]);

  return (
    <>
      <div className="input-tag__wrapper">
        { title && 
          <div className={classNames('input-tag__title', {'error-text': isError})}>{title}</div>
        }
        <div className={classNames('input-tag__container', 
          {'input-tag__container--material': isMaterial, 'input-tag__container--bordered': !isMaterial, 'error-border': isError})} 
          onClick={() => inputRef.current.focus()}>
            { internalListItem &&
              internalListItem.map((item, index) => 
                <span className="input-tag__label" key={index} onClick={(e) => e.stopPropagation()}>
                  <span className="input-tag__text">{render(item)}</span>
                  <i className="input-tag__icon tio-clear" onClick={handleClearItem(item)}></i>
                </span>)
            }
            <input type="text"
              value={searchTerm}
              placeholder={placeHolder} 
              ref={inputRef}
              disabled={disabled}
              onChange={handleChangeInput} />
        </div>
        {isError && <span className="error-text error-message">{error}</span>}
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

InputTag.defaultProps = {
  title: null,
  render: defaultRenderObject,
  isMaterial: false,
};

export default InputTag;
