import { Card, Row } from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import Modal from "antd/lib/modal/Modal";
import classNames from "classnames";
import AppAside from "components/AppAside/AppAside";
import AppAsideCollapse from "components/AppAsideCollapse/AppAsideCollapse";
import AppFooter from "components/AppFooter/AppFooter";
import AppHeader from "components/AppHeader/AppHeader";
import { menu } from "config/menu";
import { routes } from "config/routes";
import React, { useMemo } from "react";
import { Animated } from "react-animated-css";
import { Switch, withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import {
  AppDispatchContext,
  AppMessageContext,
  AppStoreContext,
} from "views/AppContext";
import useApp from "views/AppHook";
import "./App.scss";
function App() {
  const {
    errorMessage,
    isErrorModalVisible,
    toggleMenu,
    displayFooter,
    displayOverlay,
    handleCloseErrorModal,
    dispatch, // app dispatch
    appMessageService, // service instance
    state,
  } = useApp();

  const renderLayout = useMemo(
    () => (
      <div className='app d-flex'>
        {!toggleMenu ? (
          <Animated
            animationIn='slideInLeft'
            animationOut='slideOutLeft'
            animationInDuration={800}
            animationOutDuration={400}
            isVisible={!toggleMenu as boolean}
          >
            <div className='left-side column'>
              <AppAside routes={menu} />
            </div>
          </Animated>
        ) : (
          <Animated
            animationIn='slideInLeft'
            animationOut='slideOutLeft'
            animationInDuration={800}
            animationOutDuration={400}
            isVisible={toggleMenu as boolean}
          >
            <div className='left-side column'>
              <AppAsideCollapse routes={menu} />
            </div>
          </Animated>
        )}
        <div className='right-side column'>
          <div
            className={classNames("header-wrapper", {
              "header-wrapper__block": displayOverlay,
            })}
          >
            <AppHeader />
          </div>
          <main className='body'>
            <Switch>{renderRoutes(routes)}</Switch>
          </main>
          <div
            className={classNames({
              "header__overlay header__display-block": displayOverlay,
            })}
          ></div>
        </div>
        {true && <AppFooter />}
      </div>
    ),
    [displayOverlay, toggleMenu],
  );

  const modalFooter = useMemo(
    () => (
      <div className='d-flex justify-content-end'>
        <button
          className='btn btn-sm component__btn-cancel'
          onClick={handleCloseErrorModal}
        >
          <i className='tio-clear' /> Hủy
        </button>
      </div>
    ),
    [handleCloseErrorModal],
  );

  const renderErrorModal = useMemo(
    () => (
      <Modal
        visible={isErrorModalVisible}
        onCancel={handleCloseErrorModal}
        closable={false}
        width={600}
        footer={modalFooter}
      >
        <Card>
          <Row>
            <div className='div-scroll'>
              {typeof errorMessage !== "undefined" &&
                errorMessage.split("\n")?.map((err) => (
                  <div className='mt-3 mb-3 pl-2 text-danger' key={err}>
                    {err}
                  </div>
                ))}
            </div>
          </Row>
        </Card>
      </Modal>
    ),
    [errorMessage, handleCloseErrorModal, isErrorModalVisible, modalFooter],
  );

  return (
    <>
      <ErrorBoundary>
        <AppMessageContext.Provider value={appMessageService}>
          <AppDispatchContext.Provider value={dispatch}>
            <AppStoreContext.Provider value={[state, dispatch]}>
              {renderLayout}
              {renderErrorModal}
            </AppStoreContext.Provider>
          </AppDispatchContext.Provider>
        </AppMessageContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default withRouter(App);
