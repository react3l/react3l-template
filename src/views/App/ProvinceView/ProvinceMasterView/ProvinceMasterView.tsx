
import React from 'react';

function ProvinceMasterView() {


  return (
    <>
      {/* <div className="page page__master">
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
                      <div className="text-outline">
                        Bỏ lọc
                      </div>
                    </span>

                  </button>
                  <button className="btn btn-sm component__btn-primary pr-4">
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
        <div className="page__master-table">
          <Card>
            <Table
              tableLayout="fixed"
              rowKey={nameof(data[0].id)}
              columns={columns}
              dataSource={data}
              loading={provinceLoading}
              pagination={false}
              onChange={handleChange}
              rowSelection={rowSelection}
              title={() => (
                <div className="d-flex justify-content-start">
                  <div className="table-title ml-2">
                    {translate('province.table.title')}
                  </div>
                  <Button type="primary" onClick={handleBatchDelete}>
                    {translate('general.actions.delete')}
                  </Button>
                </div>
              )}
            />
          </Card>
        </div>
      </div> */}

    </>

  );
}

export default ProvinceMasterView;
