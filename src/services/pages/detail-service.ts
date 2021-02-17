import { ModelFilter } from "@react3l/react3l/core";
import { Model } from "@react3l/react3l/core/model";
import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";
import { formService } from "services/form-service";
import { importExportDataService } from "services/import-export-data-service";
import { routerService } from "services/route-service";
import tableService, { filterContentInList, filterContentNotInList, getIdsFromContent } from "services/table-service";
import { v4 as uuidv4 } from "uuid";

export class DetailService {
  /**
   *
   * retrieve list content from model based on list's key name
   * @param: model: T
   * @param: setModel: (data: T) => void,
   * @param: contentField: string,
   * */
  useContentList<T extends Model, TContent extends Model>(
    model: T,
    setModel: (model: T) => void,
    contentField: string,
  ) {
    const content: TContent[] = useMemo(() => {
      if (model) {
        if (typeof model[contentField] === "undefined") return null;
        if (model[contentField]?.length === 0) return [];
        if (model[contentField]?.length > 0) {
          return model[contentField].map((item) => {
            if (typeof item.key !== "undefined") {
              return { ...item };
            }
            return { ...item, key: uuidv4() }; // assign key for each content item
          });
        }
      }
    }, [contentField, model]);

    const setContent = useCallback(
      (v: TContent[]) => {
        setModel({ ...model, [contentField]: v });
      },
      [contentField, setModel, model],
    );

    return { content, setContent };
  }

  /**
   *
   * retrieve id from url query, call api get model and supply method for modify model
   * @param: ModelClass: new () => T
   * @param: getDetail: (id: number) => Observable<T>,
   * */
  useDetail<T extends Model>(
    ModelClass: new () => T,
    getDetail: (id: number) => Observable<T>,
    saveModel: (t: T) => Observable<T>,
    routePrefix: string,
  ) {
    // get id from url
    const { id } = useParams();
    // navigating master when update or create successfully
    const [, , , handleGoBase] = routerService.useMasterNavigation(
      routePrefix, // master route
    );
    // message service
    const {
      notifyUpdateItemSuccess,
      notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();
    // subscription service for clearing subscription
    const [subscription] = commonService.useSubscription();

    const isDetail = useMemo(
      () => (typeof id.toString().match(/^[0-9]+$/) ? true : false), // check if id is number
      [id],
    );

    const [loading, setLoading] = useState<boolean>(false);

    const [
      model,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel, // alternate for setModel
      handleChangeTreeObjectField,
      dispatch,
    ] = formService.useDetailForm<T>(ModelClass, parseInt(id), getDetail);

    const handleSave = useCallback(
      (onSaveSuccess?: (item: T) => void, onSaveError?: (item: T) => void) => {
        return () => {
          setLoading(true);
          subscription.add(
            saveModel(model)
              .pipe(finalize(() => setLoading(false)))
              .subscribe(
                (item: T) => {
                  handleUpdateNewModel(item); // setModel
                  handleGoBase(); // go master
                  notifyUpdateItemSuccess(); // global message service go here
                  if (typeof onSaveSuccess === "function") {
                    onSaveSuccess(item); // trigger custom effect when updating success
                  }
                },
                (error: AxiosError<T>) => {
                  if (error.response && error.response.status === 400) {
                    handleUpdateNewModel(error.response?.data); // setModel for catching error
                  }
                  notifyUpdateItemError(); // global message service go here
                  if (typeof onSaveError === "function") {
                    onSaveError(error.response?.data); // trigger custom effect when updating success
                  }
                },
              ),
          );
        };
      },
      [
        handleGoBase,
        handleUpdateNewModel,
        model,
        notifyUpdateItemError,
        notifyUpdateItemSuccess,
        saveModel,
        subscription,
      ],
    );

    return {
      model,
      isDetail,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel,
      handleChangeTreeObjectField,
      loading,
      handleGoBase,
      handleSave,
      dispatch,
    };
  }

  /**
   *
   * open detailModal from clicking edit in master
   * @param: ModelClass: new () => T,
   * @param: getDetail: (id: number) => Observable<T>,
   * @param: saveModel: (t: T) => Observable<T>,
   * */
  useDetailModal<T extends Model>(
    ModelClass: new () => T,
    getDetail: (id: number) => Observable<T>,
    saveModel: (t: T) => Observable<T>,
    handleSeach?: () => void, //trigger updateList
  ) {
    // message service
    const {
      notifyUpdateItemSuccess,
      notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();

    const [subscription] = commonService.useSubscription();

    const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
    const [loadingModel, setLoadingModel] = useState<boolean>(false);

    const [
      model,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel, // alternate for setModel
      handleChangeTreeObjectField,
      dispatch,
    ] = formService.useDetailForm<T>(ModelClass, undefined, getDetail); // id is undefined as we not archive id from url

    const handleOpenDetailModal = useCallback(
      (id: number) => {
        setIsOpenDetailModal(true);
        if (id) {
          setLoadingModel(true);
          subscription.add(
            getDetail(id)
              .pipe(finalize(() => setLoadingModel(false)))
              .subscribe((item: T) => {
                handleUpdateNewModel(item);
              }),
          );
        } else {
          handleUpdateNewModel(new ModelClass());
        }
      },
      [getDetail, handleUpdateNewModel, subscription, ModelClass],
    ); // handleOpen detailModal from list

    const handleSaveModel = useCallback(() => {
      setLoadingModel(true);
      subscription.add(
        saveModel(model)
          .pipe(finalize(() => setLoadingModel(false)))
          .subscribe(
            (item: T) => {
              handleUpdateNewModel(item); // setModel
              setIsOpenDetailModal(false); // close Modal
              if (typeof handleSeach === "function") handleSeach(); // updateList if necessary
              notifyUpdateItemSuccess(); // global message service go here
            },
            (error: AxiosError<T>) => {
              if (error.response && error.response.status === 400)
                handleUpdateNewModel(error.response?.data);
              notifyUpdateItemError(); // global message service go here
            },
          ),
      );
    }, [
      saveModel,
      subscription,
      handleSeach,
      notifyUpdateItemError,
      notifyUpdateItemSuccess,
      handleUpdateNewModel,
      model,
    ]);

    const handleCloseDetailModal = useCallback(() => {
      setIsOpenDetailModal(false);
      if (model.id) handleUpdateNewModel({ ...model });
      else handleUpdateNewModel({ ...new ModelClass() });
      if (typeof handleSeach === "function") handleSeach(); // updateList if necessary
    }, [handleSeach, ModelClass, handleUpdateNewModel, model]);

    return {
      model,
      isOpenDetailModal,
      loadingModel,
      handleOpenDetailModal,
      handleSaveModel,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleChangeTreeObjectField,
      handleCloseDetailModal,
      dispatch,
    };
  }

  /**
   * 
   * logic for content table 
   * @param: content: TContent[],
   * @param: setContent: (content: TContent[]) => void,
   * @param: contentMapper: (model: TContent | TMapper) => TContent,
   * @param: contentClass: new () => TContent,
   * @param: filter: TContentFilter,
   * @param: handleUpdateNewFilter: (filter: TContentFilter) => void,
   * @param: handleSearch: () => void,
   * @param: loadList: boolean,
   * @param: setLoadList: Dispatch<SetStateAction<boolean>>
   */
  useContentTable<
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
  ) {
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
        contentClass,
      );

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
        ref, // import input ref
        handleClick, // clear value of ref
        handleImportContentList, // handleChange import file
        handleContentExport, // content export
        handleContentExportTemplate, // content export template
      };
    }

  /**
   * 
   * logic for content modal 
   * @param: content: TContent[],
   * @param: setContent: (content: TContent[]) => void,
   * @param: loadList: boolean,
   * @param: setLoadList: Dispatch<SetStateAction<boolean>>,
   * @param: filter: TFilter,
   * @param: handleUpdateNewFilter: (filter: TFilter) => void,
   *  @param: handleResetFilter: () => void,
   * @param: handleSearch: () => void,
   * @param: getList: (filter: TFilter) => Observable<TMapper[]>,
   * @param: getTotal: (filter: TFilter) => Observable<number>,
   * @param: selectedList: TMapper[],
   * @param: mapper: (model: TContent | TMapper) => TContent, // mapping method from content to content or mapper to content
   * @param: mapperField: string,
   * @param: onClose?: () => void,
   * @param: onSave?: (mapperList: TMapper[]) => void,
   */

  useContentModal<
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
  ) 
  {
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
      if (content && mapperField) {
        setMapperList([...content.map((item) => item[mapperField])]); // reset mapperList by content
      }
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

}

const detailService = new DetailService();
export default detailService;
