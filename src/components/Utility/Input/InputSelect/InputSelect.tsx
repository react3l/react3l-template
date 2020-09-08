import React, { RefObject } from "react";
import "./InputSelect.scss";
import { Model } from "@react3l/react3l/core/model";
import classNames from "classnames";

export interface InputSelectProps<T extends Model> {
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

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null,
  );

  const [internalModel, setInternalModel] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalModel(event.target.value);
      if (typeof onSearch === "function") {
        onSearch(event.target.value);
      }
    },
    [onSearch],
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalModel("");
      inputRef.current.focus();
      event.stopPropagation();
    },
    [],
  );

  const handleClearItem = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClear(null);
      event.stopPropagation();
    },
    [onClear],
  );

  React.useEffect(() => {
    if (expanded) {
      setInternalModel("");
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className='input-select__container'>
        {expanded ? (
          <>
            <input
              type='text'
              value={internalModel}
              onChange={handleChange}
              placeholder={model ? render(model) : placeHolder}
              ref={inputRef}
              disabled={disabled}
              className={classNames("component__input", {
                "component__input--material": isMaterial,
                "component__input--bordered": !isMaterial,
              })}
            />
            {internalModel ? (
              <i
                className='input-icon input-select__icon tio-clear'
                onClick={handleClearInput}
              ></i>
            ) : model ? (
              <i
                className='input-icon input-select__icon tio-clear'
                onClick={handleClearItem}
              ></i>
            ) : null}
          </>
        ) : (
          <>
            <input
              type='text'
              value={render(model) || ""}
              readOnly
              placeholder={placeHolder}
              className={classNames("component__input", {
                "component__input--material": isMaterial,
                "component__input--bordered": !isMaterial,
              })}
              disabled={disabled}
            />
            {model ? (
              <i
                className='input-icon input-select__icon tio-clear'
                onClick={handleClearItem}
              ></i>
            ) : (
              <i
                className={classNames(
                  "input-icon",
                  "input-select__icon",
                  "tio-chevron_down",
                )}
              ></i>
            )}
          </>
        )}
      </div>
    </>
  );
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name || "";
}

InputSelect.defaultProps = {
  render: defaultRenderObject,
  isMaterial: false,
  expanded: false,
  disabled: false,
};

export default InputSelect;
