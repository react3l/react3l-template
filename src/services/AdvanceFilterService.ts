import { Moment } from 'moment';
import React from 'react';
import { DateFilter } from 'react3l-advanced-filters/DateFilter';
import { Filter } from 'react3l-advanced-filters/Filter';
import { NumberFilter } from 'react3l-advanced-filters/NumberFilter';
import { ModelFilter, OrderType } from 'react3l/core';
import nameof from 'ts-nameof.macro';
import { TablePaginationConfig } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';
import { tableService } from './TableService';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';
import { IdFilter } from 'react3l-advanced-filters/IdFilter';

export enum ActionFilterEnum {
    ChangeAllField,
    ChangeOneField,
    ChangeSkipTake,
    ChangeOrderType,
}

export interface AdvanceFilterAction<T1, T2> {
    type: ActionFilterEnum;
    classFilter?: new (partial?: any) => T2;
    data?: T1;
    fieldName?: keyof T1;
    fieldType?: keyof T2;
    fieldValue?: any;
    skip?: number;
    take?: number;
    orderBy?: string | number | (string | number)[];
    orderType?: OrderType;
}

export function advanceFilterReducer<T1 extends ModelFilter, T2 extends Filter>
    (state: T1, action: AdvanceFilterAction<T1, T2>) {
    switch(action.type) {
        case ActionFilterEnum.ChangeOneField:
            return {
                ...state,
                [action.fieldName]: new action.classFilter({
                    [action.fieldType]: action.fieldValue,
                }),
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
                orderBy: action.orderBy,
                orderType: action.orderType,
            };
    }
}

export const advanceFilterService = {
    useFilter <TFilter extends ModelFilter> (
        modelFilter: TFilter,
        dispatch: (action: AdvanceFilterAction<TFilter, StringFilter | NumberFilter | DateFilter | IdFilter>) => void,
        ClassFilter: new () => TFilter,
    ): [
        (
          fieldName: keyof TFilter,
          fieldType: keyof (StringFilter | NumberFilter | DateFilter | IdFilter) | (keyof StringFilter | NumberFilter | DateFilter | IdFilter)[],
          ClassSubFilter: new () => (StringFilter | NumberFilter | DateFilter | IdFilter),
        ) => (value: any) => void,
        (
          newPagination: TablePaginationConfig,
          filters: Record<string, Key[] | null>,
          sorter: SorterResult<TFilter>,
        ) => void,
        (skip: number, take: number) => void,
        () => void,
        (data: TFilter) => void,
    ] {

      const handleChangeFilter = React.useCallback(
        (   fieldName: string, 
            fieldType: keyof Filter | (keyof Filter)[], 
            ClassSubFilter: new (partial?: any) => (StringFilter | NumberFilter | DateFilter | IdFilter),
        ) => (value: any) => {
        if(fieldType instanceof Array) {
            dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: {...modelFilter,
                    [fieldName]: new ClassSubFilter({
                        [nameof('greater')]: value[0],
                        [nameof('less')]: value[1],
                    }),
                },
            });
        } else {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: value,
                classFilter: ClassSubFilter,
              });
        }
        },
        [dispatch, modelFilter],
      );
  
      const handleChangeOrder = React.useCallback(
        (
          newPagination: TablePaginationConfig,
          filters: Record<string, Key[] | null>,
          sorter: SorterResult<TFilter>,
        ) => {
          if (
            sorter.field !== modelFilter.orderBy ||
            sorter.order !==
              tableService.getAntOrderType(modelFilter, sorter.field)
          ) {
            dispatch({
              type: ActionFilterEnum.ChangeOrderType,
              orderBy: sorter.field,
              orderType: tableService.getOrderType(sorter.order),
            });
            return;
          }
        },
        [dispatch, modelFilter],
      );
  
      const handlePagination = React.useCallback(
        (skip: number, take: number) => {
          dispatch({
            type: ActionFilterEnum.ChangeSkipTake,
            skip,
            take,
          });
        },
        [dispatch],
      );
  
      const handleResetFilter = React.useCallback(() => {
        const newFilter = new ClassFilter();
        newFilter.skip = 0;
        newFilter.take = 10;
  
        dispatch({
          type: ActionFilterEnum.ChangeAllField,
          data: newFilter,
        });
      }, [dispatch, ClassFilter]);
  
      const handleUpdateNewFilter = React.useCallback((data: TFilter) => {
        dispatch({ type: ActionFilterEnum.ChangeAllField, data });
      }, [dispatch]);

      return [
        handleChangeFilter,
        handleChangeOrder,
        handlePagination,
        handleResetFilter,
        handleUpdateNewFilter,
      ];
    },

    useAdvaceFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        fieldType: keyof T2Filter,
        ClassFilter: new (partial?: any) => T2Filter,
    ):[
        any,
        (value: any) => void
    ] {
        const value = modelFilter[fieldName][fieldType];
        const handleChangeFilter = React.useCallback((value: any) => {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                classFilter: ClassFilter,
                fieldValue: value,
            });
        }, [dispatch, fieldName, fieldType, ClassFilter]);

        return [
            value, 
            handleChangeFilter,
        ];
    },

    useAdvanceFilterRange <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        ClassFilter: new (partial?: any) => T2Filter,
    ): [
        [any, any],
        (valueRange: [any, any]) => void,
    ] {
        const valueFrom = modelFilter[fieldName][nameof('greater')];
        const valueTo = modelFilter[fieldName][nameof('less')];
        const value: [any, any] = [valueFrom, valueTo];
        const handleChangeRange = React.useCallback((valueRange: [any, any]) => {
            dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: {...modelFilter,
                    [fieldName]: new ClassFilter({
                        [nameof('greater')]: valueRange[0],
                        [nameof('less')]: valueRange[1],
                    }),
                },
            });
        }, [dispatch, fieldName, modelFilter, ClassFilter]);
        return [
            value,
            handleChangeRange,
        ];
    },

    useStringFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        fieldType: keyof T2Filter,
    ):[
        string,
        (value: string) => void
    ] {
        const value = modelFilter[fieldName][fieldType];
        const handleChangeFilter = React.useCallback((value: string) => {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: value,
            });
        }, [dispatch, fieldName, fieldType]);

        return [
            value, 
            handleChangeFilter,
        ];
    },

    useNumberFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        fieldType: keyof T2Filter,
    ):[
        number,
        (value: number) => void
    ] {
        const value = modelFilter[fieldName][fieldType];
        const handleChangeFilter = React.useCallback((value: number) => {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: value,
            });
        }, [dispatch, fieldName, fieldType]);
        
        return [
            value, 
            handleChangeFilter,
        ];
    },

    useIdFilter <T1Filter extends ModelFilter, T2Filter extends  Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        fieldType: keyof T2Filter,
    ): [
        number,
        (id: number) => void,
    ] {
        const idValue = modelFilter[fieldName][fieldType];
        const handleIdFilter = React.useCallback((id: number) => {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: id || null,
            });
        }, [dispatch, fieldName, fieldType]);
        return [
            idValue, 
            handleIdFilter,
        ];
    },

    useDateFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
        fieldType: keyof T2Filter,
    ): [
        Moment,
        (date: Moment) => void,
    ] {
        const value = modelFilter[fieldName][fieldType];
        const handleDateFilter = React.useCallback((date: Moment) => {
            dispatch({
                type: ActionFilterEnum.ChangeOneField,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: date || null,
            });
        }, [dispatch, fieldName, fieldType]);

        return [
            value, 
            handleDateFilter,
        ];
    },

    useNumberRangeFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
    ): [
        [number, number],
        (numberRange: [number, number]) => void,
    ] {
        const valueFrom = modelFilter[fieldName][nameof(NumberFilter.prototype.greater)];
        const valueTo = modelFilter[fieldName][nameof(NumberFilter.prototype.less)];
        const value: [number, number] = [valueFrom, valueTo];
        const handleChangeNumberRange = React.useCallback((numberRange: [number, number]) => {
            dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: {...modelFilter,
                    [fieldName]: {
                        [nameof(NumberFilter.prototype.greater)]: numberRange[0],
                        [nameof(NumberFilter.prototype.less)]: numberRange[1],
                    },
                },
            });
        }, [dispatch, fieldName, modelFilter]);
        return [
            value,
            handleChangeNumberRange,
        ];
    },

    useDateRangeFilter <T1Filter extends ModelFilter, T2Filter extends Filter> (
        modelFilter: T1Filter,
        dispatch: (action: AdvanceFilterAction<T1Filter, T2Filter>) => void,
        fieldName: keyof T1Filter,
    ): [
        [Moment, Moment],
        (dateRange: [Moment, Moment]) => void,
    ] {
        const valueFrom = modelFilter[fieldName][nameof(DateFilter.prototype.greater)] || null;
        const valueTo = modelFilter[fieldName][nameof(DateFilter.prototype.less)] || null;
        const value: [Moment, Moment] = [valueFrom, valueTo];
        const handleDateRangeFilter = React.useCallback((dateRange: [Moment, Moment]) => {
            dispatch({
                type: ActionFilterEnum.ChangeAllField,
                data: {...modelFilter,
                    [fieldName]: {
                        [nameof(DateFilter.prototype.greater)]: dateRange[0] || null,
                        [nameof(DateFilter.prototype.less)]: dateRange[1] || null,
                    },
                },
            });
        }, [dispatch, fieldName, modelFilter]);
        return [
            value,
            handleDateRangeFilter,
        ];
    },
};