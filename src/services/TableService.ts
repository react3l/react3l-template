import {
  RowSelectionType,
  SortOrder,
  TableRowSelection,
} from "antd/lib/table/interface";
import React from "react";
import { Model, ModelFilter, OrderType } from "react3l/core";
import { kebabCase } from "react3l/helpers";
import { forkJoin, Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

export const tableService = {
  useMasterTable<T extends Model, TFilter extends ModelFilter>(
    modelFilter: TFilter,
    getList: (tFilter: TFilter) => Observable<T[]>,
    getTotal: (tFilter: TFilter) => Observable<number>,
  ): [T[], number, boolean] {
    const [list, setList] = React.useState<T[]>([]);

    const [total, setTotal] = React.useState<number>(0);

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
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
    }, [modelFilter, getList, getTotal]);

    return [list, total, loading];
  },

  getAntOrderType<T extends Model, TFilter extends ModelFilter>(
    tFilter: TFilter,
    columnName: keyof T,
  ): SortOrder {
    if (tFilter.orderBy === columnName) {
      switch (tFilter.orderType) {
        case "ASC":
          return "ascend";

        case "DESC":
          return "descend";

        default:
          return null;
      }
    }
    return null;
  },

  getOrderType(sortOrder?: SortOrder): OrderType {
    switch (sortOrder) {
      case "ascend":
        return "ASC";

      case "descend":
        return "DESC";

      default:
        return null;
    }
  },

  getActionColumnName<T extends Model>(TClass: new () => T) {
    return `${kebabCase(TClass.name)}-actions`;
  },

  useRowSelection<T extends Model>(
    selectionType: RowSelectionType = "checkbox",
  ): [TableRowSelection<T>, number[]] {
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
  ): [() => Subscription] {
    const handleBatchDelete = React.useCallback(() => {
      return onDelete(selectedRowKeys).subscribe(() => {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      });
    }, [onDelete, onSuccess, selectedRowKeys]);

    return [handleBatchDelete];
  },
};
