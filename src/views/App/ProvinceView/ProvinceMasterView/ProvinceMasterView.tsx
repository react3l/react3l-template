import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Table, { ColumnProps } from 'antd/lib/table';
import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { provinceRepository } from 'repositories/province-repository';
import { tableService } from 'services/table-service';
import nameof from 'ts-nameof.macro';
import 'views/App/ProvinceView/ProvinceMasterView/ProvinceMasterView.scss';
import { Row, Col } from 'antd';
import InputSearch from 'components/Utility/InputSearch/InputSearch';
import AdvanceIdFilter from 'components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter';
import AdvanceDateRangeFilter from 'components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter';


function ProvinceMasterView() {
  const [translate] = useTranslation();

  const [
    provinceList,
    provinceFilter,
    provinceLoading,
    pagination,
    handleChange,
  ] = tableService.useMasterTable<Province, ProvinceFilter>(
    ProvinceFilter,
    provinceRepository.list,
    provinceRepository.count,
  );

  const [
    rowSelection,
    selectedRowKeys,
  ] = tableService.useRowSelection<Province>();

  const [
    handleBatchDelete,
  ] = tableService.useBatchDelete(selectedRowKeys, provinceRepository.batchDelete);


  const [toggle, setToggle] = React.useState<boolean>(false);

  const columns: ColumnProps<Province>[] = React.useMemo(
    () => [
      {
        title: translate('province.id'),
        key: nameof(provinceList[0].id),
        dataIndex: nameof(provinceList[0].id),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].id)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('province.code'),
        key: nameof(provinceList[0].code),
        dataIndex: nameof(provinceList[0].code),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].code)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('province.name'),
        key: nameof(provinceList[0].name),
        dataIndex: nameof(provinceList[0].name),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].name)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('province.englishName'),
        key: nameof(provinceList[0].englishName),
        dataIndex: nameof(provinceList[0].englishName),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].englishName)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('general.table.actions'),
        key: tableService.getActionColumnName(Province),
        dataIndex: nameof(provinceList[0].id),
        render(id: number) {
          return (
            <>
              <Button type="link">
                {translate('general.actions.view')}
              </Button>
              <Button type="link">
                {translate('general.actions.edit')}
              </Button>
              <Button type="link">
                {translate('general.actions.delete')}
              </Button>
            </>
          );
        },
      },
    ],
    [provinceFilter, provinceList, translate],
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
            {translate('province.master.title')}
          </div>
          <div className="page__actions d-flex align-items-center">
            <button
              className="btn btn-sm component__btn-primary ml-3"
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
                <div className="d-flex">
                  <div className="pr-4 mt__1">
                    <label className="label">Phòng ban</label>
                    <AdvanceIdFilter placeHolder={'Tất cả'} />
                  </div>
                  <div className="pr-4 mt__1">
                    <label className="label">Trạng thái</label>
                    <AdvanceIdFilter placeHolder={'Tất cả'} />
                  </div>
                  <div>
                    <button className="btn btn-sm component__btn-toggle mr-4" onClick={handleToggleSearch}>
                      <div className="tio-down_ui" />
                      <div className="tio-down_ui" />
                    </button>

                  </div>
                  <button className="btn btn-sm component__btn-outline-primary">
                    <span className="border-outline">
                      {/* {translate('general.actions.reset')} */}
                      <div className="text-outline">
                        Bỏ lọc
                      </div>
                    </span>

                  </button>
                  <button className="btn btn-sm component__btn-primary pr-4">
                    {/* {translate('general.actions.search')} */}
                        Tìm kiếm
                  </button>
                </div>
              </Col>
            </Row>
            {
              toggle && (
                <>
                  <Row className="mt-4">
                    <Col lg={4} className="pr-4">
                      <label className="label">Người đề nghị</label>
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Bên nhận</label>
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Chi hộ</label>
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Loại ngân sách</label>
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <label className="label">Thời hạn thanh toán</label>
                      <AdvanceDateRangeFilter value={[null, null]} />
                    </Col>
                    <Col lg={4}>
                      <label className="label">Kỳ ngân sách</label>
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={4} className="pr-4">
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4} className="pr-4">
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                    <Col lg={4}>
                      <AdvanceIdFilter placeHolder={'Tất cả'} />
                    </Col>
                  </Row>
                </>
              )
            }
          </Card>
        </div>
      </div>
      <Card >
        <Table
          tableLayout="fixed"
          bordered={true}
          rowKey={nameof(provinceList[0].id)}
          columns={columns}
          dataSource={provinceList}
          loading={provinceLoading}
          pagination={pagination}
          onChange={handleChange}
          rowSelection={rowSelection}
          title={() => (
            <div className="d-flex justify-content-start">
              <Link to="/province/province-detail">
                <Button type="primary" className="mr-2">
                  {translate('general.actions.create')}
                </Button>
              </Link>
              <Button type="primary" onClick={handleBatchDelete}>
                {translate('general.actions.delete')}
              </Button>
            </div>
          )}
        />
      </Card>
      <Card >
        <Table
          tableLayout="fixed"
          bordered={true}
          rowKey={nameof(provinceList[0].id)}
          columns={columns}
          dataSource={provinceList}
          loading={provinceLoading}
          pagination={pagination}
          onChange={handleChange}
          rowSelection={rowSelection}
          title={() => (
            <div className="d-flex justify-content-start">
              <Link to="/province/province-detail">
                <Button type="primary" className="mr-2">
                  {translate('general.actions.create')}
                </Button>
              </Link>
              <Button type="primary" onClick={handleBatchDelete}>
                {translate('general.actions.delete')}
              </Button>
            </div>
          )}
        />
      </Card>
      <Card >
        <Table
          tableLayout="fixed"
          bordered={true}
          rowKey={nameof(provinceList[0].id)}
          columns={columns}
          dataSource={provinceList}
          loading={provinceLoading}
          pagination={pagination}
          onChange={handleChange}
          rowSelection={rowSelection}
          title={() => (
            <div className="d-flex justify-content-start">
              <Link to="/province/province-detail">
                <Button type="primary" className="mr-2">
                  {translate('general.actions.create')}
                </Button>
              </Link>
              <Button type="primary" onClick={handleBatchDelete}>
                {translate('general.actions.delete')}
              </Button>
            </div>
          )}
        />
      </Card>
    </>

  );
}

export default ProvinceMasterView;
