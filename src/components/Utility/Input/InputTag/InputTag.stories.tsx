import React from 'react';
import InputTag from './InputTag';
import { Model } from 'react3l/core';
import { debounce } from 'react3l/helpers';
import { DEBOUNCE_TIME_300 } from 'react3l/config';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import FormItem, { ValidateStatus } from 'components/Utility/FormItem/FormItem';
const demoItemList = [
    {id: 1, name: 'Tag 1', code: '1'},
    {id: 2, name: 'Tag 2', code: '2'},
    {id: 3, name: 'Tag 3', code: '3'},
    {id: 4, name: 'Tag 3', code: '4'},
    {id: 5, name: 'Tag 3', code: '5'},
];
export function InputTagStories() {
    const [listItem, setListItem] = React.useState<Model[]>(demoItemList);

    const [isMaterial, setIsMaterial] = React.useState(false);

    const handleClearItem = React.useCallback((item: Model) => {
        const newListItem = listItem.filter((currentItem) => currentItem.id !== item.id);
        setListItem(newListItem);
    },[listItem]);

    const handleSearchItem = React.useCallback(debounce((searchTerm: string) => {
        // write call api here
      }, DEBOUNCE_TIME_300), []);
    
    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
        setIsMaterial(event.target.value);
    }, []);

    return (<div style={{margin: '10px', width: '380px'}}>
                <InputTag listItem={listItem}
                    isMaterial={isMaterial}
                    placeHolder={'Select tree node...'}
                    onSearch={handleSearchItem}
                    onClear={handleClearItem}/>

                <div style={{marginTop: '10px', width: '380px'}}>
                    <FormItem validateStatus={ValidateStatus.error}
                        label={'Select field:'}
                        message={'Field required!'}
                        hasIcon={!isMaterial}>
                            <InputTag listItem={listItem}
                                isMaterial={isMaterial}
                                placeHolder={'Select tree node...'}
                                onSearch={handleSearchItem}
                                onClear={handleClearItem}
                                error={'Field required!'}/>
                    </FormItem>
                </div>
                    
                <button className="btn btn-info" 
                    style={{marginTop: '10px'}}
                    onClick={() => setListItem(demoItemList)}>
                    Reset
                </button>
                <div style={{margin: '10px', width: '300px'}}>
                    <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
                        <Radio value={true}>Material Style</Radio>
                        <Radio value={false}>Normal Style</Radio>
                    </Radio.Group>
                </div>
            </div>);
}