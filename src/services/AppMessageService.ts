import notification from "antd/lib/notification";
import { useTranslation } from "react-i18next";
import { BehaviorSubject, Observable } from "rxjs";

notification.config({
  placement: "bottomRight",
});

export enum messageType {
  SUCCESS,
  ERROR,
}

export class AppMessageService {
  success$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // success subject for app message
  error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // error subject for app message
  _success: () => Observable<boolean> = () =>
    this.success$ as Observable<boolean>; // expose get success$ Observable
  _error: () => Observable<boolean> = () => this.error$ as Observable<boolean>; // expose get error$ as Observable
  setSuccess: () => void = () => {
    this.success$.next(true);
  };
  setError: () => void = () => {
    this.error$.next(true);
  };

  messageFactory(messType: messageType, message: string, description?: string) {
    messType === messageType.SUCCESS
      ? notification.success({
          message,
          description,
        })
      : notification.error({
          message,
          description,
        });
  } // factory a snack from  messType, message as title and descripton as body

  handleNotify(messType: messageType, message: string, description?: string) {
    return (value: boolean) => {
      if (value) {
        this.messageFactory(messType, message, description);
      }
    };
  } // handle any Success message
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
  }
}

const appMessageService = new AppMessageService();
export default appMessageService;
