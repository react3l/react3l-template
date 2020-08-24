import React from 'react';
import './AdvanceDateRangeFilter.scss';
import { Model } from 'react3l/core';
import { Moment } from 'moment';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;

function SuffixDateIcon () {
  return <span className="advance-date-range-filter__icon">
    <i className="tio-calendar"></i>
  </span>;
}

interface AdvanceDateRangeFilterProps<T extends Model> {
  value?: [Moment, Moment];
  dateFormat?: string[];
  onChange?: (value: [Moment, Moment], dateString?: [string, string]) => void;
}

function AdvanceDateRangeFilter(props: AdvanceDateRangeFilterProps<Model> & RangePickerProps) { 
  const {
    value,
    dateFormat,
    onChange,
  } = props;

  const handleClearDate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onChange([null , null]);
  }, [onChange]);

  return (
    <div className="advance-date-range-filter__container">
      <RangePicker {...props}
          style={{width: '100%'}}
          allowClear={false}
          format={dateFormat}
          placeholder={['Pick date1...', 'Pick date2...']}
          suffixIcon={<SuffixDateIcon />}/>
        { value[0] &&
          <span className="advance-date-range-filter__icon-wrapper">
              <i className="advance-date-range-filter__icon-clear tio-clear" onClick={handleClearDate}></i>
          </span> 
        }
    </div>
  );
}

AdvanceDateRangeFilter.defaultProps = {
  isMaterial: false,
  dateFormat: ['DD/MM/YYYY', 'YYYY/MM/DD'],
};

export default AdvanceDateRangeFilter;
