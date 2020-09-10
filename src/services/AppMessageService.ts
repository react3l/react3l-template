import { Model } from "@react3l/react3l/core";
import { useTranslation } from "react-i18next";
import notification from "antd/lib/notification";

notification.config({
  placement: "bottomRight",
});

export const appMessageService = {
  useCRUDMessage<T extends Model>() {
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
