import { Tooltip, Table, Popconfirm } from "antd";
import nameof from "ts-nameof.macro";
import { Store } from "antd/lib/form/interface";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import InputText from "components/Utility/Input/InputText/InputText";
import Pagination from "components/Utility/Pagination/Pagination";
import { renderMasterIndex } from "helpers/table";
import { PriceListStoreMappings } from "models/PriceList";
import { PriceListStoreMappingsFilter } from "models/PriceList/PriceListStoreMappingsFilter";
import { StoreType } from "models/StoreType";
import { StoreTypeFilter } from "models/StoreTypeFilter";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import { formService } from "services/FormService";
import listService from "services/list-service";
import tableService, { getAntOrderType } from "services/tbl-service";
import ContentModal from "../ContentModal/PriceListStoreMappingsModal";
import { advanceFilterService } from "services/AdvanceFilterService";

export interface ContentTableProps {
  content: PriceListStoreMappings[];
  setContent: (content: PriceListStoreMappings[]) => void;
  mapperField: string;
}

export default function PriceListStoreMappingTable(props: ContentTableProps) {
  const [translate] = useTranslation();
  const { content, setContent, mapperField } = props;

  const [filter, setFilter] = useState<PriceListStoreMappingsFilter>(
    new PriceListStoreMappingsFilter(),
  );

  const { list, total, loadingList, handleSearch } = listService.useLocalList(
    filter,
    content.map(mapper),
  );

  const {
    handleTableChange,
    handlePagination,
    rowSelection,
    canBulkDelete,
    pagination,
    handleLocalDelete, // delete local content in table
    handleLocalBulkDelete, // bulk delete local ..., based on rowSelection
  } = tableService.useLocalTable(
    total,
    handleSearch,
    filter,
    (filter) => setFilter(filter),
    content,
    setContent,
    mapperField,
  );

  const handleFilter = advanceFilterService.useChangeLocalFilter<
    PriceListStoreMappingsFilter
  >(filter, setFilter, handleSearch);

  // cant be lift up when render column dynamically
  const [
    ,
    handleChangeContentField,
    ,
    handleAddContent,
  ] = formService.useContentField<PriceListStoreMappings>(
    PriceListStoreMappings,
    content,
    setContent,
  );

  // need separating to be reused
  const handleAdd = useCallback(() => {
    // add content
    handleAddContent();
    // go to the last page
    setFilter({
      ...filter,
      skip: Math.round(total / filter.take) * filter.take,
    });
    handleSearch();
  }, [handleAddContent, handleSearch, filter, total]);

  const columns = useMemo(
    () => [
      {
        title: () => <>{translate("general.columns.index")}</>,
        key: "index",
        children: [
          {
            title: "",
            key: "index", // need dynamic
            width: 120, // need dynamic
            render: renderMasterIndex<PriceListStoreMappings>(pagination),
          },
        ],
      },
      {
        title: () => (
          <>
            <div>{translate("priceLists.store.code")}</div>
          </>
        ),
        key: nameof(content[0].storeCode), // must be the same with getAntOrderType param[1]
        dataIndex: nameof(content[0].storeCode),
        sorter: true,
        sortOrder: getAntOrderType<
          PriceListStoreMappings,
          PriceListStoreMappingsFilter
        >(filter, nameof(content[0].storeCode)), // and the same here
        children: [
          {
            title: () => (
              <>
                <AdvanceStringFilter
                  value={filter["storeCode"]["contain"]}
                  onChange={handleFilter("storeCode", "contain")}
                  placeHolder={translate("priceList.filter.code")} // -> tat ca
                />
              </>
            ),
            key: "code",
            dataIndex: nameof(content[0].storeCode),
            ellipsis: true,
            render(storeCode: string, record: PriceListStoreMappings) {
              return (
                <InputText
                  isMaterial={true}
                  value={storeCode}
                  placeHolder={translate("priceList.placeholder.storeCode")}
                  className={"tio-account_square_outlined"}
                  onChange={handleChangeContentField(
                    record.key,
                    nameof(content[0].storeCode),
                  )}
                />
              );
            },
          },
        ],
      },
      {
        title: () => (
          <>
            <div>{translate("priceLists.store.storeType")}</div>
          </>
        ),
        key: nameof(content[0].storeType), // must be the same with getAntOrderType param[1]
        dataIndex: nameof(content[0].storeTypeId),
        sorter: true,
        sortOrder: getAntOrderType<
          PriceListStoreMappings,
          PriceListStoreMappingsFilter
        >(filter, nameof(content[0].storeTypeId)), // and the same here
        children: [
          {
            title: () => (
              <>
                <AdvanceIdFilter
                  value={filter["storeTypeId"]["equal"]}
                  onChange={handleFilter("storeTypeId", "equal")}
                  classFilter={StoreTypeFilter}
                  getList={priceListRepository.filterListStoreType}
                  placeHolder={translate("general.filter.idFilter")} // -> tat ca
                />
              </>
            ),
            key: "storeType",
            dataIndex: nameof(content[0].storeType),
            render(storeType: StoreType) {
              return storeType?.name;
            },
          },
        ],
      },
      {
        title: () => <>{translate("general.actions.label")}</>,
        children: [
          {
            title: "",
            key: nameof("general.actions"),
            dataIndex: nameof(content[0].key),
            width: 120,
            render(...params: [string, PriceListStoreMappings, number]) {
              return (
                <div className='button-action-table'>
                  {/* {validAction('create') && ( */}
                  <Popconfirm
                    placement='left'
                    title={translate("general.delete.content")}
                    onConfirm={() => handleLocalDelete(params[1])}
                    okText={translate("general.actions.delete")}
                    cancelText={translate("general.actions.cancel")}
                  >
                    <button className='btn btn-link mr-2'>
                      <i className='tio-delete_outlined text-danger' />
                    </button>
                  </Popconfirm>
                  {/* )} */}
                </div>
              );
            },
          },
        ],
      },
    ],
    [
      pagination,
      content,
      filter,
      translate,
      handleFilter,
      handleChangeContentField,
      handleLocalDelete,
    ],
  );

  // state for modal
  const {
    visible,
    loadControl,
    handleEndControl,
    handleOpenModal,
    handleCloseModal,
  } = tableService.useContenModal();

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
        footer={() => (
          <div className='d-flex justify-content-end'>
            <Tooltip title={translate("Thêm một dòng")} key='addRow'>
              <button
                className='btn btn-sm gradient-btn-icon text-center'
                onClick={handleAdd}
              >
                <i className='tio-add mr-2' />
              </button>
            </Tooltip>
          </div>
        )}
      />
      <ContentModal
        visible={visible}
        loadControl={loadControl}
        endLoadControl={handleEndControl}
        onClose={handleCloseModal}
      />
    </>
  );
}

/**
 *
 * spread content from object or build content from object and spread
 * before passing content to localList service
 * */

function mapper(model: PriceListStoreMappings | Store): PriceListStoreMappings {
  if (model.hasOwnProperty("store")) {
    const { store } = model;
    return {
      ...model,
      storeId: store?.id,
      storeCode: store?.code,
      storeName: store?.name,
      storeTypeId: store?.storeTypeId,
      provinceId: store?.provinceId,
      storeGroupingId: store?.storeGroupingId,
      storeType: store?.storeType,
      storeGrouping: store?.storeGrouping,
      province: store?.province,
    };
  }
  return mapper({ ...new PriceListStoreMappings(), store: model });
}
