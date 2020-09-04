import { Modal } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import { RowSelectionType, SortOrder } from "antd/lib/table/interface";
import { DEFAULT_TAKE } from "react3l/config";
import { Model } from "react3l/core";
import listService from "services/list-service";
import { useCallback, useMemo, useState, Dispatch } from "react";
import { ModelFilter } from "react3l/core";
import { Observable } from "rxjs";

type KeyType = string | number;

/* services to CRUD, import, export data in table */
export class TableService {
  /**
   *
   * return selectedRowKeys from table select
   * @param: selectionType: RowSelectionType (default is checkbox)
   * @return: { rowSelection,selectedRowKeys, setSelectedRowKeys }
   *
   * */
  useRowSelection(
    selectionType: RowSelectionType = "checkbox",
    derivedRowKeys?: KeyType[], // default rowKeys
  ) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<KeyType[]>(
      derivedRowKeys,
    );

    return {
      rowSelection: useMemo(
        () => ({
          onChange(selectedRowKeys: KeyType[]) {
            // selectedRowKeys data type based on table rowKey props
            setSelectedRowKeys(selectedRowKeys);
          },
          type: selectionType,
        }),
        [selectionType],
      ),
      selectedRowKeys,
      setSelectedRowKeys,
    };
  }
  /**
   *
   * return pagination
   * @param: selectionType: RowSelectionType (default is checkbox)
   * @return: pagination: PaginationProps
   *
   * */
  usePagination<TFilter extends ModelFilter>(
    filter: TFilter,
    total: number,
  ): PaginationProps {
    return useMemo(
      () => ({
        current: Math.ceil(filter.skip / filter.take) + 1,
        pageSize: filter.take,
        total,
      }),
      [filter.skip, filter.take, total],
    );
  }
  /**
   *
   * return handleTableChange
   * @param: filter: RowSelectionType (default is checkbox)
   * @return: handleChange(newPagination: TablePaginationConfig,filters: Record<string, Key[] | null>,sorter: SorterResult<T>,) => void
   *
   * */
  useTableChange<TFilter extends ModelFilter>(
    filter: TFilter,
    setFilter: (filter: TFilter) => void,
    pagination: PaginationProps,
    handleSearch?: () => void,
  ) {
    const handleTableChange = useCallback(
      (...[newPagination, , sorter]) => {
        // check pagination change or not
        if (
          pagination.current !== newPagination.current ||
          pagination.pageSize !== newPagination.pageSize
        ) {
          const skip: number = Math.ceil(
            ((newPagination?.current ?? 0) - 1) *
              (newPagination?.pageSize ?? DEFAULT_TAKE),
          );
          const take: number = newPagination.pageSize;
          setFilter({ ...filter, skip, take });
        }
        // check sortOrder and sortDirection
        if (
          sorter.field !== filter.orderBy ||
          sorter.order !== getAntOrderType(filter, sorter.field)
        ) {
          setFilter({
            ...filter,
            orderBy: sorter.field,
            orderType: getOrderType(sorter.order),
          });
        }
        if (typeof handleSearch === "function") {
          handleSearch();
        }
      },
      [filter, pagination, setFilter, handleSearch],
    );

    const handlePagination = useCallback(
      (skip: number, take: number) => {
        setFilter({ ...filter, skip, take });
        if (typeof handleSearch === "function") {
          handleSearch();
        }
      },
      [filter, setFilter, handleSearch],
    );

    return { handleTableChange, handlePagination };
  }
  /**
   *
   * return handleLocalDelete, handleLocalBulkDelete
   * @param:
   * @return: {handleLocalDelete, handleLocalBulkDelete}
   *
   * */
  useDelete<T extends Model, TFilter extends ModelFilter>(
    filter: TFilter,
    setFilter: (filter: TFilter) => void,
    selectedRowKeys: KeyType[],
    setSelectedRowKeys: Dispatch<React.SetStateAction<KeyType[]>>,
    source?: T[],
    setSource?: (source: T[]) => void,
    handleSearch?: () => void,
  ) {
    // handleDelete, filter one item by its key and update source
    const handleLocalDelete = useCallback(
      (key: KeyType) => {
        // delete local item
        if (source?.length > 0) {
          if (typeof setSource === "function") {
            setSource(source.filter((item) => item.key !== key)); // remove one item in source by key and update source
          }
          setSelectedRowKeys(
            (selectedRowKeys as string[]).filter((item) => item !== key), // filter selectedRowKeys
          );
          setFilter({ ...filter, skip: 0, take: DEFAULT_TAKE });
          if (typeof handleSearch === "function") {
            handleSearch();
          }
          return;
        }
      },
      [
        source,
        setSource,
        setSelectedRowKeys,
        selectedRowKeys,
        setFilter,
        filter,
        handleSearch,
      ],
    );

    // delete local by key
    const handleLocalBulkDelete = useCallback(() => {
      // delete local list
      if (source?.length > 0) {
        Modal.confirm({
          title: "ban co chac muon xoa thao tac",
          content: "thao tac khong the khoi phuc",
          okType: "danger",
          onOk() {
            if (typeof setSource === "function") {
              setSource(
                source.filter(
                  (item) => !(selectedRowKeys as string[]).includes(item.key), // rowSelection serve either server table or local table, so we should cast selectedRowKeys as string[]
                ),
              ); // remove many items in source by key and update source
            }
            setSelectedRowKeys([]); // empty selectedRowKeys for disabling button
            setFilter({ ...filter, skip: 0, take: DEFAULT_TAKE });
            if (typeof handleSearch === "function") {
              handleSearch();
            }
            return;
          },
        });
      }
    }, [
      source,
      setFilter,
      filter,
      setSource,
      setSelectedRowKeys,
      selectedRowKeys,
      handleSearch,
    ]);

    return { handleLocalDelete, handleLocalBulkDelete };
  }

  /**
   *
   * expose data and event handler for master table service
   * @param: filter: TFilter
   * @param: setFilter: (filter: TFilter) => void
   * @param: getList: (filter: TFilter) => Observable<T[]>
   * @param: getTotal: (filter: TFilter) => Observable<number>
   * @param: deleteItem?: (t: T) => Observable<T>
   * @param: bulkDeleteItems?: (t: number[] | string[]) => Observable<void>,
   * @param: onUpdateListSuccess?: (item?: T) => void,
   * @param: checkBoxType?: RowSelectionType,
   * @param: isLoadControl?: boolean,
   * @param: derivedRowKeys?: KeyType[],
   * @return: { list, total, loadingList, pagination, handleChange, handleServerDelete, handleServerBulkDelete, rowSelection }
   *
   * */
  useTable<T extends Model, TFilter extends ModelFilter>(
    filter: TFilter,
    setFilter: (filter: TFilter) => void, // from TFilter to TFilter
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    deleteItem?: (t: T) => Observable<T>,
    bulkDeleteItems?: (t: KeyType[]) => Observable<void>,
    onUpdateListSuccess?: (item?: T) => void,
    checkBoxType?: RowSelectionType,
    isLoadControl?: boolean, // optional control for modal preLoading
    derivedRowKeys?: KeyType[],
    handleSearch?: () => void,
  ) {
    // selectedRowKeys
    const {
      rowSelection,
      selectedRowKeys,
      setSelectedRowKeys,
    } = this.useRowSelection(checkBoxType, derivedRowKeys);

    // from filter and source we calculate dataSource, total and loadingList
    const {
      list,
      total,
      loadingList,
      handleDelete: handleServerDelete,
      handleBulkDelete: onServerBulkDelete,
    } = listService.useList(
      filter,
      setFilter,
      getList,
      getTotal,
      deleteItem,
      bulkDeleteItems,
      selectedRowKeys as number[],
      setSelectedRowKeys,
      onUpdateListSuccess,
      isLoadControl,
    );

    // calculate pagination
    const pagination: PaginationProps = this.usePagination<TFilter>(
      filter,
      total,
    );

    // handleChange page or sorter
    const { handleTableChange, handlePagination } = this.useTableChange<
      TFilter
    >(filter, setFilter, pagination, handleSearch);

    // add confirmation
    const handleServerBulkDelete = useCallback(() => {
      Modal.confirm({
        title: "ban co chac muon xoa thao tac",
        content: "thao tac khong the khoi phuc",
        okType: "danger",
        onOk() {
          onServerBulkDelete(selectedRowKeys as number[]);
        },
      });
    }, [onServerBulkDelete, selectedRowKeys]);

    return {
      list,
      total,
      loadingList,
      pagination,
      handleTableChange,
      handlePagination,
      handleServerDelete,
      handleServerBulkDelete,
      rowSelection,
    };
  }

  /**
   *
   * expose data and event handler for localtable service
   * @param: source: T[]
   * @param: setSource: (source: T[]) => void
   * @return: { list, total, loadingList, pagination, handleChange, handleLocalDelete, handleLocalBulkDelete, rowSelection }
   *
   * */
  useLocalTable<T extends Model, TFilter extends ModelFilter>(
    list: T[],
    total: number,
    loadingList: boolean,
    handleSearch: () => void,
    filter: TFilter,
    setFilter: (filter: TFilter) => void,
    source: T[],
    setSource: (source: T[]) => void,
  ) {
    // selectedRowKeys
    const {
      rowSelection,
      selectedRowKeys,
      setSelectedRowKeys,
    } = this.useRowSelection();

    // calculate pagination
    const pagination: PaginationProps = this.usePagination<TFilter>(
      filter,
      total,
    );

    // handleChange page or sorter
    const { handleTableChange, handlePagination } = this.useTableChange<
      TFilter
    >(filter, setFilter, pagination, handleSearch);

    const { handleLocalDelete, handleLocalBulkDelete } = this.useDelete<
      T,
      TFilter
    >(
      filter,
      setFilter,
      selectedRowKeys as string[],
      setSelectedRowKeys,
      source,
      setSource,
      handleSearch,
    );

    return {
      pagination,
      handleTableChange,
      handlePagination,
      handleLocalDelete,
      handleLocalBulkDelete,
      rowSelection,
    };
  }
}

export function getAntOrderType<T extends Model, TFilter extends ModelFilter>(
  tFilter: TFilter,
  columnName: keyof T,
): SortOrder {
  if (tFilter.orderBy === columnName) {
    switch (tFilter.orderType) {
      case "asc":
        return "ascend";

      case "desc":
        return "descend";

      default:
        return null;
    }
  }
  return null;
}

export function getOrderType(sortOrder?: SortOrder) {
  switch (sortOrder) {
    case "ascend":
      return "asc";

    case "descend":
      return "desc";

    default:
      return null;
  }
}

export default new TableService();
