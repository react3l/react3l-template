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
  SetStateAction,
  useCallback,
  useEffect,
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
  listName?: string;
  mappingList?: TMapping[];
  mapperList?: TMapper[];
  data?: any[];
}

export enum ModalActionEnum {
  OPEN_MODAL,
  CLOSE_MODAL,
  END_LOAD_CONTROL,
  INIT_SEARCH,
}

export enum ContentTableActionEnum {
  SET_LIST_SELECTION,
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
        mappingList: action.mappingList,
      };
    }
    case ContentTableActionEnum.BULK_DELETE: {
      return {
        ...state,
        mappingList: [],
      };
    }
    case ContentTableActionEnum.SET_LIST_SELECTION: {
      return {
        ...state,
        [action.listName]: action.data,
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
    const selectedRowKeys: KeyType[] = useMemo(() => {
      return selectedList.length > 0
        ? selectedList.map((t: T) => (t.id ? t.id : t.key))
        : [];
    }, [selectedList]); // selectedRowKeys accept both string and number for local and server table

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
    handleSearch?: () => void,
  ) {
    const handleTableChange = useCallback(
      (...[, , sorter]) => {
        let newFilter = { ...filter }; // dont check pagination change because of we customize it
        if (
          sorter.field !== filter.orderBy ||
          sorter.order !== getAntOrderType(filter, sorter.field)
        ) {
          newFilter = {
            ...newFilter,
            orderBy: sorter.field,
            orderType: getOrderType(sorter.order),
          };
        } // check sortOrder and sortDirection
        setFilter({ ...newFilter }); // setFilter
        if (typeof handleSearch === "function") {
          handleSearch();
        } // handleSearch
      },
      [filter, setFilter, handleSearch],
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
    loadList, // control external loadList
    setLoadList, // setControl ...
    handleSearch, // trigger search
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    deleteItem?: (t: T) => Observable<T>,
    bulkDeleteItems?: (t: KeyType[]) => Observable<void>,
    onUpdateListSuccess?: (item?: T) => void,
    checkBoxType?: RowSelectionType,
    derivedRowKeys?: KeyType[],
  ) {
    // selectedRowKeys
    const {
      rowSelection,
      selectedRowKeys,
      setSelectedRowKeys,
      canBulkDelete,
    } = this.useRowSelection(checkBoxType, derivedRowKeys);

    // from filter and source we calculate dataSource, total and loadingList
    const {
      list,
      total,
      loadingList,
      handleDelete: onServerDelete,
      handleBulkDelete: onServerBulkDelete,
    } = listService.useList(
      filter,
      setFilter,
      loadList,
      setLoadList,
      handleSearch,
      getList,
      getTotal,
      deleteItem,
      bulkDeleteItems,
      selectedRowKeys as number[],
      setSelectedRowKeys,
      onUpdateListSuccess,
    );

    // calculate pagination
    const pagination: PaginationProps = this.usePagination<TFilter>(
      filter,
      total,
    );

    // handleChange page or sorter
    const { handleTableChange, handlePagination } = this.useTableChange<
      TFilter
    >(filter, setFilter, handleSearch);

    const handleServerDelete = useCallback(
      (item: T) => {
        Modal.confirm({
          title: "ban co chac muon xoa thao tac",
          content: "thao tac khong the khoi phuc",
          okType: "danger",
          onOk() {
            onServerDelete(item);
          },
        });
      },
      [onServerDelete],
    );

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
      canBulkDelete,
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
    loadList: boolean,
    setLoadList: Dispatch<SetStateAction<boolean>>,
    handleSearch: () => void,
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    mapperList?: T[],
  ) {
    // mappingList, mapperList reducer
    const [{ mapperList: selectedList }, dispatch] = useReducer<
      Reducer<ContentTableState<T>, ContentTableAction<T>>
    >(contentTableReducer, {
      mapperList: mapperList ?? [],
    });
    const setSelectedList = useCallback((list: T[]) => {
      dispatch({
        type: ContentTableActionEnum.SET_LIST_SELECTION,
        listName: "mapperList",
        data: list,
      });
    }, []);

    // selectedRowKeys
    const { rowSelection } = this.useContentRowSelection(
      selectedList,
      setSelectedList,
    );

    // define setMapperList alternater for setSelectedList
    const setMapperList = useCallback((mapperList: T[]) => {
      dispatch({
        type: ContentTableActionEnum.SET_LIST_SELECTION,
        listName: "mapperList",
        data: mapperList, // update mappingList.Eg: selectedContent[]
      });
    }, []);

    // update mapperList when source changed
    useEffect(() => {
      if (mapperList?.length > 0) {
        setMapperList(mapperList);
      }
    }, [mapperList, setMapperList]);

    // from filter and source we calculate dataSource, total and loadingList
    const { list, total, loadingList } = listService.useList(
      filter,
      setFilter,
      loadList,
      setLoadList,
      handleSearch,
      getList,
      getTotal,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );

    // calculate pagination
    const pagination: PaginationProps = this.usePagination<TFilter>(
      filter,
      total,
    );

    // handleChange page or sorter
    const { handleTableChange, handlePagination } = this.useTableChange<
      TFilter
    >(filter, setFilter, handleSearch);

    return {
      list,
      total,
      loadingList,
      pagination,
      handleTableChange,
      handlePagination,
      rowSelection,
      selectedList,
      setSelectedList,
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
    filter: TFilter,
    setFilter: (filter: TFilter) => void,
    loadList: boolean,
    setLoadList: Dispatch<SetStateAction<boolean>>,
    handleSearch: () => void,
    source: T[],
    setSource: (source: T[]) => void,
    contentMapper: (model: T | T2) => T,
    ContentClass: new () => T,
  ) {
    const [{ mappingList }, dispatch] = useReducer<
      Reducer<ContentTableState<T, T2>, ContentTableAction<T, T2>>
    >(contentTableReducer, {
      mappingList: [], // selectedContent
    }); // mappingList, mapperList reducer

    const { list, total, loadingList } = listService.useLocalList(
      filter,
      typeof contentMapper === "function" ? source.map(contentMapper) : source,
      loadList,
      setLoadList,
    ); // list service

    const setMappingList = useCallback((mappingList: T[]) => {
      dispatch({
        type: ContentTableActionEnum.SET_LIST_SELECTION,
        listName: "mappingList",
        data: mappingList, // update mappingList.Eg: selectedContent[]
      });
    }, []); // define setMappingList alternater for setSelectedContent

    const {
      rowSelection,
      canBulkDelete, // for UI
    } = this.useContentRowSelection(mappingList, setMappingList); // selectedRowKeys

    const pagination: PaginationProps = this.usePagination<TFilter>(
      filter,
      total,
    ); // calculate pagination

    const { handleTableChange, handlePagination } = this.useTableChange<
      TFilter
    >(filter, setFilter, handleSearch); // handleChange page or sorter
    const resetTableFilter = useCallback(() => {
      setFilter({ ...filter, skip: 0, take: DEFAULT_TAKE }); // set default skip. take for filter
      handleSearch(); // trigger reLoad list
    }, [filter, handleSearch, setFilter]); // reset table filter and re-load

    const handleLocalDelete = useCallback(
      (content: T) => {
        setSource(source.filter(filterContent(content))); // remove one item in source by key and update source
        dispatch({
          type: ContentTableActionEnum.SINGLE_DELETE,
          mappingList: mappingList.filter(filterContent(content)), // for content table
        });
        resetTableFilter();
      },
      [mappingList, resetTableFilter, setSource, source],
    ); // handle single delete
    const handleLocalBulkDelete = useCallback(() => {
      Modal.confirm({
        title: "ban co chac muon xoa thao tac",
        content: "thao tac khong the khoi phuc",
        okType: "danger",
        onOk() {
          setSource(
            source.filter(
              filterContentNotInList(
                getIdsFromContent(mappingList, `key`),
                `key`,
              ),
            ),
          ); // update source
          dispatch({
            type: ContentTableActionEnum.BULK_DELETE,
          });
          resetTableFilter();
        },
      });
    }, [mappingList, resetTableFilter, setSource, source]); //  handle bulk delete by keys

    const handleChangeOneCell = useCallback(
      (key: string, field: keyof T) => (value: T[keyof T]) => {
        const index = source.findIndex((item) => item.key === key);
        if (index > 0) {
          source[index][field] = value;
        }
        setSource(source);
        resetTableFilter();
      },
      [setSource, source, resetTableFilter],
    ); // update one cell in source

    const handleChangeOneRow = useCallback(
      (key: string) => (value: T) => {
        const index = source.findIndex((item) => item.key === key);
        source[index] = value;
        setSource(source);
        resetTableFilter();
      },
      [source, resetTableFilter, setSource], // change one row
    );

    const handleAddContent = useCallback(() => {
      setSource([...source, new ContentClass()]);
    }, [ContentClass, setSource, source]); // add Content

    return {
      list,
      total,
      loadingList,
      handleSearch,
      pagination,
      handleTableChange,
      handlePagination,
      rowSelection,
      canBulkDelete,
      selectedContent: mappingList,
      resetTableFilter, // reset filter and trigger search
      handleLocalDelete, // single delete
      handleLocalBulkDelete, // bulk delete
      handleChangeOneCell, // update single row by field and keys
      handleChangeOneRow, // update single row
      handleAddContent, // add single
    };
  }

  /**
   *
   * control content modal business from open, close, save data from modal
   * @param:
   * @return: { visible, loadControl, handleEndControl, handleOpenModal, handleCloseModal }
   *
   * */
  useContenModal(handleSource?: () => void) {
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

    const handleSaveModal = useCallback(() => {
      dispatch({ type: ModalActionEnum.CLOSE_MODAL });
      if (typeof handleSource === "function") {
        handleSource(); // trigger reload list
      }
    }, [handleSource]);

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
      handleSaveModal,
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

export function filterContent<T extends Model>(content: T) {
  return (item: T) => item.key !== content.key;
}

export function getIdsFromContent<T extends Model>(list: T[], fieldId: string) {
  return list.map((item) => item[fieldId]);
}

export function filterContentNotInList<T extends Model>(
  list: any[],
  fieldId: string,
) {
  return (item: T) => !list.includes(item[fieldId]);
}

export function filterContentInList<T extends Model>(
  list: any[],
  fieldId: string,
) {
  return (item: T) => list.includes(item[fieldId]);
}

export function mappingToMapper<T extends Model>(mapperField: string) {
  return (item: T) => item[mapperField];
}

export default new TableService();
