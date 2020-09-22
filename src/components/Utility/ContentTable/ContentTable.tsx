import React, { Dispatch } from "react";
import nameof from "ts-nameof.macro";
import { Table, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { TableColumn } from "core/models/TableColumn";
import { useContentTable } from "./ContentTableHook";
import Pagination from "components/Utility/Pagination/Pagination";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { AdvanceFilterAction } from "services/AdvanceFilterService";
export interface ContentTableProps<
  T extends Model, // Eg: PriceList
  TContent extends Model, // Eg: PriceListStoreMappings
  TMapper extends Model, // Eg: Store
  TContentFilter extends ModelFilter // Eg: PriceListStoreMappingsFilter
> {
  model: T; // for export
  content: TContent[]; // source
  setContent: (content: TContent[]) => void; // setSource
  mapperField: string; // mapperField.Eg: Store
  contentClass: new () => TContent;
  contentFilterClass: new () => TContentFilter;
  filter: TContentFilter;
  dispatch: Dispatch<AdvanceFilterAction<TContentFilter>>;
  columns: TableColumn[];
  contentMapper?: (model: TContent | TMapper) => TContent;
  handleOpenModal?: () => void;
  onExportContent?: (model?: T) => Observable<AxiosResponse<any>>;
  onExportContentTemp?: (id: React.ReactText) => Observable<AxiosResponse<any>>;
  onImportContent?: (file: File, priceListId: number) => Observable<TContent[]>;
  hasAddContentInTable?: boolean; // able to add content from footer
  hasMapContentFromModal?: boolean; // able to map content from header
  hasImport?: boolean; // able to import content
  hasExport?: boolean; // able to export content
  hasWriteContentPermission?: boolean; // permission to add/update content
  hasDeleteContentPermission?: boolean; // permission to delete content
}

export default function ContentTable<
  T extends Model,
  TContent extends Model,
  TMapper extends Model,
  TContentFilter extends ModelFilter
>(props: ContentTableProps<T, TContent, TMapper, TContentFilter>) {
  const [translate] = useTranslation();

  const {
    model,
    content,
    setContent,
    mapperField,
    contentClass,
    contentFilterClass,
    filter,
    dispatch,
    contentMapper,
    columns,
    handleOpenModal,
    onExportContent,
    onExportContentTemp,
    onImportContent,
  } = props;

  const {
    list, // list for dataSource
    loadingList, // loading for await data filtering
    total,
    handleAddContent, // add one content in local table
    handleTableChange, // handle table change action for ant table, sorter, pager, etc.
    handlePagination, // handle custom pagination, not for ant table
    rowSelection, // row selection for table
    canBulkDelete, // decide whether we enable bulk delete button
    handleLocalBulkDelete, // bulk delete local ..., based on rowSelection
    ref, // import input ref
    handleClick, // clear value of ref
    handleImportContentList, // handleChange import file
    handleContentExport, // content export
    handleContentExportTemplate, // content export template
  } = useContentTable<TContent, TMapper, TContentFilter>(
    content,
    setContent,
    contentMapper,
    contentClass,
    contentFilterClass,
    filter,
    dispatch,
    mapperField,
  );

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
                <Tooltip title={translate("Thêm nhiều dòng")} key='openModal'>
                  <button
                    className='btn gradient-btn-icon text-center'
                    onClick={handleOpenModal}
                  >
                    <i className='tio-add ' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Xóa tất cả")} key='bulkDelete'>
                  <button
                    className='btn component__btn-delete'
                    onClick={handleLocalBulkDelete} // local bulk Delete onChange
                    disabled={!canBulkDelete} // disabled when selectedList length === 0
                  >
                    <i className='tio-delete' />
                  </button>
                </Tooltip>
                <Tooltip title={translate("Nhập excel")} key='importExcel'>
                  <label
                    className='btn gradient-btn-icon mb-0'
                    htmlFor='master-import-store'
                  >
                    <i className='tio-file_add_outlined ' />
                  </label>
                </Tooltip>
                <Tooltip title={translate("Xuất excel")} key='exportExcel'>
                  <button
                    className='btn gradient-btn-icon'
                    onClick={handleContentExport(model, onExportContent)}
                  >
                    <i className='tio-file_outlined' />
                  </button>
                </Tooltip>
                <Tooltip
                  title={translate("Tải file mẫu")}
                  key='downLoadTemplate'
                >
                  <button
                    className='btn gradient-btn-icon'
                    onClick={handleContentExportTemplate(
                      model,
                      onExportContentTemp,
                    )}
                  >
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
        footer={() => (
          <div className='d-flex justify-content-end'>
            <Tooltip title={translate("Thêm một dòng")} key='addRow'>
              <button
                className='btn btn-sm gradient-btn-icon text-center'
                onClick={handleAddContent}
              >
                <i className='tio-add mr-2' />
              </button>
            </Tooltip>
          </div>
        )}
      />
      {/* input import file */}
      <input
        ref={ref}
        type='file'
        className='invisible'
        id='master-import-store'
        onChange={handleImportContentList(model?.id, onImportContent)}
        onClick={handleClick}
      />
    </>
  );
}

ContentTable.defaultProps = {
  content: [],
  hasAddContentInTable: true,
  hasMapContentFromModal: true,
  hasImport: true,
  hasExport: true,
  hasWriteContentPermission: true,
  hasDeleteContentPermission: true,
};
