import { Tooltip } from "antd";
import { Store } from "antd/lib/form/interface";
import Table from "antd/lib/table";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import Pagination from "components/Utility/Pagination/Pagination";
import Model from "core/models/Model";
import { renderMasterIndex } from "helpers/table";
import { PriceListStoreMappings } from "models/PriceList";
import { PriceListStoreMappingsFilter } from "models/PriceList/PriceListStoreMappingsFilter";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import listService from "services/list-service";
import tableService, { getAntOrderType } from "services/tbl-service";
import nameof from "ts-nameof.macro";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { StoreTypeFilter } from "models/StoreTypeFilter";
import { priceListRepository } from "repositories/price-list-repository";
import { StoreType } from "models/StoreType";

export interface ContentTableProps<TContent extends Model> {
  content: TContent[];
  setContent: (content: TContent[]) => void;
}

export default function PriceListStoreMappingTable(
  props: ContentTableProps<PriceListStoreMappings>,
) {
  const [translate] = useTranslation();
  const { content, setContent } = props;

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
    pagination,
  } = tableService.useLocalTable(
    list,
    total,
    loadingList,
    handleSearch,
    filter,
    (filter) => setFilter(filter),
    content,
    setContent,
  );

  //   need separating to be reused
  const handleFilter = useCallback(
    (fieldName: string, fieldType: string) => {
      return (value: any) => {
        setFilter({
          ...filter,
          [fieldName]: {
            [fieldType]: value,
          },
        });
        if (typeof handleSearch === "function") {
          handleSearch();
        }
      };
    },
    [filter, setFilter, handleSearch],
  );

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
            render(storeCode: string) {
              return storeCode;
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
    ],
    [pagination, content, filter, translate, handleFilter],
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
