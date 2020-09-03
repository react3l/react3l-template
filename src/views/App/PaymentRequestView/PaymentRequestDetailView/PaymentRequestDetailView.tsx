import { Col, Row, Switch, Tabs } from "antd";
import Card from "antd/lib/card";
import { DECIMAL } from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { formatNumber } from "helpers/number";
import React from "react";
import { useTranslation } from "react-i18next";
import { ModelFilter } from "react3l/core";

const { TabPane } = Tabs;

function PaymentRequestDetailView() {
  const [translate] = useTranslation();

  return (
    <>
      <div className='page page__detail'>
        <div className='page__header d-flex align-items-center '>
          <div className='page__title mr-1'>
            {translate("paymentRequest.detail.title")}
          </div>
          {/* {
          id && ( */}
          <div className='page__id'>- # 1077620</div>
          {/* )
        } */}
        </div>

        <div className='w-100 mt-3 page__detail-tabs'>
          <Row className='d-flex'>
            <Col lg={18}>
              <Card className='mr-3'>
                <Tabs defaultActiveKey='2'>
                  <TabPane tab={translate("Thông tin chung")} key='1'>
                    <Row>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Người đề nghị"}
                          placeHolder={"Chọn người đề nghị"}
                          className={"tio-account_square_outlined"}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Người nhận "}
                          placeHolder={"Chọn người nhận hàng"}
                          className={"tio-user_switch"}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Địa chỉ nhận hàng"}
                          placeHolder={"Nhập địa chỉ"}
                          className={"tio-group_add"}
                        />
                      </Col>
                      <Col lg={6}>
                        <label className='label-detail'>
                          {translate("Ngày gửi đề nghị")}
                        </label>
                        <DatePicker isMaterial={true} />
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Đơn vị chịu phí"}
                          placeHolder={"Nhập thông tin"}
                          className={"tio-event"}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <label className='label-detail'>
                          {translate("Đơn vị yêu cầu")}
                        </label>
                        <Select
                          classFilter={ModelFilter}
                          placeHolder={"Chọn đơn vị"}
                          isMaterial={true}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"CC Email"}
                          placeHolder={"Nhập thông tin"}
                          className={"tio-email_outlined"}
                        />
                      </Col>
                      <Col lg={6}>
                        <label className='label-detail'>
                          {translate("Thời hạn thanh toán")}
                        </label>
                        <DatePicker
                          isMaterial={true}
                          placeholder={"Chọn thời hạn"}
                        />
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={24}>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Diễn giải mục đích mua"}
                          placeHolder={"Nhập diễn giải chi tiết mục đích mua"}
                          className={"tio-comment_text_outlined"}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Col lg={6}></Col>
              </Card>
            </Col>
          </Row>
        </div>
        <div className='w-100 mt-3 page__detail-tabs'>
          <Row className='d-flex'>
            <Col lg={18}>
              <Card className='mr-3'>
                <Tabs defaultActiveKey='1'>
                  <TabPane tab={translate("Thông tin hóa đơn")} key='1'>
                    <Row>
                      <Col lg={6} className='pr-3'>
                        <label className='label-detail'>
                          {translate("Loại chứng từ")}
                        </label>
                        <Select
                          classFilter={ModelFilter}
                          placeHolder={"Chọn loại chứng từ"}
                          isMaterial={true}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Ký hiệu hóa đơn"}
                          placeHolder={"Nhập ký hiệu hóa đơn"}
                          className={"tio-files_labeled_outlined"}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <label className='label-detail'>
                          {translate("Loại tiền")}
                        </label>
                        <Select
                          classFilter={ModelFilter}
                          placeHolder={"Chọn loại tiền"}
                          isMaterial={true}
                        />
                      </Col>
                      <Col lg={6}>
                        <label className='label-detail'>
                          {translate("Nhà cung cấp")}
                        </label>
                        <Select
                          classFilter={ModelFilter}
                          placeHolder={"Chọn nhà cung cấp"}
                          isMaterial={true}
                        />
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={6} className='pr-3'>
                        <label className='label-detail'>
                          {translate("Ngày chứng từ")}
                        </label>
                        <DatePicker
                          isMaterial={true}
                          placeholder={"Chọn ngày chứng từ"}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Số hóa đơn"}
                          placeHolder={"Nhập số hóa đơn"}
                          className={"tio-files_labeled_outlined"}
                        />
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Tỷ giá"}
                          placeHolder={"Nhập tỷ giá"}
                          className={"tio-justice"}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
                <div className='page__detail-invoice mt-4'>
                  <div className='page__detail-invoice-header d-flex justify-content-between align-items-center'>
                    <div className='invoice__row'>Dòng</div>
                    <div className='d-flex align-items-center'>
                      <button className='btn component__btn-delete'>
                        <i className='tio-delete' />
                      </button>
                      <span className='invoice__delete text-uppercase'>
                        Xóa
                      </span>
                    </div>
                  </div>
                  <Row className='mt-3'>
                    <Col lg={6} className='pr-3'>
                      <label className='label-detail'>
                        {translate("Đơn vị")}
                      </label>
                      <Select
                        classFilter={ModelFilter}
                        placeHolder={"Chọn đơn vị"}
                        isMaterial={true}
                      />
                    </Col>
                    <Col lg={12} className='pr-3'>
                      <InputText
                        isMaterial={true}
                        value={null}
                        title={"Diễn giải chi tiết"}
                        placeHolder={"Nhập diễn giải chi tiết"}
                        className={"tio-files_labeled_outlined"}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <InputNumber
                        title={"Thành tiền"}
                        className={""}
                        isMaterial={true}
                        numberType={DECIMAL}
                        allowPositive={true}
                      />
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={6} className='pr-3'>
                      <label className='label-detail'>
                        {translate("Đơn vị")}
                      </label>
                      <Select
                        classFilter={ModelFilter}
                        placeHolder={"Chọn đơn vị"}
                        isMaterial={true}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <InputNumber
                        title={"Số lượng"}
                        className={""}
                        isMaterial={true}
                        numberType={DECIMAL}
                        allowPositive={true}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <InputNumber
                        title={"Đơn giá"}
                        className={""}
                        isMaterial={true}
                        numberType={DECIMAL}
                        allowPositive={true}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <InputNumber
                        title={"Thuế"}
                        className={""}
                        isMaterial={true}
                        numberType={DECIMAL}
                        allowPositive={true}
                      />
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={18} className='pr-3'>
                      <label className='label-detail'>
                        {translate("Đơn vị")}
                      </label>
                      <Select
                        classFilter={ModelFilter}
                        placeHolder={"Chọn đơn vị"}
                        isMaterial={true}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <InputNumber
                        title={"Tổng tiền"}
                        className={""}
                        isMaterial={true}
                        numberType={DECIMAL}
                        allowPositive={true}
                      />
                    </Col>
                  </Row>
                </div>
                <Row className='mt-3'>
                  <Col lg={12}>
                    <div className='invoice__add-row d-flex align-items-center'>
                      <img src='/assets/svg/plus.svg' alt='' />
                      <div className='invoice__add-row-text ml-2'>
                        Thêm dòng
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} className='mt-3'>
                    <div className='d-flex align-items-center'>
                      <Switch size='small' defaultChecked />
                      <span className='ml-3'>Chi hộ</span>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className='page__detail-total'>
                      <div className='d-flex justify-content-between mb-4'>
                        <div>Thành tiền</div>
                        <div>$456</div>
                      </div>
                      <div className='d-flex justify-content-between mb-4'>
                        <div>Thuế</div>
                        <div>$456</div>
                      </div>
                      <div className='page__detail-text-total d-flex justify-content-between'>
                        <div>Tổng tiền</div>
                        <div>$912</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className='page__detail-card-right'>
                <div className='d-flex justify-content-between mb-3'>
                  <div>Thành tiền</div>
                  <div>{formatNumber(100000)}</div>
                </div>
                <div className='page__detail-text-total d-flex justify-content-between mb-3'>
                  <div>Tổng tiền</div>
                  <div>{formatNumber(0)}</div>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <div>Đã tạm ứng</div>
                  <div>{formatNumber(0)}</div>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <div>Hoàn ứng</div>
                  <div>{formatNumber(0)}</div>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <div>Chi thêm</div>
                  <div>{formatNumber(0)}</div>
                </div>
                <div className='d-flex justify-content-between mb-3 '>
                  <div className='invoice__delete'>Nộp lại</div>
                  <div className='invoice__delete'>{formatNumber(0)}</div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row className='mt-3 mb-5'>
            <button className='btn component__btn-primary pr-4 mb-5'>
              {/* {translate('general.actions.search')} */}
              Thêm hóa đơn
            </button>
          </Row>
        </div>
      </div>
    </>
  );
}

export default PaymentRequestDetailView;
