import { Model, ModelFilter } from "@react3l/react3l/core";
import { Table, Tooltip } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import { AxiosResponse } from "axios";
import Pagination from "components/Utility/Pagination/Pagination";
import { TableColumn } from "core/models/TableColumn";
import React from "react";
import { useTranslation } from "react-i18next";
import { Observable } from "rxjs";
import nameof from "ts-nameof.macro";
export interface ContentTableProps<
  T extends Model, // Eg: PriceList
  TContent extends Model, // Eg: PriceListStoreMappings
  TMapper extends Model, // Eg: Store
  TContentFilter extends ModelFilter // Eg: PriceListStoreMappingsFilter
> {
  /* start required props */
  model: T; // for export
  filter: TContentFilter;
  list: TMapper[];
  columns: TableColumn[];
  total: number;
  loadingList: boolean;
  handleTableChange: (...[, , sorter]: any[]) => void;
  rowSelection: TableRowSelection<TContent>;
  handleLocalBulkDelete: () => void;
  canBulkDelete: boolean;
  handleExportContent: <T extends Model>(
    model: T,
    onExport: (model: T) => Observable<AxiosResponse<any>>,
  ) => () => void;
  handleExportTemplateContent: <T extends Model>(
    model: T,
    onExport: (id: number) => Observable<AxiosResponse<any>>,
  ) => () => void;
  handlePagination: (skip: number, take: number) => void;
  handleAddContent: () => void;
  handleClick: () => void;
  handleImportContentList: (
    modelId: number,
    onImport: (file: File, priceListId: number) => Observable<Model[]>,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  /* end required props */

  /* start optional props */
  onOpenModal?: () => void;
  onExportContent?: (model?: T) => Observable<AxiosResponse<any>>;
  onExportContentTemp?: (id: React.ReactText) => Observable<AxiosResponse<any>>;
  onImportContent?: (file: File, priceListId: number) => Observable<TContent[]>;
  hasAddContentInline?: boolean; // able to add content from footer
  hasMapContentFromModal?: boolean; // able to map content from header
  hasImport?: boolean; // able to import content
  hasExport?: boolean; // able to export content
  hasWriteContentPermission?: boolean; // permission to add/update content
  hasDeleteContentPermission?: boolean; // permission to delete content
  /* end optional props */
}

export const ContentTable = React.forwardRef(
  <
    T extends Model,
    TContent extends Model,
    TMapper extends Model,
    TContentFilter extends ModelFilter
  >(
    props: ContentTableProps<T, TContent, TMapper, TContentFilter>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    const [translate] = useTranslation();

    const {
      model,
      filter,
      columns,
      onOpenModal,
      onExportContent,
      onExportContentTemp,
      onImportContent,
      list,
      total,
      loadingList,
      handleTableChange,
      rowSelection,
      handleLocalBulkDelete,
      canBulkDelete,
      handleExportContent,
      handleExportTemplateContent,
      handlePagination,
      handleAddContent,
      hasAddContentInline,
      hasWriteContentPermission,
      handleClick,
      handleImportContentList,
    } = props;

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
                  {!hasAddContentInline && hasWriteContentPermission && (
                    <Tooltip
                      title={translate("Thêm nhiều dòng")}
                      key='openModal'
                    >
                      <button
                        className='btn gradient-btn-icon text-center'
                        onClick={onOpenModal}
                      >
                        <i className='tio-add ' />
                      </button>
                    </Tooltip>
                  )}
                  <Tooltip title={translate("Xóa tất cả")} key='bulkDelete'>
                    <button
                      className='btn component__btn-delete border-less grow-animate-2'
                      onClick={handleLocalBulkDelete} // local bulk Delete onChange
                      disabled={!canBulkDelete} // disabled when selectedList length === 0
                      style={ {border: "none" , backgroundColor: "unset" } }
                    >
                      <i className='tio-delete' />
                    </button>
                  </Tooltip>
                  <Tooltip title={translate("Nhập excel")} key='importExcel'>
                    <label
                      className='btn gradient-btn-icon mb-0 grow-animate-2'
                      htmlFor='master-import-store'
                    >
                      <i className='tio-file_add_outlined ' />
                    </label>
                  </Tooltip>
                  <Tooltip title={translate("Xuất excel")} key='exportExcel'>
                    <button
                      className='btn gradient-btn-icon grow-animate-2'
                      onClick={handleExportContent(model, onExportContent)}
                    >
                      <i className='tio-file_outlined' />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title={translate("Tải file mẫu")}
                    key='downLoadTemplate'
                  >
                    <button
                      className='btn gradient-btn-icon grow-animate-2'
                      onClick={handleExportTemplateContent(
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
              {hasAddContentInline && hasWriteContentPermission && (
                <Tooltip title={translate("Thêm một dòng")} key='addRow'>
                  <button
                    className='btn btn-sm gradient-btn-icon text-center'
                    onClick={handleAddContent}
                  >
                    <i className='tio-add mr-2' />
                  </button>
                </Tooltip>
              )}
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
  },
);

ContentTable.defaultProps = {
  hasAddContentInline: false,
  hasMapContentFromModal: true,
  hasImport: true,
  hasExport: true,
  hasWriteContentPermission: true,
  hasDeleteContentPermission: true,
};

export default ContentTable;
