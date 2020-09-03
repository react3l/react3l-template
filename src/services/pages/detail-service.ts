import Model from "core/models/Model";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { Observable } from "rxjs";
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
    setModel: (data: T) => void,
    contentField: string,
  ) {
    const content: TContent[] = useMemo(() => {
      if (model[contentField]?.length > 0) {
        model[contentField].map((item) => ({ ...item, key: uuidv4() })); // assign key for each content item
        return model[contentField];
      }
      return [];
    }, [contentField, model]);

    const setContent = useCallback(
      (v: TContent[]) => {
        setModel({ ...model, [contentField]: v });
      },
      [contentField, model, setModel],
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
  ) {
    // get id from url
    const { id } = useParams();

    const isDetail = useMemo(
      () => (typeof id.toString().match(/^[0-9]+$/) ? true : false), // check if id is number
      [id],
    );

    const [
      model,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel, // alternate for setModel
    ] = formService.useDetailForm<T>(ModelClass, parseInt(id), getDetail);

    return {
      model,
      isDetail,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel,
    };
  }
}

const detailService = new DetailService();
export default detailService;
