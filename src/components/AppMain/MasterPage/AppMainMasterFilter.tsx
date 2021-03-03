import { Card, Menu, Dropdown, Button, Tooltip } from "antd";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import { TFunction } from "i18next";
import { Animate } from "react-show";
import React, { ReactNode } from "react";
import { UseMaster } from "services/pages/master-service";
import classNames from "classnames";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

export interface AppMainMasterFilterProps extends UseMaster {
  translate: TFunction;
  children: ReactNode;
}

export function AppMainMasterFilter(props: AppMainMasterFilterProps) {
  const {
    toggle,
    canBulkDelete,
    importButtonRef,
    filter,
    // repository,
    translate,
    handleToggleSearch,
    handleResetFilter,
    handleGoCreate,
    handleServerBulkDelete,

    children,
  } = props;

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Tooltip
          title={translate("general.button.bulkDelete")}
          key="bulkDelete"
        >
          <button
            className="btn border-less component__btn-delete grow-animate-2"
            style={{ border: "none", backgroundColor: "unset" }}
            onClick={handleServerBulkDelete}
            disabled={!canBulkDelete}
          >
            <i className="tio-delete" />
          </button>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="2">
        <Tooltip title={translate("general.button.importExcel")}>
          <>
            <input
              ref={importButtonRef}
              type="file"
              style={{ display: "none" }}
              id="master-import"
              onChange={/*handleImportList(repository.import)*/ () => null}
            />
            <button
              className="btn border-less gradient-btn-icon grow-animate-2"
              onClick={() => {
                importButtonRef.current.click();
              }}
            >
              <i className="tio-file_add_outlined" />
            </button>
          </>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="3">
        <Tooltip title={translate("general.button.exportExcel")}>
          <button
            className="btn border-less gradient-btn-icon grow-animate-2"
            onClick={/*handleListExport(filter, repository.export)*/ () => null}
          >
            <i className="tio-file_outlined" />
          </button>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="4">
        <Tooltip title={translate("general.button.downloadTemplate")}>
          <button
            className="btn border-less gradient-btn-icon grow-animate-2"
            onClick={
              /*handleExportTemplateList(repository.exportTemplate)*/ () => null
            }
          >
            <i className="tio-download_to" />
          </button>
        </Tooltip>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="page__search">
        <Card title={translate("general.search.title")}>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-grow-1">
              <div className="pr-4 w70">
                <InputSearch />
              </div>
              <button
                className={classNames(
                  "btn component__btn-toggle mr-4 grow-animate-1",
                  toggle === true ? "component__btn-toggle-active" : ""
                )}
                onClick={handleToggleSearch}
              >
                <i className="tio-tune_horizontal"></i>
                <span className="component_btn-text">
                  {translate("general.button.advance")}
                </span>
              </button>
            </div>

            {/* start toggle and reset filter */}
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-sm component__btn-primary ml-3 grow-animate-1"
                onClick={handleGoCreate}
              >
                {translate("general.actions.create")}
              </button>
              <div className="table__action">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button>
                    Tác vụ <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            {/* end toggle and reset filter */}
          </div>
          <Animate
            show={toggle}
            duration={500}
            style={{ height: "auto" }}
            transitionOnMount={true}
            start={{ height: 0 }}
            leave={{ opacity: 0, height: 0 }}
          >
            {children}
          </Animate>
        </Card>
      </div>
    </>
  );
}
