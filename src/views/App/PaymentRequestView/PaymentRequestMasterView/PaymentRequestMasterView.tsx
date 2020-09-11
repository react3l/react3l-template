import { IdFilter } from "@react3l/advanced-filters/IdFilter";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import { ModelFilter } from "@react3l/react3l/core";
import { Col, Row, Tooltip } from "antd";
import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import { PAYMENT_REQUEST_DETAIL_ROUTE } from "config/route-consts";
import { PaymentFilter } from "models/PaymenFilter";
import { Payment } from "models/Payment";
import { Province } from "models/Province";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { paymentRepository } from "repositories/payment-repository";
import { queryStringService } from "services/QueryStringService";
import { routerService } from "services/RouterService";
import { tableService } from "services/TableService";
import nameof from "ts-nameof.macro";
import "./PaymentRequestMasterView.scss";

export class DemoListFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

function PaymentMasterView() {
  const [translate] = useTranslation();
  const [filter] = queryStringService.useQueryString<PaymentFilter>(
    PaymentFilter,
  );

  const [list, , , loading, ,] = tableService.useMasterTable<
    Payment,
    PaymentFilter
  >(filter, paymentRepository.list, paymentRepository.count);

  const [rowSelection] = tableService.useRowSelection<Payment>();

  const [handleGoCreate] = routerService.useMasterNavigation(
    PAYMENT_REQUEST_DETAIL_ROUTE,
  );

  const [toggle, setToggle] = React.useState<boolean>(false);

  const columns: ColumnProps<Payment>[] = React.useMemo(
    () => [
      {
        title: translate("paymentRequest.id"),
        key: nameof(list[0].id),
        dataIndex: nameof(list[0].id),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].id)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate("paymentRequest.name"),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].name)),
        render(id: number) {
          return id;
        },
      },
      {
        title: () => (
          <div>
            <div>{translate("paymentRequest.code")}</div>
          </div>
        ),
        key: nameof(list[0].code),
        dataIndex: nameof(list[0].code),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].code)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate("paymentRequest.province"),
        key: nameof(list[0].province),
        dataIndex: nameof(list[0].province),
        sorter: true,
        sortOrder: tableService.getAntOrderType(
          filter,
          nameof(list[0].province),
        ),
        render(province: Province) {
          return province.name;
        },
      },
      {
        title: translate("paymentRequest.status"),
        key: nameof(list[0].status),
        dataIndex: nameof(list[0].status),
        align: "center",
        render(status) {
          return (
            <div className='d-flex justify-content-center'>
              {status?.id === 1 && <div className='shipped'>Shipped</div>}
              {status?.id === 2 && <div className='processing'>Processing</div>}
              {status?.id === 3 && <div className='cancelled'>Cancelled</div>}
            </div>
          );
        },
      },
      {
        title: translate("paymentRequest.date"),
        key: nameof(list[0].date),
        dataIndex: nameof(list[0].date),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].date)),
        render(date: Moment) {
          return date.format("DD/MM/YYYY");
        },
      },
      {
        title: translate("paymentRequest.paymentNumber"),
        key: nameof(list[0].paymentNumber),
        dataIndex: nameof(list[0].paymentNumber),
        sorter: true,
        sortOrder: tableService.getAntOrderType(
          filter,
          nameof(list[0].paymentNumber),
        ),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate("paymentRequest.paymentDate"),
        key: nameof(list[0].paymentDate),
        dataIndex: nameof(list[0].paymentDate),
        sorter: true,
        sortOrder: tableService.getAntOrderType(
          filter,
          nameof(list[0].paymentDate),
        ),
        render(paymentDate: Moment) {
          return paymentDate.format("DD/MM/YYYY");
        },
      },
      {
        title: translate("general.actions.action"),
        key: nameof("general.actions.action"),
        dataIndex: nameof(list[0].id),
        align: "center",
        fixed: "right",
        width: 200,
        render() {
          return (
            <div className='d-flex justify-content-center button-action-table'>
              <Tooltip title={translate("general.actions.view")}>
                <button className='btn gradient-btn-icon'>
                  <i className='tio-visible' />
                </button>
              </Tooltip>
              <Tooltip title={translate("general.actions.edit")}>
                <button className='btn gradient-btn-icon'>
                  <i className='tio-edit' />
                </button>
              </Tooltip>
              <Tooltip title={translate("general.actions.delete")}>
                <button className='btn btn-sm component__btn-delete'>
                  <i className='tio-delete' />
                </button>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    [list, filter, translate],
  );

  const handleToggleSearch = React.useCallback(() => {
    const toggleTmp = !toggle;
    setToggle(toggleTmp);
  }, [toggle, setToggle]);

  return (
    <>
      <div className='page page__master'>
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
        <div className='page__search'>
          <Card title={translate("general.search.title")}>
            <Row className='d-flex align-items-center'>
              <Col lg={12}>
                <div className='pr-4'>
                  <InputSearch />
                </div>
              </Col>
              <Col lg={4} className='pr-4'>
                {/* <div className='mt__1'>
                  <label className='label'>Phòng ban</label>
                  <AdvanceIdFilter
                    classFilter={DemoListFilter}
                    value={filter["proviceId"]["equal"]}
                    onChange={handleChangeFilter("proviceId", "equal")}
                    getList={demoSearchFunc}
                    placeHolder={"Tất cả"}
                  />
                </div> */}
              </Col>
              <Col lg={4} className='pr-4'>
                <div className='mt__1'>
                  <label className='label'>Trạng thái</label>
                  <AdvanceIdFilter
                    classFilter={ModelFilter}
                    placeHolder={"Tất cả"}
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
                    <button
                      className='btn component__btn-outline-primary'
                      // onClick={handleResetFilter}
                    >
                      ResetFilter
                    </button>
                  </div>
                </div>
              </Col>
              {/* end toggle and reset filter */}
            </Row>
            {toggle && (
              <>
                <Row className='mt-4'>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Người đề nghị</label>
                    <AdvanceIdFilter
                      classFilter={ModelFilter}
                      placeHolder={"Tất cả"}
                    />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Bên nhận</label>
                    <AdvanceIdFilter
                      classFilter={ModelFilter}
                      placeHolder={"Tất cả"}
                    />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Chi hộ</label>
                    <AdvanceIdFilter
                      classFilter={ModelFilter}
                      placeHolder={"Tất cả"}
                    />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Loại ngân sách</label>
                    <AdvanceIdFilter
                      classFilter={ModelFilter}
                      placeHolder={"Tất cả"}
                    />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Thời hạn thanh toán</label>
                    <AdvanceDateRangeFilter value={[null, null]} />
                  </Col>
                  <Col lg={4}>
                    <label className='label'>Kỳ ngân sách</label>
                    <AdvanceIdFilter
                      classFilter={ModelFilter}
                      placeHolder={"Tất cả"}
                    />
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Loại đề nghị</label>
                    <AdvanceIdFilter
                      classFilter={ModelFilter}
                      placeHolder={"Tất cả"}
                    />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Mã đề nghị</label>
                    <AdvanceStringFilter placeHolder={"Nhập mã đề nghị"} />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Mã số thuế NCC</label>
                    <AdvanceStringFilter placeHolder={"Nhập mã số thuế"} />
                  </Col>
                  <Col lg={4} className='pr-4'>
                    <label className='label'>Thời hạn thanh toán</label>
                    <AdvanceDateRangeFilter value={[null, null]} />
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </div>
        <div className='page__master-table'>
          <Card>
            <Table
              // tableLayout='fixed'
              rowKey={nameof(list[0].id)}
              columns={columns}
              dataSource={list}
              loading={loading}
              pagination={false}
              // onChange={handleChangeOrder}
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
                      {/* <Pagination
                        skip={filter.skip}
                        take={filter.take}
                        total={total}
                        onChange={handlePagination}
                        style={{ margin: "10px" }}
                      /> */}
                    </div>
                  </div>
                </>
              )}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default PaymentMasterView;
