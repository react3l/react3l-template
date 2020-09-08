import React, { Reducer, useCallback } from "react";
import { Model, ErrorMap } from "@react3l/react3l/core";
import { Observable, Subscription } from "rxjs";
import { ValidateStatus } from "components/Utility/FormItem/FormItem";

export const FORM_DETAIL_SET_STATE_ACTION: string =
  "FORM_DETAIL_SET_STATE_ACTION";

export const FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION: string =
  "FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION";

export const FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION: string =
  "FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION";

export interface FormDetailAction<T extends Model> {
  type: string;

  data?: T;

  fieldName?: keyof T;

  fieldValue?: T[keyof T] | number;
}

function formDetailReducer<T extends Model>(
  state: T,
  action: FormDetailAction<T>,
): T {
  switch (action.type) {
    case FORM_DETAIL_SET_STATE_ACTION:
      return action.data;

    case FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };

    case FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        [`${action.fieldName}Id`]: (action.fieldValue as T[keyof T])?.id,
      };

    default:
      return state;
  }
}

export const formService = {
  useDetailForm<T extends Model>(
    ModelClass: new () => T,
    id: number | undefined,
    getDetail: (id: number) => Observable<T>,
  ): [
    T,
    (fieldName: keyof T) => (fieldValue: T[keyof T]) => void,
    (
      fieldName: keyof T,
    ) => (fieldIdValue: number, fieldValue?: T[keyof T]) => void,
    (data: T) => void,
    (
      fieldName: string,
      callback?: (id: number) => void,
    ) => (list: T[keyof T][]) => void,
    React.Dispatch<FormDetailAction<T>>,
  ] {
    const [model, dispatch] = React.useReducer<Reducer<T, FormDetailAction<T>>>(
      formDetailReducer,
      new ModelClass(),
    );

    React.useEffect(() => {
      const subscription: Subscription = new Subscription();
      if (id) {
        subscription.add(
          getDetail(id).subscribe((model: T) => {
            dispatch({
              type: FORM_DETAIL_SET_STATE_ACTION,
              data: model,
            });
          }),
        );
      }

      return function cleanup() {
        subscription.unsubscribe();
      };
    }, [getDetail, id]);

    const handleChangeSimpleField = React.useCallback(
      <P extends keyof T>(fieldName: P) => {
        return (fieldValue: T[keyof T]) => {
          let value: any = fieldValue;
          // handleValue of Switch
          if (typeof fieldValue === "boolean") {
            value = fieldValue ? 1 : 0;
          }
          dispatch({
            type: FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION,
            fieldName,
            fieldValue: value,
          });
        };
      },
      [],
    );

    // callback for control dependent field based on selected id of other field
    const handleChangeObjectField = React.useCallback(
      <P extends keyof T>(fieldName: P, callback?: (id: number) => void) => {
        return (fieldIdValue: number, fieldValue?: T[keyof T]) => {
          dispatch({
            type: FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION,
            fieldName,
            fieldValue,
          });
          if (typeof callback === "function") {
            callback(fieldIdValue);
          }
        };
      },
      [],
    );

    const handleChangeTreeObjectField = React.useCallback(
      <P extends keyof T>(
        fieldName: P,
        callback?: (item: T[keyof T]) => void,
      ) => {
        return (list: T[keyof T][]) => {
          dispatch({
            type: FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION,
            fieldName,
            fieldValue: list[0],
          });
          if (typeof callback === "function") {
            callback(list[0]);
          }
        };
      },
      [],
    );

    // allow external update model from hook's scope
    const handleUpdateNewModel = useCallback((data: T) => {
      dispatch({ type: FORM_DETAIL_SET_STATE_ACTION, data });
    }, []);

    return [
      model,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel,
      handleChangeTreeObjectField,
      dispatch,
    ];
  },

  useChangeHandler<T extends Model>(
    handleChangeField: (
      fieldName: keyof T,
      callback: (id: number) => void,
    ) => (fieldValue: T[keyof T] | number) => void,
    fieldName: keyof T,
    callback?: (id: number) => void,
  ) {
    return React.useCallback(handleChangeField(fieldName, callback), []);
  },

  useContentChangeHandler<T extends Model>(
    handleChangeField: (
      index: number,
      fieldName: keyof T,
    ) => (fieldValue: T[keyof T]) => void,
    fieldName: keyof T,
    index: number,
  ) {
    return React.useCallback(handleChangeField(index, fieldName), []);
  },

  useContentField<TContent extends Model>(
    ContentClass: new () => TContent,
    contentList: TContent[],
    setContentList: (t: TContent[]) => void,
  ): [
    TContent[],
    (
      key: string,
      field: keyof TContent,
    ) => (value: TContent[keyof TContent]) => void,
    (key: string) => (content: TContent) => void,
    () => void,
    (index: number) => () => void,
  ] {
    /* change all rows */
    const handleChangeContentList: (
      contentList: TContent[],
    ) => void = React.useCallback(setContentList, []);

    /* change one rows */
    const handleChangeContent = React.useCallback(
      (key: string) => (content: TContent) => {
        const index = contentList.findIndex((item) => item.key === key);
        contentList[index] = content;
        handleChangeContentList(contentList);
      },
      [contentList, handleChangeContentList],
    );

    /* change one cell */
    const handleChangeContentField = React.useCallback(
      (key: string, field: keyof TContent) => (
        value: TContent[keyof TContent],
      ) => {
        const index = contentList.findIndex((item) => item.key === key);
        if (index > 0) {
          contentList[index][field] = value;
        }
        handleChangeContentList(contentList);
      },
      [contentList, handleChangeContentList],
    );

    /* add one row */
    const handleAddContent = React.useCallback(() => {
      handleChangeContentList([...contentList, new ContentClass()]);
    }, [ContentClass, contentList, handleChangeContentList]);

    /* remove */
    const handleRemoveContent = React.useCallback(
      (index: number) => () => {
        contentList.splice(index, 1);
        handleChangeContentList([...contentList]);
      },
      [contentList, handleChangeContentList],
    );

    return [
      contentList,
      handleChangeContentField,
      handleChangeContent,
      handleAddContent,
      handleRemoveContent,
    ];
  },

  getValidationStatus<T extends Model>(errors: ErrorMap<T>, field: string) {
    if (typeof errors === "object" && errors !== null) {
      if (errors.hasOwnProperty("field")) {
        if (typeof errors[field] === "string" && errors[field] !== "") {
          return ValidateStatus.error;
        }
      }
    }
    return null;
  },
};
