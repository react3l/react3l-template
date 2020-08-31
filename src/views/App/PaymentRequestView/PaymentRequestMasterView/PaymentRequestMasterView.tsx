import Card from 'antd/lib/card';
import Table, { ColumnProps } from 'antd/lib/table';
import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { provinceRepository } from 'repositories/province-repository';
import { tableService } from 'services/TableService';
import nameof from 'ts-nameof.macro';
import classNames from 'classnames';
import './PaymentRequestMasterView.scss';
import { Row, Col, Tooltip } from 'antd';
import InputSearch from 'components/Utility/InputSearch/InputSearch';
import AdvanceIdFilter from 'components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter';
import AdvanceDateRangeFilter from 'components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter';
import { data } from './data';
import AdvanceStringFilter from 'components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter';
import Pagination from 'components/Utility/Pagination/Pagination';
import { PAYMENT_REQUEST_DETAIL_ROUTE } from 'config/route-consts';
import { routerService } from 'services/RouterService';
import { ModelFilter, Model } from 'react3l/core';
import { queryStringService } from 'services/QueryStringService';
import { IdFilter } from 'react3l-advanced-filters/IdFilter';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';
import { NumberFilter } from 'react3l-advanced-filters/NumberFilter';
import { DateFilter } from 'react3l-advanced-filters/DateFilter';

class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter()
  name: StringFilter = new StringFilter();
  number: NumberFilter = new NumberFilter();
  numberRange: NumberFilter = new NumberFilter();
  date: DateFilter = new DateFilter();
  dateRange: DateFilter = new DateFilter();
  skip: number = 0;
  take: number = 10;
}


function ProvinceMasterView() {
  const [translate] = useTranslation();
  const [filter, dispatch] = queryStringService.useQueryString<DemoFilter>(DemoFilter);
  const [
    list,
    total,
    loading,
    handleChange,
    handleChangeTable,
    handlePagination,
    handleResetFilter,
  ] = tableService.useMasterTable<Model, DemoFilter>(
    DemoFilter,
    filter,
    dispatch,
    provinceRepository.list,
    provinceRepository.count,
  );

  const [
    rowSelection,
  ] = tableService.useRowSelection<Province>();

  const [handleGoCreate] = routerService.useMasterNavigation(
    PAYMENT_REQUEST_DETAIL_ROUTE,
  );


  const [toggle, setToggle] = React.useState<boolean>(false);

  const columns: ColumnProps<Province>[] = React.useMemo(
    () => [
      {
        title: translate('paymentRequest.id'),
        key: nameof(data[0].id),
        dataIndex: nameof(data[0].id),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(data[0].id)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('paymentRequest.code'),
        key: nameof(data[0].title),
        dataIndex: nameof(data[0].title),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(data[0].title)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('paymentRequest.status'),
        key: nameof(data[0].status),
        dataIndex: nameof(data[0].status),
        align: 'center',
        render(status) {
          return (
            <div className="d-flex justify-content-center">
              {
                status?.id === 1 && (
                  <div className="shipped">Shipped</div>
                )
              }
              {
                status?.id === 2 && (
                  <div className="processing">Processing</div>
                )
              }
              {
                status?.id === 3 && (
                  <div className="cancelled">Cancelled</div>
                )
              }
            </div>
          );
        },
      },
      {
        title: translate('general.actions.action'),
        key: nameof('general.actions.action'),
        dataIndex: nameof(data[0].id),
        align: 'center',
        render() {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Tooltip title={translate('general.actions.view')}>
                <button
                  className="btn gradient-btn-icon"
                >
                  <i className="tio-visible" />
                </button>
              </Tooltip>
              <Tooltip title={translate('general.actions.edit')}>
                <button
                  className="btn gradient-btn-icon"
                >
                  <i className="tio-edit" />
                </button>
              </Tooltip>
              <Tooltip
                title={translate('general.actions.delete')}
              >
                <button
                  className="btn btn-sm component__btn-delete"
                >
                  <i className="tio-delete" />
                </button>
              </Tooltip>

            </div>
          );
        },
      },
    ],
    [filter, translate],
  );

  const handleToggleSearch = React.useCallback(() => {
    const toggleTmp = !toggle;
    setToggle(toggleTmp);
  }, [toggle, setToggle]);

  return (
    <>
      <div className="page page__master">
        <div className="page__header d-flex align-items-center justify-content-between">
          <div className="page__title">
            {translate('paymentRequest.master.title')}
          </div>
          <div className="page__actions d-flex align-items-center">
            <button
              className="btn btn-sm component__btn-primary ml-3"
              onClick={handleGoCreate}
            >
              {translate('general.actions.create')}
            </button>
          </div>
        </div>
        <div className="page__search">
          <Card title={translate('general.search.title')}>
            <Row className="d-flex align-items-center">
              <Col lg={12}>
                <div className="pr-4"><InputSearch /></div>
              </Col>
              <Col lg={12}>
                <div className="d-flex justify-content-between">
                  <div className="mt__1">
                    <label className="label">Phòng ban</label>
                    <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                  </div>
                  <div className="mt__1">
                    <label className="label">Trạng thái</label>
                    <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                  </div>
                  <div>
                    <button
                      className={classNames('btn component__btn-toggle',
                        (toggle === true ? 'component__btn-toggle-active' : ''))} onClick={handleToggleSearch}>
                      <span>
                        <div className="tio-down_ui" />
                        <div className="tio-down_ui" />
                      </span>
                    </button>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn component__btn-outline-primary">
                      <span className="border-outline">
                        {/* {translate('general.actions.reset')} */}
                        <div className="text-outline">
                          Bỏ lọc
                      </div>
                      </span>

                    </button>

                  </div>
                  <div>
                    <button className="btn component__btn-primary pr-4">
                      {/* {translate('general.actions.search')} */}
                        Tìm kiếm
                  </button>
                  </div>

                </div>
              </Col>
            </Row>
            {
              toggle && (
                <>
                  <Row className="mt-4">
                    <Col lg={4} className="pr-4">
                      <label className="label">Người đề nghị</label>
                      <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Bên nhận</label>
                      <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Chi hộ</label>
                      <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Loại ngân sách</label>
                      <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Thời hạn thanh toán</label>
                      <AdvanceDateRangeFilter value={[null, null]} />
                    </Col>
                    <Col lg={4}>
                      <label className="label">Kỳ ngân sách</label>
                      <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={4} className="pr-4">
                      <label className="label">Loại đề nghị</label>
                      <AdvanceIdFilter classFilter={ModelFilter} placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Mã đề nghị</label>
                      <AdvanceStringFilter
                        placeHolder={'Nhập mã đề nghị'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Mã số thuế NCC</label>
                      <AdvanceStringFilter
                        placeHolder={'Nhập mã số thuế'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Thời hạn thanh toán</label>
                      <AdvanceDateRangeFilter value={[null, null]} />
                    </Col>
                  </Row>
                </>
              )
            }
          </Card>
        </div>
        <div className="page__master-table">
          <Card>
            <Table
              tableLayout="fixed"
              rowKey={nameof(data[0].id)}
              columns={columns}
              dataSource={data}
              loading={loading}
              pagination={false}
              onChange={handleChangeTable}
              rowSelection={rowSelection}
              title={() => (
                <>
                  <div className="d-flex justify-content-between">
                    <div className="flex-shrink-1 d-flex align-items-center">
                      <div className="table-title ml-2">
                        {translate('province.table.title')}
                      </div>
                    </div>

                    <div className="flex-shrink-1 d-flex align-items-center">
                      <Tooltip
                        title={translate('Xóa tất cả')}
                      >
                        <button
                          className="btn component__btn-delete"
                        >
                          <i className="tio-delete" />
                        </button>
                      </Tooltip>
                      <Tooltip title={translate('Nhập excel')}>
                        <button
                          className="btn gradient-btn-icon"
                        >
                          <i className="tio-file_add_outlined " />
                        </button>
                      </Tooltip>
                      <Tooltip title={translate('Xuất excel')}>
                        <button
                          className="btn gradient-btn-icon"
                        >
                          <i className="tio-file_outlined" />
                        </button>
                      </Tooltip>
                      <Tooltip title={translate('Tải file mẫu')}>
                        <button
                          className="btn gradient-btn-icon"
                        >
                          <i className="tio-download_to" />
                        </button>
                      </Tooltip>
                      <Pagination skip={filter.skip}
                        take={filter.take}
                        style={{ margin: '10px' }} />
                    </div>
                  </div>
                </>
              )}
            />
          </Card>
        </div>
      </div>

    </>

  );
}

export default ProvinceMasterView;
