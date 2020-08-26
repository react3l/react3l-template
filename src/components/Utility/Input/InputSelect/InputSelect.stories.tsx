import React from 'react';
import InputSelect from './InputSelect';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';


export function InputSelectStories() {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const [isTitle, setIsTitle] = React.useState(false);

    const [title, setTitle] = React.useState('');

    const [isMaterial, setIsMaterial] = React.useState(false);

    const handleExpanded = React.useCallback((event: RadioChangeEvent) => {
        setExpanded(event.target.value);
    }, []);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
    }, []);

    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
        setIsTitle(event.target.value);
        if (event.target.value) {
            setTitle('Input text');
        } else setTitle('');
    }, []);
    
    return <>
        <div style={{margin: '10px', width: '250px'}}>
                    <InputSelect expanded={expanded}
                        title={title}
                        isMaterial={isMaterial}
                        placeHolder={'Select tree node...'}/>
        </div>
        <div style={{margin: '10px', width: '250px'}}>
                    <InputSelect expanded={expanded}
                        error={'Field required'}
                        title={title}
                        isMaterial={isMaterial}
                        placeHolder={'Select tree node...'}/>
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
        <div style={{margin: '10px', width: '300px'}}>
                        <Radio.Group onChange={handleExpanded} value={expanded}>
                            <Radio value={true}>Open Select</Radio>
                            <Radio value={false}>Close Select</Radio>
                        </Radio.Group>
        </div>  
    </>;
}
