import { Model, Repository } from "@react3l/react3l/core";
import nameof from "ts-nameof.macro";
import { Card, Table, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import Pagination from "components/Utility/Pagination/Pagination";
import { TFunction } from "i18next";
import React, { ReactNode } from "react";
import { UseMaster } from "services/pages/master-service";
import { Organization } from "models/Organization";
import { Position } from "models/Position";
import ProvinceView from "views/ProvinceView/ProvinceView";
import { Province } from "models/Province";
import { Sex } from "models/Sex";
import { Status } from "models/Status";

export interface AppMainMasterTableProps extends UseMaster {
  columns?: ColumnProps<Model>[];
  translate?: TFunction;
  repository?: any;
  children?: ReactNode;
}

export function AppMainMasterTable(props: AppMainMasterTableProps) {
  const {
    list,
    columns,
    filter,
    loadingList,
    canBulkDelete,
    rowSelection,
    importButtonRef,
    total,
    repository,
    translate,
    handleTableChange,
    handleServerBulkDelete,
    handleImportList,
    handleListExport,
    handleExportTemplateList,
    handlePagination,
    children,
  } = props;


  return (
    <>
      <div className="page__master-table">
        <Card>
          <Table
            rowKey={nameof(list[0].id)}
            columns={columns}
            pagination={false}
            dataSource={list}
            loading={loadingList}
            onChange={handleTableChange}
            rowSelection={rowSelection}
            scroll={{ x: "max-content" }}
            title={() => (
              <>
                <div className="d-flex justify-content-between">
                  <div className="flex-shrink-1 d-flex align-items-center">
                    <div className="table-title ml-2">{children}</div>
                  </div>

                  <div className="flex-shrink-1 d-flex align-items-center">
                    <Pagination
                      skip={filter.skip}
                      take={filter.take}
                      total={total}
                      onChange={handlePagination}
                      style={{ margin: "10px" }}
                    />
                  </div>
                </div>
              </>
            )}
          />
        </Card>
      </div>
    </>
  );
}
