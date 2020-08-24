import React from 'react';
import './AdvanceDateFilter.scss';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { Model } from 'react3l/core';
import { Moment } from 'moment';

function SuffixDateIcon () {
  return <span className="advance-filter-date__icon">
    <i className="tio-calendar"></i>
  </span>;
}

interface AdvanceFilterDateProps<T extends Model> {
  value?: Moment | [Moment, Moment];
  dateFormat?: string[];
  onChange?: (value: Moment | [Moment, Moment], dateString?: string) => void;
}

function AdvanceFilterDate(props: AdvanceFilterDateProps<Model> & DatePickerProps) { 
  const {
    value,
    dateFormat,
    onChange,
  } = props;

  const dateRef = React.useRef<any>();

  const handleClearDate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onChange(null);
  }, [onChange]);

  return (
    <div className="advance-filter-date__container">
      <DatePicker {...props}
        style={{width: '100%'}}
        ref={dateRef}
        allowClear={false}
        format={dateFormat}
        suffixIcon={<SuffixDateIcon />}/>
        { value &&
          <span className="advance-filter-date__icon-wrapper">
              <i className="advance-filter-date__icon-clear tio-clear" onClick={handleClearDate}></i>
          </span> 
        }
    </div>
  );
}

AdvanceFilterDate.defaultProps = {
  isMaterial: false,
  dateFormat: ['DD/MM/YYYY', 'YYYY/MM/DD'],
};

export default AdvanceFilterDate;