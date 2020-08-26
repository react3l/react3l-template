import React from 'react';
import './DateRange.scss';
import { Model } from 'react3l/core';
import { Moment } from 'moment';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import { RangePickerProps } from 'antd/lib/date-picker';
import { commonWebService } from 'services/common-web-service';

const { RangePicker } = DatePicker;

function SuffixDateIcon () {
  return <span className="date-range__icon">
    <i className="tio-calendar"></i>
  </span>;
}

interface DateRangeProps<T extends Model> {
  value: [Moment, Moment];
  isMaterial?: boolean;
  dateFormat?: string[];
  onChange?: (value: [Moment, Moment], dateString?: [string, string]) => void;
}

function DateRange(props: DateRangeProps<Model> & RangePickerProps) { 
  const {
    value,
    isMaterial,
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
    <div className="date-range__container">
      <RangePicker {...props}
          value={internalValue}
          style={{width: '100%'}}
          allowClear={false}
          format={dateFormat}
          className={classNames({'ant-picker--material': isMaterial})}
          placeholder={['Pick date1...', 'Pick date2...']}
          suffixIcon={<SuffixDateIcon />}/>
        { internalValue[0] &&
          <span className={classNames('date-range__icon-wrapper', {'date-range__icon-wrapper--material': isMaterial})}>
              <i className="date-range__icon-clear tio-clear" onClick={handleClearDate}></i>
          </span> 
        }
    </div>
  );
}
DateRange.defaultProps = {
  isMaterial: false,
  dateFormat: ['DD/MM/YYYY', 'YYYY/MM/DD'],
};

export default DateRange;
