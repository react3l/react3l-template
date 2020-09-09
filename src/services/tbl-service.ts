import { DEFAULT_TAKE } from "@react3l/react3l/config";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Modal } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import {
  RowSelectionType,
  SortOrder,
  TableRowSelection,
} from "antd/lib/table/interface";
import {
  Dispatch,
  Reducer,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Observable } from "rxjs";
import listService from "services/list-service";

type KeyType = string | number;

export interface ModalState {
  visible?: boolean;
  loadControl?: boolean;
}

export interface ModalAction {
  type: ModalActionEnum;
}

export interface ContentTableState<
  TMapping extends Model,
  TMapper extends Model = any
> {
  mappingList?: TMapping[]; // for content table
  mapperList?: TMapper[]; // for content modal table
}

export interface ContentTableAction<
  TMapping extends Model,
  TMapper extends Model = any
> {
  type: ContentTableActionEnum;
  mappingList?: TMapping[];
  mapperList?: TMapper[];
}

export enum ModalActionEnum {
  OPEN_MODAL,
  CLOSE_MODAL,
  END_LOAD_CONTROL,
  INIT_SEARCH,
}

export enum ContentTableActionEnum {
  SET_CONTENT_SELECTION,
  SINGLE_DELETE,
  BULK_DELETE,
}

function modalTableReducer(state: ModalState, action: ModalAction) {
  switch (action.type) {
    case ModalActionEnum.OPEN_MODAL: {
      return {
        ...state,
        visible: true,
        loadControl: true,
      };
    }
    case ModalActionEnum.CLOSE_MODAL: {
      return {
        ...state,
        visible: false,
        loadControl: false,
      };
    }
    case ModalActionEnum.END_LOAD_CONTROL: {
      return {
        ...state,
        loadControl: false,
      };
    }
    case ModalActionEnum.INIT_SEARCH: {
      return {
        ...state,
        loadControl: true,
      };
    }
  }
}

function contentTableReducer<TMapping extends Model, TMapper extends Model>(
  state: ContentTableState<TMapping, TMapper>,
  action: ContentTableAction<TMapping, TMapper>,
) {
  switch (action.type) {
    case ContentTableActionEnum.SINGLE_DELETE: {
      return {
        ...state,
        mapperList: action.mapperList,
        mappingList: action.mappingList,
      };
    }
    case ContentTableActionEnum.BULK_DELETE: {
      return {
        ...state,
        mappingList: [],
        mapperList: action.mapperList,
      };
    }
    case ContentTableActionEnum.SET_CONTENT_SELECTION: {
      return {
        ...state,
        mappingList: action.mappingList,
      };
    }
  }
}

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
      derivedRowKeys ?? [],
    );

    const canBulkDelete = useMemo(() => selectedRowKeys.length > 0, [
      selectedRowKeys.length,
    ]); // decide when we can enable bulkDelete

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
      canBulkDelete,
    };
  }
  /**
   *
   * return rowSelection of contentList, contentModal
   * @param: selectedList, setSelectedList, isDisable
   * @return: { rowSelection, selectedRowKeys, setSelectedRowKeys }
   *
   * */
  useContentRowSelection<T extends Model>(
    selectedList: T[],
    setSelectedList: (t: T[]) => void,
    disabled: boolean = false,
    selectionType: RowSelectionType = "checkbox",
  ): {
    rowSelection: TableRowSelection<T>;
    canBulkDelete: boolean;
  } {
    const selectedRowKeys: KeyType[] = useMemo(
      () => selectedList.map((t: T) => (t.id ? t.id : t.key)),
      [selectedList],
    ); // selectedRowKeys accept both string and number for local and server table

    const canBulkDelete = useMemo(() => selectedRowKeys.length > 0, [
      selectedRowKeys.length,
    ]); // decide when we can enable bulkDelete

    return {
      rowSelection: useMemo(
        () => ({
          onSelect: (record: T, selected: boolean) => {
            if (selected) {
              selectedList.push(record);
              setSelectedList([...selectedList]);
            } else {
              setSelectedList(
                selectedList.filter((t: T) => {
                  return t.id ? t.id !== record.id : t.key !== record.key;
                }),
              );
            }
          }, // single selection
          onChange: (...[selectedRowKeys, selectedRows]) => {
            // if list empty, add all selectedRows to list
            if (selectedList?.length === 0) {
              setSelectedList([...selectedRows]);
              return;
            }
            // create mapper from filter
            const mapper: Record<any, number> = {};
            selectedRowKeys.forEach((key: string | number, index: number) => {
              mapper[key] = index;
            });
            // filter List which contained in mapper
            const mergeList = [...selectedList, ...selectedRows]; // merge old list with new selectedRows
            const filterList = mergeList
              .filter(
                (item, index) =>
                  mergeList
                    .map((i) => (i.id ? i.id : i.key))
                    .indexOf(item.id ? item.id : item.key) === index,
              ) // remove duplicates item
              .filter((item) => {
                const key = typeof item.id !== "undefined" ? item.id : item.key;
                return mapper.hasOwnProperty(key);
              }); // filter item which its key contained in selectedRowKeys
            setSelectedList([...filterList]);
          }, // multi selection
          getCheckboxProps: () => ({
            disabled,
          }), // pass external control for disabling selection
          type: selectionType, // selection type
          selectedRowKeys, // selectedRowKey
        }),
        [
          disabled,
          selectedList,
          selectedRowKeys,
          selectionType,
          setSelectedList,
        ],
      ),
      canBulkDelete,
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
  useLocalDelete<T extends Model, TFilter extends ModelFilter>(
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
                  (item) =>
                    !(selectedRowKeys as string[]).includes(item.key as string), // rowSelection serve either server table or local table, so we should cast selectedRowKeys as string[]
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
    isLoadControl?: boolean | undefined, // optional control for modal preLoading
    endLoadControl?: () => void, // end external control
    derivedRowKeys?: KeyType[],
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
      handleSearch,
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
      endLoadControl,
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
      handleSearch,
    };
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
  useModalTable<T extends Model, TFilter extends ModelFilter>(
    filter: TFilter,
    setFilter: (filter: TFilter) => void, // from TFilter to TFilter
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    isLoadControl: boolean | undefined, // optional control for modal preLoading
    endLoadControl: () => void, // end external control
    handleSearch: () => void, // trigger loadList
    mapperList?: T[],
  ) {
    // mappingList, mapperList reducer
    const [{ mapperList: selectedList }, dispatch] = useReducer<
      Reducer<ContentTableState<T>, ContentTableAction<T>>
    >(contentTableReducer, {
      mapperList: mapperList ?? [],
    });

    const setSelectedList = useCallback((mapperList: T[]) => {
      dispatch({
        type: ContentTableActionEnum.SET_CONTENT_SELECTION,
        mapperList,
      });
    }, []);

    // selectedRowKeys
    const { rowSelection } = this.useContentRowSelection(
      selectedList,
      setSelectedList,
    );

    // from filter and source we calculate dataSource, total and loadingList
    const { list, total, loadingList } = listService.useList(
      filter,
      setFilter,
      getList,
      getTotal,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      isLoadControl,
      endLoadControl,
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

    return {
      list,
      total,
      loadingList,
      pagination,
      handleTableChange,
      handlePagination,
      rowSelection,
      mapperList,
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
  useLocalTable<T extends Model, T2 extends Model, TFilter extends ModelFilter>(
    total: number,
    handleSearch: () => void,
    filter: TFilter,
    setFilter: (filter: TFilter) => void,
    source: T[],
    setSource: (source: T[]) => void,
    mapperField: string,
  ) {
    // mappingList, mapperList reducer
    const [{ mappingList, mapperList }, dispatch] = useReducer<
      Reducer<ContentTableState<T, T2>, ContentTableAction<T, T2>>
    >(contentTableReducer, {
      mappingList: [], // selectedContent
      mapperList:
        source?.length > 0 ? source.map(mappingToMapper(mapperField)) : [],
    });

    // define setMappingList alternater for setSelectedContent
    const setMappingList = useCallback((mappingList: T[]) => {
      dispatch({
        type: ContentTableActionEnum.SET_CONTENT_SELECTION,
        mappingList, // update mappingList.Eg: selectedContent[]
      });
    }, []);

    // selectedRowKeys
    const {
      rowSelection,
      canBulkDelete, // for UI
    } = this.useContentRowSelection(mappingList, setMappingList);

    // calculate pagination
    const pagination: PaginationProps = this.usePagination<TFilter>(
      filter,
      total,
    );

    // handleChange page or sorter
    const { handleTableChange, handlePagination } = this.useTableChange<
      TFilter
    >(filter, setFilter, pagination, handleSearch);

    // handle single delete
    const handleLocalDelete = useCallback(
      (content: T) => {
        setSource(source.filter(filterContent(content))); // remove one item in source by key and update source
        dispatch({
          type: ContentTableActionEnum.SINGLE_DELETE,
          mappingList: mappingList.filter(filterContent(content)), // for content table
          mapperList: mapperList.filter(
            filterListFromContent(content, `${mapperField}Id`),
          ), // for modal
        });
        setFilter({ ...filter, skip: 0, take: DEFAULT_TAKE }); // set default skip. take for filter
        handleSearch(); // trigger reLoad list
      },
      [
        filter,
        handleSearch,
        mapperField,
        mapperList,
        mappingList,
        setFilter,
        setSource,
        source,
      ],
    );

    //  handle bulk delete
    const handleLocalBulkDelete = useCallback(() => {
      Modal.confirm({
        title: "ban co chac muon xoa thao tac",
        content: "thao tac khong the khoi phuc",
        okType: "danger",
        onOk() {
          setSource(
            source.filter(
              filterContentNotInList(
                getIdsFromContent(mappingList, `${mapperField}Id`),
                `${mapperField}Id`,
              ),
            ),
          ); // update source
          dispatch({
            type: ContentTableActionEnum.BULK_DELETE,
            mapperList: mapperList.filter(
              filterContentNotInList(
                getIdsFromContent(mappingList, `${mapperField}Id`),
                `id`,
              ),
            ), // for modal
          });
          setFilter({ ...filter, skip: 0, take: DEFAULT_TAKE }); // set default skip. take for filter
          handleSearch(); // trigger reLoad list
        },
      });
    }, [
      filter,
      handleSearch,
      mapperField,
      mapperList,
      mappingList,
      setFilter,
      setSource,
      source,
    ]);

    return {
      pagination,
      handleTableChange,
      handlePagination,
      handleLocalDelete,
      handleLocalBulkDelete,
      rowSelection,
      canBulkDelete,
      selectedContent: mappingList,
      selectedList: mapperList,
    };
  }

  /**
   *
   * control content modal business from open, close, save data from modal
   * @param:
   * @return: { visible, loadControl, handleEndControl, handleOpenModal, handleCloseModal }
   *
   * */
  useContenModal() {
    const [{ visible, loadControl }, dispatch] = useReducer<
      Reducer<ModalState, ModalAction>
    >(modalTableReducer, {
      visible: false,
      loadControl: false,
    });

    const handleOpenModal = useCallback(() => {
      dispatch({ type: ModalActionEnum.OPEN_MODAL });
    }, []);

    const handleCloseModal = useCallback(() => {
      dispatch({ type: ModalActionEnum.CLOSE_MODAL });
    }, []);

    const handleEndControl = useCallback(() => {
      dispatch({ type: ModalActionEnum.END_LOAD_CONTROL });
    }, []);

    const handleSearchModal = useCallback(() => {
      dispatch({ type: ModalActionEnum.INIT_SEARCH });
    }, []);

    return {
      visible,
      loadControl,
      handleEndControl,
      handleOpenModal,
      handleCloseModal,
      handleSearchModal,
    };
  }
}

export function getAntOrderType<T extends Model, TFilter extends ModelFilter>(
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
}

export function getOrderType(sortOrder?: SortOrder) {
  switch (sortOrder) {
    case "ascend":
      return "ASC";

    case "descend":
      return "DESC";

    default:
      return null;
  }
}

function filterContent<T extends Model>(content: T) {
  return (item: T) => item.key !== content.key;
}

function filterListFromContent<T extends Model, T2 extends Model>(
  content: T,
  field: string,
) {
  return (item: T2) => item.id !== content[field];
}

function getIdsFromContent<T extends Model>(list: T[], fieldId: string) {
  return list.map((item) => item[fieldId]);
}

function filterContentNotInList<T extends Model>(list: any[], fieldId: string) {
  return (item: T) => !list.includes(item[fieldId]);
}

function mappingToMapper<T extends Model>(mapperField: string) {
  return (item: T) => item[mapperField];
}

export default new TableService();
