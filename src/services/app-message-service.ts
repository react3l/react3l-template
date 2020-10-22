import notification from "antd/lib/notification";
import { useTranslation } from "react-i18next";
import { BehaviorSubject, Observable, Subject } from "rxjs";

notification.config({
  placement: "bottomRight",
});

export enum messageType {
  SUCCESS,
  WARNING,
  ERROR,
}

export interface IMessage {
  title: string;
  description: string;
  type: messageType;
}

export class AppMessageService {
  success$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // success subject for app message
  error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // error subject for app message
  message$: Subject<IMessage>; // message subject for app message
  _success: () => Observable<boolean> = () =>
    this.success$ as Observable<boolean>; // expose get success$ Observable
  _error: () => Observable<boolean> = () => this.error$ as Observable<boolean>; // expose get error$ as Observable
  setSuccess: () => void = () => {
    this.success$.next(true);
  };
  setError: () => void = () => {
    this.error$.next(true);
  };

  setMessage: (message: IMessage) => void = (message: IMessage) => {
    this.message$.next(message);
  };

  messageFactory(messType: messageType, message: string, description?: string) {
    if (messType === messageType.SUCCESS) {
      return notification.success({
        message,
        description,
      });
    }
    if (messType === messageType.WARNING) {
      return notification.warn({
        message,
        description,
      });
    }
    if (messType === messageType.ERROR) {
      return notification.error({
        message,
        description,
      });
    }
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

    const notifyUpdateItemSuccess = (description?: string) => {
      return notification.success({
        message: translate("general.update.success"),
        description,
      });
    }; // updateSuccess method

    const notifyUpdateItemError = (description?: string) => {
      return notification.error({
        message: translate("general.update.error"),
        description,
      });
    }; // updateSuccess method

    const notifyBadRequest = (description?: string) => {
      return notification.error({
        message: translate("general.badRequest"),
        description,
      });
    }; // notifyBadRequest method (400)

    const notifyUnAuthorize = (description?: string) => {
      return notification.error({
        message: translate("general.unAuthorize"),
        description,
      });
    }; // notifyUnAuthorize method (401)

    const notifyServerError = (description?: string) => {
      return notification.error({
        message: translate("general.serverError"),
        description,
      });
    }; // notifyServerError method (502, 500)

    const notifyBEError = (description?: string) => {
      return notification.error({
        message: translate("general.beError"),
        description,
      });
    }; // notifyBEError method (420)

    const notifyIdleError = (description?: string) => {
      return notification.error({
        message: translate("general.idleError"),
        description,
      });
    }; // notifyIdleError method (504)

    return {
      notifyUpdateItemSuccess,
      notifyUpdateItemError,
      notifyBadRequest,
      notifyUnAuthorize,
      notifyServerError,
      notifyBEError,
      notifyIdleError,
    };
  }
}

const appMessageService = new AppMessageService();
export default appMessageService;
