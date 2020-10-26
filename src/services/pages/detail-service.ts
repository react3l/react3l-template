import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { formService } from "services/form-service";
import { routerService } from "services/route-service";
import { v4 as uuidv4 } from "uuid";
import appMessageService from "services/app-message-service";
import { Model } from "@react3l/react3l/core/model";

export class DetailService {
  /**
   *
   * retrieve list content from model based on list's key name
   * @param: model: T
   * @param: setModel: (data: T) => void,
   * @param: contentField: string,
   * @return: { content, setContent }
   *
   * */
  useContentList<T extends Model, TContent extends Model>(
    model: T,
    setModel: (model: T) => void,
    contentField: string,
  ) {
    const content: TContent[] = useMemo(() => {
      if (model) {
        if (model[contentField]?.length > 0) {
          return model[contentField].map((item) => {
            if (typeof item.key !== "undefined") {
              return { ...item };
            }
            return { ...item, key: uuidv4() }; // assign key for each content item
          });
        }
      }
      return [];
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
   * @return: { model, handleChangeSimpleField, handleChangeObjectField, handleUpdateNewModel, errorCatcher, submitMethod }
   *
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
   * @return: {  }
   *
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
        setLoadingModel(true);
        subscription.add(
          getDetail(id)
            .pipe(finalize(() => setLoadingModel(false)))
            .subscribe((item: T) => {
              handleUpdateNewModel(item);
              setIsOpenDetailModal(true);
            }),
        );
      },
      [getDetail, handleUpdateNewModel, subscription],
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
      if (typeof handleSeach === "function") handleSeach(); // updateList if necessary
    }, [handleSeach]);

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
