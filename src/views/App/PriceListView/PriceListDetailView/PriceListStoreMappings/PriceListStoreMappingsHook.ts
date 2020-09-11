import { Model, ModelFilter } from "@react3l/react3l/core";
import { Reducer, useReducer } from "react";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/AdvanceFilterService";
import tableService from "services/tbl-service";

export function useContentTable<
  TContent extends Model, // mappingsField
  TMapper extends Model, // targetMappingField
  TContentFilter extends ModelFilter // contentFilterClass
>(
  content: TContent[],
  setContent: (content: TContent[]) => void,
  contentMapper: (model: TContent | TMapper) => TContent,
  contentClass: new () => TContent,
  contentFilterClass: new () => TContentFilter,
  mapperField: string,
) {
  const [filter, dispatch] = useReducer<
    Reducer<TContentFilter, AdvanceFilterAction<TContentFilter>>
  >(advanceFilterReducer, new contentFilterClass()); // filter factory

  const {
    handleChangeFilter,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useFilter<TContentFilter>(
    filter,
    dispatch,
    contentFilterClass,
  ); // filter service

  const {
    list,
    loadingList,
    total,
    handleSearch,
    handleTableChange,
    handlePagination,
    rowSelection,
    canBulkDelete,
    pagination,
    handleLocalDelete,
    handleLocalBulkDelete,
    selectedList,
    handleChangeOneCell, // update single row by field and keys
    handleChangeOneRow, // update single row
    handleAddContent, // add single
  } = tableService.useLocalTable<TContent, TMapper, TContentFilter>(
    filter,
    handleUpdateNewFilter,
    content,
    setContent,
    contentMapper,
    mapperField,
    contentClass,
  ); // table service

  return {
    filter, // filter for local table
    dispatch, // dispatch for filter local table
    handleChangeFilter, // normally used in advanceFilter component
    handleUpdateNewFilter, // used in table handleChange
    handleResetFilter, // used in some action reset filter to default
    list, // list for dataSource
    loadingList, // loading for await data filtering
    total,
    handleSearch,
    handleChangeOneCell, // change one cell by key and fieldName in local table
    handleChangeOneRow, // change one row by key in local table
    handleAddContent, // add one content in local table
    handleTableChange, // handle table change action for ant table, sorter, pager, etc.
    handlePagination, // handle custom pagination, not for ant table
    rowSelection, // row selection for table
    canBulkDelete, // decide whether we enable bulk delete button
    pagination, // calculted for ant table pagination, for calculating table index
    handleLocalDelete, // delete local content in table
    handleLocalBulkDelete, // bulk delete local ..., based on rowSelection
    selectedList, // calculated mapperList from content
  };
}
