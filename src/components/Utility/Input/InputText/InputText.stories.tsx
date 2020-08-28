import React, { Reducer } from 'react';
import InputText from './InputText';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import { advanceFilterService, advanceFilterReducer, AdvanceFilterAction } from 'services/AdvanceFilterService';
import { ModelFilter } from 'react3l/core';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';

export class DemoFilter extends ModelFilter {
    name: StringFilter = new StringFilter();
    code: StringFilter = new StringFilter();
} 

export function InputTextStories() {
    const [isMaterial, setIsMaterial] = React.useState(false);

    const [isTitle, setIsTitle] = React.useState(false);

    const [iconName, setIconName] = React.useState('');

    const [title, setTitle] = React.useState('');

    const [modelFilter, dispatch] = React.useReducer<Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, StringFilter>>>(advanceFilterReducer, new DemoFilter());

    const [value, setValue] = advanceFilterService.useStringFilter<DemoFilter, StringFilter>(modelFilter, dispatch, 'name', 'startWith');
    
    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
        if (event.target.value) {
            setIconName('tio-files_labeled_outlined');
        } else setIconName('');
    }, []);

    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
        setIsTitle(event.target.value);
        if (event.target.value) {
            setTitle('Input text');
        } else setTitle('');
    }, []);
    
    React.useEffect(() => {
        
    }, [modelFilter]);

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <InputText isMaterial={isMaterial}
            value={value}
            onChange={setValue}
            title={title}
            placeHolder={'Enter text...'}
            className={iconName}/>

        <div style={{marginTop: '10px', width: '100%'}}>
            <InputText isMaterial={isMaterial}
                value={value}
                onChange={setValue}
                title={title}
                placeHolder={'Enter text...'}
                className={iconName}
                error={'Field required'}/>
        </div>

        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
                        <Radio value={true}>Material Style</Radio>
                        <Radio value={false}>Normal Style</Radio>
                    </Radio.Group>
        </div>
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeTitle} value={isTitle}>
                        <Radio value={true}>Titled</Radio>
                        <Radio value={false}>Untitled</Radio>
                    </Radio.Group>
        </div>
    </div>;
}