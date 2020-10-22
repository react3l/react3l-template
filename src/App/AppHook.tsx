import { commonService } from "@react3l/react3l/services";
import { Reducer, useCallback, useEffect, useReducer } from "react";
import { useLocation } from "react-router";
import { Subscription } from "rxjs";
import { AppAction, AppActionEnum, appReducer, AppState } from "./AppStore";
import appMessageService, { messageType } from "services/app-message-service";

export default function useApp() {
  const { pathname } = useLocation();
  const [subscription] = commonService.useSubscription();
  // reducer
  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(
    appReducer,
    {
      isLoggedIn: false,
      isSuccess: false,
      successMessage: false,
      isError: false,
      errorMessage: "",
      loading: false,
      isErrorModalVisible: false,
      toggleMenu: false,
      displayFooter: false,
      displayOverlay: false,
    },
  );

  const {
    isLoggedIn,
    isSuccess,
    successMessage,
    isError,
    errorMessage,
    loading,
    isErrorModalVisible,
    toggleMenu,
    displayFooter,
    displayOverlay,
  } = state;

  // subcribe appMessageService
  useEffect(() => {
    const successSubscription: Subscription = appMessageService
      ._success()
      .subscribe(
        appMessageService.handleNotify({
          type: messageType.SUCCESS,
          title: "thanh cong",
        }),
      ); // subscribe success

    const errorSubscription: Subscription = appMessageService
      ._error()
      .subscribe(
        appMessageService.handleNotify({
          type: messageType.ERROR,
          title: "that bai",
        }),
      ); // subscribe error

    subscription.add(successSubscription);
    subscription.add(errorSubscription);
  }, [subscription]);

  // update display footer
  useEffect(() => {
    if (pathname.includes("detail")) {
      dispatch({ type: AppActionEnum.SET_FOOTER, displayFooter: true });
    }
    if (pathname.includes("master")) {
      dispatch({ type: AppActionEnum.SET_FOOTER, displayFooter: false });
    }
  }, [pathname]);

  // handle turn off overlay
  const handleToggleOverlay = useCallback(() => {
    dispatch({
      type: AppActionEnum.SET_OVERLAY,
      displayOverlay: !displayOverlay,
    });
  }, [displayOverlay]);

  // handle close error modal
  const handleCloseErrorModal = useCallback(() => {
    dispatch({ type: AppActionEnum.CLOSE_ERROR_MODAL });
  }, []);

  return {
    isLoggedIn,
    isSuccess,
    successMessage,
    isError,
    errorMessage,
    loading,
    isErrorModalVisible,
    toggleMenu,
    displayFooter,
    displayOverlay,
    handleToggleOverlay,
    handleCloseErrorModal,
    dispatch,
    appMessageService, // service instance
    state,
  };
}
