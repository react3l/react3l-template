import { SetStateAction, useCallback } from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Dispatch } from "react";
import tableService from "services/tbl-service";
import { Observable } from "rxjs";

export function useContentModal<T extends Model, TFilter extends ModelFilter>(
  loadList: boolean,
  setLoadList: Dispatch<SetStateAction<boolean>>,
  filter: TFilter,
  handleUpdateNewFilter: (filter: TFilter) => void,
  handleResetFilter: () => void,
  handleSearch: () => void,
  getList: (filter: TFilter) => Observable<T[]>,
  getTotal: (filter: TFilter) => Observable<number>,
  selectedList?: T[],
  onClose?: () => void,
  onSave?: (mapperList: T[]) => void,
) {
  const {
    list,
    total,
    loadingList,
    pagination,
    handlePagination,
    handleTableChange,
    rowSelection,
    selectedList: mapperList,
  } = tableService.useModalTable<T, TFilter>(
    filter,
    handleUpdateNewFilter,
    loadList,
    setLoadList,
    handleSearch,
    getList,
    getTotal,
    selectedList,
  );

  // need separate to reused
  const handleCloseModal = useCallback(() => {
    handleResetFilter(); // resetFilter to default
    if (typeof onClose === "function") {
      return onClose();
    }
  }, [handleResetFilter, onClose]);

  // need separate to reused
  const handleSaveModal = useCallback(() => {
    if (typeof onSave === "function") {
      onSave(mapperList);
    }
    handleCloseModal();
  }, [mapperList, onSave, handleCloseModal]);

  return {
    list,
    total,
    loadingList,
    pagination,
    handlePagination,
    handleTableChange,
    rowSelection,
    mapperList,
    handleCloseModal,
    handleSaveModal,
  };
}
