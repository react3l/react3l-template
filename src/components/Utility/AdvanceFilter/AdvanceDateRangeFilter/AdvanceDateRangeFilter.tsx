import React from 'react';
import './AdvanceDateRangeFilter.scss';
import { Model } from 'react3l/core';
import { Moment } from 'moment';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { commonWebService } from 'services/common-web-service';

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

  const internalValue: [Moment, Moment] = React.useMemo(() => {
    return [typeof value[0] === 'string' ? commonWebService.toMomentDate(value[0]) : value[0],
      typeof value[1] === 'string' ? commonWebService.toMomentDate(value[1]) : value[1]];
  }, [value]);

  const handleClearDate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onChange([null , null]);
  }, [onChange]);

  return (
    <div className="advance-date-range-filter__container">
      <RangePicker {...props}
          value={internalValue}
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
