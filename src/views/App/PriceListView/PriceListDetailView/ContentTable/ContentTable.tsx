import { Tooltip } from "antd";
import Table from "antd/lib/table";
import Pagination from "components/Utility/Pagination/Pagination";
import Model from "core/models/Model";
import React from "react";
import { useTranslation } from "react-i18next";
import { ModelFilter } from "react3l/core";
import tableService from "services/tbl-service";
import nameof from "ts-nameof.macro";

export interface ContentTableProps<
  TContent extends Model,
  TContentFilter extends ModelFilter
> {
  filter: TContentFilter;
  setFilter: (filter: TContentFilter) => void;
  content: TContent[];
  setContent: (content: TContent[]) => void;
  columnData: any[][];
}

export default function ContentTable<
  TContent extends Model,
  TContentFilter extends ModelFilter
>(props: ContentTableProps<TContent, TContentFilter>) {
  const [translate] = useTranslation();

  const { filter, setFilter, content, setContent, columnData } = props;

  const {
    list,
    total,
    loadingList,
    handleTableChange,
    handlePagination,
    rowSelection,
  } = tableService.useLocalTable(filter, setFilter, content, setContent);

  const columns = tableService.useRenderColumns(columnData);

  return (
    <>
      <Table
        tableLayout='fixed'
        bordered={true}
        rowKey={nameof(list[0].id)}
        columns={columns}
        pagination={false}
        dataSource={list}
        loading={loadingList}
        onChange={handleTableChange}
        rowSelection={rowSelection}
        title={() => (
          <>
            <div className='d-flex justify-content-between'>
              <div className='flex-shrink-1 d-flex align-items-center'>
                <div className='table-title ml-2'>
                  {translate("province.table.title")}
                </div>
              </div>

              <div className='flex-shrink-1 d-flex align-items-center'>
                <Tooltip title={translate("Xóa tất cả")}>
                  <button className='btn component__btn-delete'>
                    <i className='tio-delete' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Nhập excel")}>
                  <button className='btn gradient-btn-icon'>
                    <i className='tio-file_add_outlined ' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Xuất excel")}>
                  <button className='btn gradient-btn-icon'>
                    <i className='tio-file_outlined' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Tải file mẫu")}>
                  <button className='btn gradient-btn-icon'>
                    <i className='tio-download_to' />
                  </button>
                </Tooltip>
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
    </>
  );
}

ContentTable.defaultProps = {
  filter: {},
  content: [],
  columnData: [],
};
