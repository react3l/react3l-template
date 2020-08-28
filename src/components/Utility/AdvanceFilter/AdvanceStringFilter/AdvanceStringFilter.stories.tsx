import React, { Reducer } from 'react';
import AdvanceStringFilter from './AdvanceStringFilter';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import { advanceFilterService, advanceFilterReducer, AdvanceFilterAction } from 'services/AdvanceFilterService';
import { ModelFilter } from 'react3l/core';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';

export class DemoFilter extends ModelFilter {
    name: StringFilter = new StringFilter();
    code: StringFilter = new StringFilter();
} 

export function AdvanceStringFilterStories() {

    const [isTitle, setIsTitle] = React.useState(false);

    const [title, setTitle] = React.useState('');

    const [modelFilter, dispatch] = React.useReducer<Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, StringFilter>>>(advanceFilterReducer, new DemoFilter());

    const [value, setValue] = advanceFilterService.useStringFilter<DemoFilter, StringFilter>(modelFilter, dispatch, 'name', 'startWith');
    
    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
        setIsTitle(event.target.value);
        if (event.target.value) {
            setTitle('Input text');
        } else setTitle('');
    }, []);
    
    React.useEffect(() => {
        
    }, [modelFilter]);

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <AdvanceStringFilter
            value={value}
            onChange={setValue}
            title={title}
            placeHolder={'Enter text...'}/>


        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeTitle} value={isTitle}>
                        <Radio value={true}>Titled</Radio>
                        <Radio value={false}>Untitled</Radio>
                    </Radio.Group>
        </div>
    </div>;
}