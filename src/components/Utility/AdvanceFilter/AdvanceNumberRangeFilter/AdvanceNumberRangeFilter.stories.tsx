import React, { Reducer } from 'react';
import AdvanceNumberRangeFilter from './AdvanceNumberRangeFilter';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import { advanceFilterReducer, AdvanceFilterAction, advanceFilterService } from 'services/advance-filter-service';
import { ModelFilter } from 'react3l/core';
import { NumberFilter } from 'react3l-advanced-filters/NumberFilter';

class DemoFilter extends ModelFilter {
    number: NumberFilter = new NumberFilter();
}

export function AdvanceNumberRangeFilterStories() {
    const [value, setValue] = React.useState<[number, number]>([null , null]);

    const [isTitle, setIsTitle] = React.useState(false);

    const [title, setTitle] = React.useState('');

    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
        setIsTitle(event.target.value);
        if (event.target.value) {
            setTitle('Input text');
        } else setTitle('');
    }, []);

    const handleChange = React.useCallback((value: [number, number]) => {
        setValue(value);
    }, []);

    const [filter, dispatch] = React.useReducer<Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, NumberFilter>>>(advanceFilterReducer, new DemoFilter());

    const [numberRange, setNumberRange] = advanceFilterService.useNumberRangeFilter(filter, dispatch, 'number');

    return <div style={{width: '250px', margin: '10px', backgroundColor: '#F2F2F2'}}>
        <AdvanceNumberRangeFilter
            placeHolderRange={['From...', 'To...']}
            title={title}
            valueRange={numberRange}
            onChangeRange={setNumberRange}
            />
        <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeTitle} value={isTitle}>
                        <Radio value={true}>Titled</Radio>
                        <Radio value={false}>Untitled</Radio>
                    </Radio.Group>
        </div>
    </div>;
}