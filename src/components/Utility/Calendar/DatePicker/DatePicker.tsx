import React from 'react';
import './DatePicker.scss';
import { DatePicker as DatePickerAntd } from 'antd';
import { Model } from 'react3l/core';
import { Moment } from 'moment';

import classNames from 'classnames';
import { DatePickerProps as AntdDatePickerProps } from 'antd/lib/date-picker';

function SuffixDateIcon () {
  return <span className="date-picker__icon">
    <i className="tio-calendar"></i>
  </span>;
}

interface DatePickerProps<T extends Model> {
  value?: Moment;
  isMaterial?: boolean;
  dateFormat?: string;
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

  const handleClearDate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onChange(null);
  }, [onChange]);

  return (
    <div className="date-picker__container">
      <DatePickerAntd {...props}
        style={{width: '100%'}}
        ref={dateRef}
        allowClear={false}
        format={dateFormat}
        className={classNames({'ant-picker--material': isMaterial})}
        suffixIcon={<SuffixDateIcon />}/>
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
  dateFormat: 'DD/MM/YYYY',
};

export default DatePicker;
