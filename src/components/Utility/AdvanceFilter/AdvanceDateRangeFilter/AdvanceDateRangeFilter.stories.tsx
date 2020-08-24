import React from 'react';
import AdvanceDateRangeFilter from './AdvanceDateRangeFilter';
import { Moment } from 'moment';

export function AdvanceDateRangeFilterStories() {
    const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);

    const handleChange = React.useCallback((dateMoment, dateString) => {
      setValue(dateMoment);
    }, []);


    return <div style={{margin: '10px', width: '250px'}}>
      <AdvanceDateRangeFilter 
        onChange={handleChange}
        value={value}/>
    </div>;
}