import React from 'react';
import './DatePicker.scss';
import { DatePicker as DatePickerAntd } from 'antd';
import { Model } from 'react3l/core';
import { Moment } from 'moment';

import classNames from 'classnames';
import { DatePickerProps as AntdDatePickerProps } from 'antd/lib/date-picker';
import { commonWebService } from 'services/CommonWebService';

function SuffixDateIcon (props: any) {
  return <span className={classNames('date-picker__icon', {'error-background': props.isError})}>
    <i className="tio-calendar"></i>
  </span>;
}

interface DatePickerProps<T extends Model> {
  value?: Moment;
  title?: string;
  isMaterial?: boolean;
  dateFormat?: string[];
  error?: string;
  onChange?: (value: Moment | null, dateString?: string) => void;
}

function DatePicker(props: DatePickerProps<Model> & AntdDatePickerProps) { 
  const {
    value,
    error,
    title,
    isMaterial,
    dateFormat,
    onChange,
  } = props;

  const dateRef = React.useRef<any>();

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

  const internalValue = React.useMemo(() => {
    return typeof value === 'string' ? commonWebService.toMomentDate(value) : value;
  }, [value]);

  const handleClearDate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onChange(null);
  }, [onChange]);

  return (
    <div className="date-picker__container">
      { title && 
        <div className={classNames('date-picker__title', {'error-text': isError})}>{title}</div>
      }
      <div className="date-picker__wrapper">
        <DatePickerAntd {...props}
          value={internalValue}
          style={{width: '100%'}}
          ref={dateRef}
          allowClear={false}
          format={dateFormat}
          className={classNames({'ant-picker--material': isMaterial, 'ant-picker--bordered': !isMaterial, 'error-border': isError})}
          suffixIcon={<SuffixDateIcon isError={isError}/>}/>
          { value &&
            <span className={classNames('date-picker__icon-wrapper', {'date-picker__icon-wrapper--material': isMaterial})}>
                <i className="date-picker__icon-clear tio-clear" onClick={handleClearDate}></i>
            </span> 
          }
      </div>
      {isError && <span className="error-text error-message">{error}</span>}
    </div>
  );
}
DatePicker.defaultProps = {
  isMaterial: false,
  dateFormat: ['DD/MM/YYYY', 'YYYY/MM/DD'],
};

export default DatePicker;
