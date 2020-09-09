import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import Model from "core/models/Model";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { formService } from "services/FormService";
import { v4 as uuidv4 } from "uuid";

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
            if (item.hasOwnProperty("key")) {
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
  ) {
    // get id from url
    const { id } = useParams();
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
                () => (item: T) => {
                  handleUpdateNewModel(item);
                  if (typeof onSaveSuccess === "function") {
                    onSaveSuccess(item);
                  }
                },
                (error: AxiosError<T>) => {
                  if (error.response && error.response.status === 400) {
                    handleUpdateNewModel(error.response?.data);
                  }
                  if (typeof onSaveError === "function") {
                    onSaveError(error.response?.data);
                  }
                },
              ),
          );
        };
      },
      [handleUpdateNewModel, model, saveModel, subscription],
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
}

const detailService = new DetailService();
export default detailService;
