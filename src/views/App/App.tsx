import React, { useMemo } from "react";
import { Modal, Card, Row } from "antd";
import classNames from "classnames";
import AppAside from "components/AppAside/AppAside";
import AppAsideCollapse from "components/AppAsideCollapse/AppAsideCollapse";
import AppFooter from "components/AppFooter/AppFooter";
import AppHeader from "components/AppHeader/AppHeader";
import { menu } from "config/menu";
import { routes } from "config/routes";
import { Switch, withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import useApp from "views/AppHook";
import { AppMessageContext } from "views/AppContext";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import "./App.scss";

function App() {
  const {
    errorMessage,
    isErrorModalVisible,
    toggleMenu,
    displayFooter,
    displayOverlay,
    handleOffOverlay,
    handleCloseErrorModal,
    appMessageService, // service instance
  } = useApp();

  const renderLayout = useMemo(
    () => (
      <div className='app d-flex'>
        <AppAsideCollapse
          className={toggleMenu ? "slide-in" : "slide-out"}
          routes={menu}
        />
        <AppAside
          className={!toggleMenu ? "app_slide-in" : "app_slide-out"}
          routes={menu}
        />

        <div
          className={classNames({
            "header__overlay header__display-block": displayOverlay,
          })}
          onClick={handleOffOverlay}
        ></div>
        <section
          className={classNames(
            "flex-item",
            !toggleMenu ? "main content-in" : "main content-out",
          )}
        >
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
        </section>
        {displayFooter === true ? <AppFooter /> : <></>}
      </div>
    ),
    [displayFooter, displayOverlay, handleOffOverlay, toggleMenu],
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
          {renderLayout}
          {renderErrorModal}
        </AppMessageContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default withRouter(App);
