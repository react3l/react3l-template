import { Col, Row, Tooltip } from "antd";
import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import Pagination from "components/Utility/Pagination/Pagination";
import { PRICE_LIST_ROUTE_PREFIX } from "config/route-consts";
import { renderMasterIndex } from "helpers/table";
import { PriceList, PriceListFilter } from "models/PriceList";
import { PriceListStatusFilter } from "models/PriceList/PriceListStatusFilter";
import { SalesOrderTypeFilter } from "models/PriceList/SalesOrderTypeFilter";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import { queryStringService } from "services/QueryStringService";
import { routerService } from "services/RouterService";
import tableService from "services/tbl-service";
import classNames from "classnames";
import nameof from "ts-nameof.macro";

function PriceListMasterView() {
  const [translate] = useTranslation();

  // start master service
  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(
    PRICE_LIST_ROUTE_PREFIX,
  );

  const [toggle, setToggle] = React.useState<boolean>(false);

  const handleToggleSearch = React.useCallback(() => {
    const toggleTmp = !toggle;
    setToggle(toggleTmp);
  }, [toggle, setToggle]);

  const [
    filter,
    setFilter,
    ,
    handleChangeFilter,
    ,
    handlePagination,
    handleResetFilter,
  ] = queryStringService.useQueryString<PriceList, PriceListFilter>(
    PriceListFilter,
  );
  // end master service

  // const { filter, setFilter } = filterService.useUrlQuery(PriceListFilter);

  const {
    list,
    total,
    loadingList,
    pagination,
    handleTableChange,
    handleServerDelete,
    // handleServerBulkDelete,
    rowSelection,
  } = tableService.useTable<PriceList, PriceListFilter>(
    filter,
    setFilter,
    priceListRepository.list,
    priceListRepository.count,
    priceListRepository.delete,
    priceListRepository.bulkDelete,
  );

  const columns: ColumnProps<PriceList>[] = useMemo(
    () => [
      {
        title: "STT",
        key: "index",
        width: 100,
        render: renderMasterIndex<PriceList>(pagination),
      },
      {
        title: "code",
        key: "code",
        dataIndex: "code",
        render(...[code]) {
          return <div className='display-code'>{code}</div>;
        },
      },
      {
        title: "action",
        key: "action",
        dataIndex: "id",
        width: 200,
        align: "center",
        render(id: number, priceList: PriceList) {
          return (
            <div className='d-flex justify-content-center button-action-table'>
              <Tooltip title={translate("general.actions.view")}>
                <button className='btn gradient-btn-icon'>
                  <i className='tio-visible' />
                </button>
              </Tooltip>
              <Tooltip title={translate("general.actions.edit")}>
                <button
                  className='btn gradient-btn-icon'
                  onClick={handleGoDetail(id)}
                >
                  <i className='tio-edit' />
                </button>
              </Tooltip>
              {/* {!product.used && validAction('delete') && ( */}
              <Tooltip title={"delete"}>
                <button
                  className='btn btn-sm component__btn-delete'
                  onClick={() => handleServerDelete(priceList)}
                >
                  <i className='tio-delete' />
                </button>
              </Tooltip>
              {/* )} */}
            </div>
          );
        },
      },
    ],

    [handleGoDetail, handleServerDelete, pagination, translate],
  );

  return (
    <div className='page page__master'>
      {/* start master header */}
      <div className='page__header d-flex align-items-center justify-content-between'>
        <div className='page__title'>
          {translate("paymentRequest.master.title")}
        </div>
        <div className='page__actions d-flex align-items-center'>
          <button
            className='btn btn-sm component__btn-primary ml-3'
            onClick={handleGoCreate}
          >
            {translate("general.actions.create")}
          </button>
        </div>
      </div>
      {/* end master header */}
      {/* start search master */}
      {/* start basic search, normally search like code, name, date, etc. */}
      <div className='page__search'>
        <Card title={translate("general.search.title")}>
          <Row className='d-flex align-items-center'>
            <Col lg={12}>
              <div className='pr-4'>
                <InputSearch />
              </div>
            </Col>
            <Col lg={4} className='pr-4'>
              <div className='mt__1'>
                <label className='label'>
                  {translate("general.priceList.code")}
                </label>
                <AdvanceStringFilter
                  value={filter["code"]["startWith"]}
                  onChange={handleChangeFilter("code", "startWith")}
                  placeHolder={translate("general.filter.idFilter")} // -> tat ca
                />
              </div>
            </Col>
            <Col lg={4} className='pr-4'>
              <div className='mt__1'>
                <label className='label'>
                  {translate("general.priceList.name")}
                </label>
                <AdvanceStringFilter
                  value={filter["name"]["startWith"]}
                  onChange={handleChangeFilter("name", "startWith")}
                  placeHolder={translate("general.filter.idFilter")} // -> tat ca
                />
              </div>
            </Col>
            {/* start toggle and reset filter */}
            <Col lg={4}>
              <div className='d-flex justify-content-end'>
                <button
                  className={classNames(
                    "btn component__btn-toggle mr-4",
                    toggle === true ? "component__btn-toggle-active" : "",
                  )}
                  onClick={handleToggleSearch}
                >
                  <div className='tio-down_ui' />
                  <div className='tio-down_ui' />
                </button>
                <div className='d-flex justify-content-between'>
                  <button className='btn btn-info' onClick={handleResetFilter}>
                    ResetFilter
                  </button>
                </div>
              </div>
            </Col>
            {/* end toggle and reset filter */}
          </Row>
          {/* end basic search */}
          {/* start advanced search */}
          {toggle && (
            <>
              <Row className='mt-4'>
                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate("priceList.status")}
                  </label>
                  <AdvanceIdFilter
                    classFilter={PriceListStatusFilter}
                    getList={priceListRepository.filterListStatus}
                    placeHolder={"Tất cả"}
                  />
                </Col>
                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate("priceList.saleOrderType")}
                  </label>
                  <AdvanceIdFilter
                    classFilter={SalesOrderTypeFilter}
                    getList={priceListRepository.filterListSalesOrderType}
                    placeHolder={"Tất cả"}
                  />
                </Col>
              </Row>
            </>
          )}
        </Card>
      </div>
      {/* end search master */}
      <div className='page__master-table'>
        <Card>
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
        </Card>
      </div>
    </div>
  );
}

export default PriceListMasterView;
