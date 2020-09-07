import { Tooltip } from "antd";
import Table from "antd/lib/table";
import Pagination from "components/Utility/Pagination/Pagination";
import Model from "core/models/Model";
import React from "react";
import { useTranslation } from "react-i18next";
import { ModelFilter } from "react3l/core";
import tableService from "services/tbl-service";
import nameof from "ts-nameof.macro";
import {
  tableColumnFactory,
  ColumnData,
} from "services/component-factory/table-column-service";
import listService from "services/list-service";

export interface ContentTableProps<
  TContent extends Model,
  TContentFilter extends ModelFilter
> {
  filter: TContentFilter;
  setFilter: (filter: TContentFilter) => void;
  content: TContent[];
  setContent: (content: TContent[]) => void;
  columnData: ColumnData[];
  mapperField?: string;
}

export default function ContentTable<
  TContent extends Model,
  TContentFilter extends ModelFilter
>(props: ContentTableProps<TContent, TContentFilter>) {
  const [translate] = useTranslation();

  const {
    filter,
    setFilter,
    content,
    setContent,
    columnData,
    mapperField,
  } = props;

  const { list, total, loadingList, handleSearch } = listService.useLocalList(
    filter,
    content,
  );

  const {
    handleTableChange,
    handlePagination,
    rowSelection,
  } = tableService.useLocalTable(
    total,
    handleSearch,
    filter,
    setFilter,
    content,
    setContent,
    mapperField,
  );

  const columns = tableColumnFactory.renderTableColumn(columnData);

  return (
    <>
      <Table
        tableLayout='fixed'
        bordered={true}
        rowKey={nameof(list[0].key)}
        columns={columns}
        pagination={false}
        dataSource={list}
        loading={loadingList}
        onChange={handleTableChange}
        rowSelection={rowSelection}
        title={() => (
          <>
            <div className='d-flex justify-content-between'>
              <div
                className='flex-shrink-1 d-flex align-items-center'
                key='title'
              >
                <div className='table-title ml-2'>
                  {translate("province.table.title")}
                </div>
              </div>

              <div
                className='flex-shrink-1 d-flex align-items-center'
                key='actions'
              >
                <Tooltip title={translate("Xóa tất cả")} key='bulkDelete'>
                  <button className='btn component__btn-delete'>
                    <i className='tio-delete' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Nhập excel")} key='importExcel'>
                  <button className='btn gradient-btn-icon'>
                    <i className='tio-file_add_outlined ' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Xuất excel")} key='exportExcel'>
                  <button className='btn gradient-btn-icon'>
                    <i className='tio-file_outlined' />
                  </button>
                </Tooltip>
                <Tooltip
                  title={translate("Tải file mẫu")}
                  key='downLoadTemplate'
                >
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
