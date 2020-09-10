import { useRef, useCallback, ChangeEvent } from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { commonService } from "@react3l/react3l/services";
import { RefObject } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { saveAs } from "file-saver";

export const importExportDataService = {
  /**
   *
   * return importList, importContent
   * @param: dispatch
   * @param: onImportSuccess?: (list?: T[]) => void,
   * @return:
   *
   * */
  useImport<T extends Model>(
    dispatch?: any,
    onImportSuccess?: (list?: T[]) => void,
  ) {
    const [subscription] = commonService.useSubscription();
    // ref object to clear value of input after import
    const ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const handleImportList = useCallback(
      (onImport: (file: File) => Observable<void>) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            dispatch({ type: "INIT_IMPORT" }); // dispatch appAction
            subscription.add(
              onImport(file).subscribe(
                () => {
                  dispatch({ type: "IMPORT_SUCCESS" }); // ...appAction
                  if (typeof onImportSuccess === "function") {
                    onImportSuccess();
                  }
                }, // onSuccess
                (error: AxiosError<any>) => {
                  dispatch({ type: "IMPORT_ERROR", data: error.response.data });
                }, // onError
                () => {
                  dispatch({ type: "END_IMPORT" });
                }, //finally
              ),
            );
          }
        };
      },
      [dispatch, subscription, onImportSuccess],
    );

    const handleContentList = useCallback(
      (
        modelId: number,
        onImport: (file: File, priceListId: number) => Observable<T[]>,
      ) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
          const file: File = event.target.files[0];
          dispatch({ type: "INIT_IMPORT" }); // dispatch appAction
          subscription.add(
            onImport(file, modelId).subscribe(
              (list: T[]) => {
                dispatch({ type: "IMPORT_SUCCESS" }); // ...appAction
                if (typeof onImportSuccess === "function") {
                  onImportSuccess(list);
                }
              },
              (error: AxiosError<any>) => {
                dispatch({ type: "IMPORT_ERROR", data: error.response.data });
              }, // onError
              () => {
                dispatch({ type: "END_IMPORT" });
              }, //finally
            ),
          );
        };
      },
      [dispatch, onImportSuccess, subscription],
    );

    const handleClick = useCallback(() => {
      ref.current.value = null;
    }, []);

    return { handleClick, handleImportList, handleContentList };
  },

  /**
   *
   * return exportList, exportContent, exportTemplateList, exportTemplateContent
   * @param: dispatch
   * @param: onImportSuccess?: (list?: T[]) => void,
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
        onExport: (filter: TFilter) => Observable<AxiosResponse<any>>,
      ) => {
        return () => {
          subscription.add(
            onExport(filter).subscribe(
              handleExportSuccess, // onSuccess
            ),
          );
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
          subscription.add(
            onExport(model).subscribe(
              handleExportSuccess, // onSuccess
            ),
          );
        };
      },
      [subscription],
    );

    // handleExport listContent template from server
    const handleExportTemplate = useCallback(
      <T extends Model>(
        model: T,
        onExport: (id: number) => Observable<AxiosResponse<any>>,
      ) => {
        return () => {
          subscription.add(
            onExport(model?.id).subscribe(
              handleExportSuccess, // onSuccess
            ),
          );
        };
      },
      [subscription],
    );

    return {
      handleListExport,
      handleContentExport,
      handleExportTemplate,
    };
  },
};
