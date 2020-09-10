import notification from "antd/lib/notification";
import { useTranslation } from "react-i18next";
import { BehaviorSubject, Observable } from "rxjs";

notification.config({
  placement: "bottomRight",
});

export interface AppMessageService {
  success$: BehaviorSubject<boolean>;
  error$: BehaviorSubject<boolean>;
  _success: () => Observable<boolean>;
  _error: () => Observable<boolean>;
  setSuccess: () => void;
  setError: () => void;
  handleNotify: (
    message: string,
    description?: string,
  ) => (value: boolean) => void;
  useCRUDMessage: () => {
    notifyUpdateItemSuccess: (description?: string) => void;
    notifyUpdateItemError: (description?: string) => void;
  };
}

export const appMessageService: AppMessageService = {
  success$: new BehaviorSubject<boolean>(false), // success subject for app message
  error$: new BehaviorSubject<boolean>(false), // error subject for app message
  _success: () => this.success$ as Observable<boolean>, // expose get success$ Observable
  _error: () => this.error$ as Observable<boolean>, // expose get error$ as Observable
  setSuccess: () => {
    this.success$.next(true);
  },
  setError: () => {
    this.error$.next(true);
  },
  handleNotify: (message: string, description?: string) => {
    return (value: boolean) => {
      value ??
        notification.success({
          message,
          description,
        });
    };
  }, // handle any Success message
  useCRUDMessage() {
    const [translate] = useTranslation();

    // updateSuccess method
    const notifyUpdateItemSuccess = (description?: string) => {
      return notification.success({
        message: translate("general.update.success"),
        description,
      });
    };

    // updateSuccess method
    const notifyUpdateItemError = (description?: string) => {
      return notification.error({
        message: translate("general.update.error"),
        description,
      });
    };

    return {
      notifyUpdateItemSuccess,
      notifyUpdateItemError,
    };
  },
};
