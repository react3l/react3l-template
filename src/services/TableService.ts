import {PaginationProps} from 'antd/lib/pagination';
import {Key, RowSelectionType, SorterResult, SortOrder, TablePaginationConfig, TableRowSelection} from 'antd/lib/table/interface';
import React from 'react';
import {DEFAULT_TAKE} from 'react3l/config';
import {Model, ModelFilter, OrderType} from 'react3l/core';
import {kebabCase} from 'react3l/helpers';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

export const tableService = {
  useMasterTable<T extends Model, TFilter extends ModelFilter>(
    FilterClass: new () => TFilter,
    getList: (tFilter: TFilter) => Observable<T[]>,
    getTotal: (tFilter: TFilter) => Observable<number>,
  ): [
    T[],
    TFilter,
    boolean,
    PaginationProps,
    (
      newPagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<T>,
    ) => void,
    () => void,
  ] {
    const [list, setList] = React.useState<T[]>([]);

    const [total, setTotal] = React.useState<number>(0);

    const [filter, setFilter] = React.useState<TFilter>(new FilterClass());

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(
      () => {
        setLoading(true);
        const subscription: Subscription = forkJoin([
          getList(filter),
          getTotal(filter),
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
      [filter, getList, getTotal],
    );

    const pagination: PaginationProps = React.useMemo(
      () => {
        return {
          current: Math.ceil(filter.skip / filter.take) + 1,
          pageSize: filter.take,
          total,
        };
      },
      [filter.skip, filter.take, total],
    );

    const handleChange = React.useCallback(
      (
        newPagination: TablePaginationConfig,
        filters: Record<string, Key[] | null>,
        sorter: SorterResult<T>,
      ) => {
        if (pagination.current !== newPagination.current || pagination.pageSize !== newPagination.pageSize) {
          const skip: number = Math.ceil(((newPagination?.current ?? 0) - 1) * (newPagination?.pageSize ?? DEFAULT_TAKE));
          setFilter({
            ...filter,
            skip,
            take: newPagination.pageSize,
          });
          return;
        }
        if (sorter.field !== filter.orderBy || sorter.order !== this.getAntOrderType(filter, sorter.field)) {
          setFilter({
            ...filter,
            orderBy: sorter.field,
            orderType: this.getOrderType(sorter.order),
          });
          return;
        }
      },
      [filter, pagination],
    );

    const handleResetFilter = React.useCallback(
      () => {
        setFilter(new FilterClass());
      },
      [FilterClass],
    );

    return [
      list,
      filter,
      loading,
      pagination,
      handleChange,
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
