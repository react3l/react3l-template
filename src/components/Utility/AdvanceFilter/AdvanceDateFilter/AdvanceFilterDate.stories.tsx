import AdvanceDateFilter from "./AdvanceDateFilter";
import React from 'react';
import { Moment } from "moment";

export function AdvanceDateFilterStories() {
    
    const [value, setValue] = React.useState<Moment>();

    const handleChange = React.useCallback((dateMoment, dateString) => {
      setValue(dateMoment);
    }, []);

    return <div style={{margin: '10px', width: '220px'}}>
      <AdvanceDateFilter
        onChange={handleChange}
        value={value}/>
    </div>;
}