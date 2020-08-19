import React from 'react';
import { ModelFilter } from 'react3l/core';
import { Filter } from 'react3l-advanced-filters/Filter';

export enum ActionFilterEnum {
    ChangeAllField,
    ChangeOneField,
    ChangeSkipTake,
    ChangeOrderType,
}

export interface AdvanceFilterAction<T1, T2> {
    type: ActionFilterEnum;
    data?: T1;
    fieldName?: keyof T1;
    fieldType?: keyof T2;
    fieldValue?: any;
    skip?: number;
    take?: number;
    orderType?: string; 
}

export function advanceFilterReducer<T1 extends ModelFilter, T2 extends Filter>
    (state: T1, action: AdvanceFilterAction<T1, T2>) {
    switch(action.type) {
        case ActionFilterEnum.ChangeOneField:
            return {
                ...state,
                [action.fieldName]: {
                    [action.fieldType]: action.fieldValue,
                },
            };
        case ActionFilterEnum.ChangeAllField:
            return action.data;
        case ActionFilterEnum.ChangeSkipTake:
            return {
                ...state,
                skip: action.skip,
                take: action.take,
            };
        case ActionFilterEnum.ChangeOrderType:
            return {
                ...state,
                orderType: action.orderType,
            };
    }
}

export const advanceFilterService = {
    useFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        fieldType: keyof T2Filter,
    ):[
        string,
        (stringTerm: string) => void
    ] {
        const value = modelFilter[fieldName][fieldType];
        const handleChangeStringFilter = React.useCallback((stringTerm: string) => {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: stringTerm,
            });
        }, [dispatch, fieldName, fieldType]);

        return [
            value, 
            handleChangeStringFilter,
        ];
    },
};