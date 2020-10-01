import React from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Dispatch, SetStateAction } from "react";
import { importExportDataService } from "services/import-export-data-service";
import tableService from "services/table-service";

export function useContentTable<
  TContent extends Model, // mappingsField
  TMapper extends Model, // targetMappingField
  TContentFilter extends ModelFilter // contentFilterClass
>(
  content: TContent[],
  setContent: (content: TContent[]) => void,
  contentMapper: (model: TContent | TMapper) => TContent,
  contentClass: new () => TContent,
  filter: TContentFilter,
  handleUpdateNewFilter: (filter: TContentFilter) => void,
  handleSearch: () => void,
  loadList: boolean,
  setLoadList: Dispatch<SetStateAction<boolean>>,
  mapperField: string,
) {
  React.useEffect(() => {
    console.log(`filter: `, filter);
  }, [filter]);

  const {
    list,
    loadingList,
    total,
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
    loadList,
    setLoadList,
    handleSearch,
    content,
    setContent,
    contentMapper,
    mapperField,
    contentClass,
  ); // table service

  const {
    ref,
    handleClick,
    handleImportContentList,
  } = importExportDataService.useImport(); // import data service

  const {
    handleContentExport,
    handleContentExportTemplate,
  } = importExportDataService.useExport(); // export data service

  return {
    handleUpdateNewFilter, // used in table handleChange
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
    ref, // import input ref
    handleClick, // clear value of ref
    handleImportContentList, // handleChange import file
    handleContentExport, // content export
    handleContentExportTemplate, // content export template
  };
}
