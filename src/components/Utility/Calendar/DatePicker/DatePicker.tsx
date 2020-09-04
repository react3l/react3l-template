import React from 'react';
import './DatePicker.scss';
import { DatePicker as DatePickerAntd } from 'antd';
import { Model } from 'react3l/core';
import { Moment } from 'moment';

import classNames from 'classnames';
import { DatePickerProps as AntdDatePickerProps } from 'antd/lib/date-picker';
import { commonWebService } from 'services/CommonWebService';

function SuffixDateIcon () {
  return <span className={classNames('date-picker__icon')}>
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
    isMaterial,
    dateFormat,
    onChange,
  } = props;

  const dateRef = React.useRef<any>();

  const internalValue = React.useMemo(() => {
    return typeof value === 'string' ? commonWebService.toMomentDate(value) : value;
  }, [value]);

  const handleClearDate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onChange(null);
  }, [onChange]);

  return (
    <div className="date-picker__container">
      <DatePickerAntd {...props}
        value={internalValue}
        style={{width: '100%'}}
        ref={dateRef}
        allowClear={false}
        format={dateFormat}
        className={classNames({'ant-picker--material': isMaterial, 'ant-picker--bordered': !isMaterial})}
        suffixIcon={<SuffixDateIcon/>}/>
        { value &&
          <span className={classNames('date-picker__icon-wrapper', {'date-picker__icon-wrapper--material': isMaterial})}>
              <i className="date-picker__icon-clear tio-clear" onClick={handleClearDate}></i>
          </span> 
        }
    </div>
  );
}
DatePicker.defaultProps = {
  isMaterial: false,
  dateFormat: ['DD/MM/YYYY', 'YYYY/MM/DD'],
};

export default DatePicker;
