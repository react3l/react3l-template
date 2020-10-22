import { SetStateAction, useCallback } from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Dispatch } from "react";
import tableService, {
  filterContentInList,
  filterContentNotInList,
  getIdsFromContent,
} from "services/table-service";
import { Observable } from "rxjs";

export function useContentModal<
  TContent extends Model,
  TMapper extends Model,
  TFilter extends ModelFilter
>(
  content: TContent[],
  setContent: (content: TContent[]) => void,
  loadList: boolean,
  setLoadList: Dispatch<SetStateAction<boolean>>,
  filter: TFilter,
  handleUpdateNewFilter: (filter: TFilter) => void,
  handleResetFilter: () => void,
  handleSearch: () => void,
  getList: (filter: TFilter) => Observable<TMapper[]>,
  getTotal: (filter: TFilter) => Observable<number>,
  selectedList: TMapper[],
  mapper: (model: TContent | TMapper) => TContent, // mapping method from content to content or mapper to content
  mapperField: string,
  onClose?: () => void,
  onSave?: (mapperList: TMapper[]) => void,
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
    setSelectedList: setMapperList,
  } = tableService.useModalTable<TMapper, TFilter>(
    filter,
    handleUpdateNewFilter,
    loadList,
    setLoadList,
    handleSearch,
    getList,
    getTotal,
    selectedList,
  );

  const handleCloseModal = useCallback(() => {
    handleResetFilter(); // resetFilter to default
    setMapperList([...content.map((item) => item[mapperField])]); // reset mapperList by content
    if (typeof onClose === "function") {
      return onClose();
    }
  }, [handleResetFilter, onClose, content, mapperField, setMapperList]); // handleCloseModal

  const handleSaveModal = useCallback(
    (list: TMapper[]) => {
      return () => {
        if (list?.length > 0 && content.length > 0) {
          // merge old and new content
          list
            .filter(
              filterContentNotInList(
                getIdsFromContent(content, `${mapperField}Id`),
                `id`,
              ),
            )
            .forEach((item: TMapper) => {
              content.push(mapper(item));
            });
          // remove contents which id not included in list ids
          const newContent = content.filter(
            filterContentInList(
              getIdsFromContent(list, `id`),
              `${mapperField}Id`,
            ),
          );
          setContent([...newContent]);
        }
        if (list?.length > 0 && content.length === 0) {
          const newContents = list.map((item: TMapper) => mapper(item));
          setContent([...newContents]);
        }
        if (list?.length === 0) setContent([]); // if list empty, setContent to []

        if (typeof onSave === "function") {
          onSave(mapperList);
        }
      };
    },
    [setContent, content, mapper, mapperField, mapperList, onSave],
  ); // handleSave modal

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
