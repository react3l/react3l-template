import { useRef, useCallback, ChangeEvent, Dispatch, useContext } from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { commonService } from "@react3l/react3l/services";
import { RefObject } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { saveAs } from "file-saver";
import { AppAction, AppActionEnum, AppState } from "App/AppStore";
import { AppMessageContext, AppStoreContext } from "App/AppContext";
import { AppMessageService } from "services/app-message-service";
export const importExportDataService = {
  /**
   *
   * return importList, importContent
   * @param: dispatch
   * @param: onImportSuccess?: (list?: T[]) => void,
   * @return:
   *
   * */

  useImport<T extends Model>(onImportSuccess?: (list?: T[]) => void) {
    const [, dispatch] = useContext<[AppState, Dispatch<AppAction>]>(
      AppStoreContext,
    );
    const [subscription] = commonService.useSubscription(); // subscription avoid leak memory
    const messageContext = useContext<AppMessageService>(AppMessageContext); // message context for side effect
    const ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null); // ref object to clear value of input after import

    // handle Import Error
    const handleImportError = useCallback(
      (error: AxiosError<any>) => {
        messageContext.setError();
        dispatch({
          type: AppActionEnum.IMPORT_ERROR,
          errorMessage: error.response.data,
        }); // setError Message and visible modal
      },
      [dispatch, messageContext],
    );

    // handleEnd Import
    const handleEndImport = useCallback(() => {
      dispatch({ type: AppActionEnum.END_IMPORT }); // setLoading false
    }, [dispatch]);

    const handleImportList = useCallback(
      (onImport: (file: File) => Observable<void>) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            dispatch({ type: AppActionEnum.INIT_IMPORT }); // dispatch appAction
            if (typeof onImport === "function") {
              subscription.add(
                onImport(file).subscribe(
                  () => {
                    messageContext.setSuccess(); // ...some sideEffect here
                    if (typeof onImportSuccess === "function") {
                      onImportSuccess();
                    }
                  }, // onSuccess
                  handleImportError, // onError
                  handleEndImport, //finally
                ),
              );
            }
          }
        };
      },
      [
        dispatch,
        subscription,
        handleImportError,
        handleEndImport,
        messageContext,
        onImportSuccess,
      ],
    );

    const handleImportContentList = useCallback(
      (
        modelId: number,
        onImport: (file: File, priceListId: number) => Observable<T[]>,
      ) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
          const file: File = event.target.files[0];
          dispatch({ type: AppActionEnum.INIT_IMPORT }); // dispatch appAction
          if (typeof onImport === "function") {
            subscription.add(
              onImport(file, modelId).subscribe(
                (list: T[]) => {
                  messageContext.setSuccess(); // ...some sideEffect here
                  if (typeof onImportSuccess === "function") {
                    onImportSuccess(list);
                  }
                },
                handleImportError, // onError
                handleEndImport, //finally
              ),
            );
          }
        };
      },
      [
        dispatch,
        handleEndImport,
        handleImportError,
        messageContext,
        onImportSuccess,
        subscription,
      ],
    );

    const handleClick = useCallback(() => {
      ref.current.value = null;
    }, []);

    return { ref, handleClick, handleImportList, handleImportContentList };
  },

  /**
   *
   * return exportList, exportContent, exportTemplateList, exportTemplateContent
   * @return:
   *
   * */
  useExport() {
    const [subscription] = commonService.useSubscription();

    const handleExportSuccess = (response: AxiosResponse<any>) => {
      const fileName = response.headers["content-disposition"]
        .split(";")
        .find((n: any) => n.includes("filename="))
        .replace("filename=", "")
        .trim(); // define fileName for saver
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/octet-stream",
        }),
      ); // defince urlObject
      saveAs(url, fileName); // save file
    };

    // handleExport list from server. Use for both export and export template
    const handleListExport = useCallback(
      <TFilter extends ModelFilter>(
        filter: TFilter,
        onExport: (filter: ModelFilter) => Observable<AxiosResponse<any>>,
      ) => {
        return () => {
          if (typeof onExport === "function") {
            subscription.add(
              onExport(filter).subscribe(
                handleExportSuccess, // onSuccess
              ),
            );
          }
        };
      },
      [subscription],
    );

    const handleExportTemplateList = useCallback(
      (onExport: () => Observable<AxiosResponse<any>>) => {
        return () => {
          if (typeof onExport === "function") {
            subscription.add(
              onExport().subscribe(
                handleExportSuccess, // onSuccess
              ),
            );
          }
        };
      },
      [subscription],
    );

    // handleExport contentList from server
    const handleContentExport = useCallback(
      <T extends Model>(
        model: T,
        onExport: (model: T) => Observable<AxiosResponse<any>>,
      ) => {
        return () => {
          if (typeof onExport === "function") {
            subscription.add(
              onExport(model).subscribe(
                handleExportSuccess, // onSuccess
              ),
            );
          }
        };
      },
      [subscription],
    );

    // handleExport listContent template from server
    const handleContentExportTemplate = useCallback(
      <T extends Model>(
        model: T,
        onExport: (id: number) => Observable<AxiosResponse<any>>,
      ) => {
        return () => {
          if (typeof onExport === "function") {
            subscription.add(
              onExport(model?.id).subscribe(
                handleExportSuccess, // onSuccess
              ),
            );
          }
        };
      },
      [subscription],
    );

    return {
      handleListExport,
      handleExportTemplateList,
      handleContentExport,
      handleContentExportTemplate,
    };
  },
};
