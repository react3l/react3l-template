import {Key, RowSelectionType, SorterResult, SortOrder, TablePaginationConfig, TableRowSelection} from 'antd/lib/table/interface';
import React from 'react';
import {Model, ModelFilter, OrderType} from 'react3l/core';
import {kebabCase} from 'react3l/helpers';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import { AdvanceFilterAction, ActionFilterEnum } from './AdvanceFilterService';
import { Filter } from 'react3l-advanced-filters/Filter';
import { NumberFilter } from 'react3l-advanced-filters/NumberFilter';
import { DateFilter } from 'react3l-advanced-filters/DateFilter';
import { IdFilter } from 'react3l-advanced-filters/IdFilter';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';

export const tableService = {
  useMasterTable<T extends Model, TFilter extends ModelFilter>(
    ClassFilter: new () => TFilter,
    modelFilter: TFilter,
    dispatch: (action: AdvanceFilterAction<TFilter, Filter>) => void,
    getList: (tFilter: TFilter) => Observable<T[]>,
    getTotal: (tFilter: TFilter) => Observable<number>,
  ): [
    T[],
    number,
    boolean,
    (fieldName: string, fieldType: keyof Filter) => (value: string | number) => void,
    (
      newPagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<T>,
    ) => void,
    (skip: number, take: number) => void,
    () => void,
  ] {
    const [list, setList] = React.useState<T[]>([]);

    const [total, setTotal] = React.useState<number>(0);

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(
      () => {
        setLoading(true);
        const subscription: Subscription = forkJoin([
          getList(modelFilter),
          getTotal(modelFilter),
        ])
          .pipe(
            finalize(() => {
              setLoading(false);
            }),
          )
          .subscribe(([list, total]) => {
            setList(list);
            setTotal(total);
          });

        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [modelFilter, getList, getTotal],
    );

    const handlePagination = React.useCallback((skip: number, take: number) => {
      dispatch({
        type: ActionFilterEnum.ChangeSkipTake,
        skip,
        take,
      });
    }, [dispatch]);

    const handleChange = React.useCallback((fieldName: string, fieldType: keyof Filter) => (value: string | number) => {
      dispatch({
        type: ActionFilterEnum.ChangeOneField,
        fieldName: fieldName,
        fieldType: fieldType,
        fieldValue: value,
      });
    }, [dispatch]);

    const handleChangeTable = React.useCallback(
      (
        newPagination: TablePaginationConfig,
        filters: Record<string, Key[] | null>,
        sorter: SorterResult<T>,
      ) => {
        if (sorter.field !== modelFilter.orderBy || sorter.order !== this.getAntOrderType(modelFilter, sorter.field)) {
          dispatch({
            type: ActionFilterEnum.ChangeOrderType,
            orderBy: sorter.field,
            orderType: this.getOrderType(sorter.order),
          });
          return;
        }
      },
      [dispatch, modelFilter],
    );

    const handleResetFilter = React.useCallback(
      () => {
        dispatch({
          type: ActionFilterEnum.ChangeAllField,
          data: new ClassFilter(),
        });
      },
      [dispatch, ClassFilter],
    );

    return [
      list,
      total,
      loading,
      handleChange,
      handleChangeTable,
      handlePagination,
      handleResetFilter,
    ];
  },

  getAntOrderType<T extends Model, TFilter extends ModelFilter>(tFilter: TFilter, columnName: keyof T): SortOrder {
    if (tFilter.orderBy === columnName) {
      switch (tFilter.orderType) {
        case 'ASC':
          return 'ascend';

        case 'DESC':
          return 'descend';

        default:
          return null;
      }
    }
    return null;
  },

  getOrderType(sortOrder?: SortOrder): OrderType {
    switch (sortOrder) {
      case 'ascend':
        return 'ASC';

      case 'descend':
        return 'DESC';

      default:
        return null;
    }
  },

  getActionColumnName<T extends Model>(TClass: new () => T) {
    return `${kebabCase(TClass.name)}-actions`;
  },

  useRowSelection<T extends Model>(selectionType: RowSelectionType = 'checkbox'): [
    TableRowSelection<T>,
    number[],
  ] {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<number[]>([]);

    return [
      React.useMemo(
        () => ({
          onChange(selectedRowKeys: number[]) {
            setSelectedRowKeys(selectedRowKeys);
          },
          type: selectionType,
        }),
        [selectionType],
      ),
      selectedRowKeys,
    ];
  },

  useBatchDelete(
    selectedRowKeys: number[],
    onDelete: (selectedRowKeys: number[]) => Observable<void>,
    onSuccess?: () => void,
  ): [
    () => Subscription,
  ] {
    const handleBatchDelete = React.useCallback(
      () => {
        return onDelete(selectedRowKeys)
          .subscribe(
            () => {
              if (typeof onSuccess === 'function') {
                onSuccess();
              }
            },
          );
      },
      [onDelete, onSuccess, selectedRowKeys],
    );

    return [
      handleBatchDelete,
    ];
  },
};
