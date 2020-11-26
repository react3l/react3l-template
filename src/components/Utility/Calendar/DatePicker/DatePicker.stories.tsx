import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import FormItem, { ValidateStatus } from 'components/Utility/FormItem/FormItem';
import { Moment } from 'moment';
import React from 'react';
import InputText from "./../../Input/InputText/InputText";
import DatePicker from './DatePicker';

export function DatePickerStories() {
    const [isMaterial, setIsMaterial] = React.useState(false);
    
    const [value, setValue] = React.useState<Moment>();

    const [inputValue, setInputValue] = React.useState();

    const handleChange = React.useCallback((dateMoment, dateString) => {
      setValue(dateMoment);
    }, []);

    const handleChangeInput = React.useCallback((value) => {
      setInputValue(value);
    }, []);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
      setIsMaterial(event.target.value);
    }, []);

    return <div style={{margin: '10px', width: '220px'}}>
      <DatePicker isMaterial={isMaterial}
        onChange={handleChange}
        value={value}/>
      <InputText isMaterial={isMaterial} 
        value={inputValue}
        onChange={handleChangeInput}
        />
      <div style={{margin: '10px', width: '300px'}}>
        <FormItem label={"Date Picker:"}
          validateStatus={ValidateStatus.error} 
          message={'Field required!'} 
          hasIcon={!isMaterial}>
          <DatePicker isMaterial={isMaterial}
            onChange={handleChange}
            error={'Field required!'}
            value={value}/>
        </FormItem>
      </div>
      <div style={{margin: '10px', width: '300px'}}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
            <Radio value={true}>Material Style</Radio>
            <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </div>;
}