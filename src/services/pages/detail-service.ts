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

}

const detailService = new DetailService();
export default detailService;
