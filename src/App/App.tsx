import { LoadingOutlined } from "@ant-design/icons";
import { Card, Row, Spin } from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import Modal from "antd/lib/modal/Modal";
import { AppMessageContext, AppStoreContext } from "App/AppContext";
import useApp from "App/AppHook";
import classNames from "classnames";
import AppAside from "components/AppAside/AppAside";
import AppHeader from "components/AppHeader/AppHeader";
import { menu } from "config/menu";
import { routes } from "config/routes";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Switch, withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import "./App.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  const [translate] = useTranslation();
  const {
    errorMessage,
    isErrorModalVisible,
    displayOverlay,
    handleCloseErrorModal,
    dispatch, // app dispatch
    appMessageService, // service instance
    state,
  } = useApp();

  const renderLayout = useMemo(
    () => (
      <div className='app d-flex'>
        <div className='left-side column'>
          <AppAside routes={menu} />
        </div>
        <div className='right-side column'>
          <div
            className={classNames("header-wrapper")}
          >
            <AppHeader />
          </div>
          <main className={classNames('body', {'body--extended': state.extendPageMaster})}>
            <Switch>{renderRoutes(routes)}</Switch>
          </main>
          <div
            className={classNames({
              "header__overlay header__display-block": displayOverlay,
            })}
          ></div>
        </div>
      </div>
    ),
    [displayOverlay, state],
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
      {false ? (
        <div id='app'>
          <Spin
            indicator={antIcon}
            tip={translate("pages.checking.authority")}
          />
        </div>
      ) : (
        <ErrorBoundary>
          <AppMessageContext.Provider value={appMessageService}>
            <AppStoreContext.Provider value={[state, dispatch]}>
              {renderLayout}
              {renderErrorModal}
            </AppStoreContext.Provider>
          </AppMessageContext.Provider>
        </ErrorBoundary>
      )}
    </>
  );
}

export default withRouter(App);
