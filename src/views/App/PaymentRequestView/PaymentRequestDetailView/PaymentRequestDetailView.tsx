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
import FormItem from "components/Utility/FormItem/FormItem";

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
                        <FormItem label={"Người đề nghị"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Chọn người đề nghị"}
                            className={"tio-account_square_outlined"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"Người nhận"}>
                          <InputText
                              isMaterial={true}
                              value={null}
                              placeHolder={"Chọn người nhận hàng"}
                              className={"tio-user_switch"}
                            />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"Địa chỉ nhận hàng"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập địa chỉ"}
                            className={"tio-group_add"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6}>
                        <FormItem label={translate("Ngày gửi đề nghị")}>
                          <DatePicker isMaterial={true} />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"Đơn vị chịu phí"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập thông tin"}
                            className={"tio-event"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={translate("Đơn vị yêu cầu")}>
                          <Select
                            classFilter={ModelFilter}
                            placeHolder={"Chọn đơn vị"}
                            isMaterial={true}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"CC Email"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập thông tin"}
                            className={"tio-email_outlined"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6}>
                        <FormItem label={translate("Thời hạn thanh toán")}>
                          <DatePicker
                            isMaterial={true}
                            placeholder={"Chọn thời hạn"}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={24}>
                        <FormItem label={"Diễn giải mục đích mua"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập diễn giải chi tiết mục đích mua"}
                            className={"tio-comment_text_outlined"}
                          />
                        </FormItem>
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
                        <FormItem label={translate("Loại chứng từ")}>
                          <Select
                            classFilter={ModelFilter}
                            placeHolder={"Chọn loại chứng từ"}
                            isMaterial={true}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"Ký hiệu hóa đơn"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập ký hiệu hóa đơn"}
                            className={"tio-files_labeled_outlined"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={translate("Loại tiền")}>
                          <Select
                            classFilter={ModelFilter}
                            placeHolder={"Chọn loại tiền"}
                            isMaterial={true}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6}>
                        <FormItem label={translate("Nhà cung cấp")}>
                          <Select
                            classFilter={ModelFilter}
                            placeHolder={"Chọn nhà cung cấp"}
                            isMaterial={true}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={translate("Ngày chứng từ")}>
                          <DatePicker
                            isMaterial={true}
                            placeholder={"Chọn ngày chứng từ"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"Số hóa đơn"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập số hóa đơn"}
                            className={"tio-files_labeled_outlined"}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={6} className='pr-3'>
                        <FormItem label={"Tỷ giá"}>
                          <InputText
                            isMaterial={true}
                            value={null}
                            placeHolder={"Nhập tỷ giá"}
                            className={"tio-justice"}
                          />
                        </FormItem>
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
                      <FormItem label={"Diễn giải chi tiết"}>
                        <InputText
                          isMaterial={true}
                          value={null}
                          placeHolder={"Nhập diễn giải chi tiết"}
                          className={"tio-files_labeled_outlined"}
                        />
                        </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={"Thành tiền"}>
                        <InputNumber
                          className={""}
                          isMaterial={true}
                          numberType={DECIMAL}
                          allowPositive={true}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={translate("Đơn vị")}>
                        <Select
                          classFilter={ModelFilter}
                          placeHolder={"Chọn đơn vị"}
                          isMaterial={true}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={"Số lượng"}>
                        <InputNumber
                          className={""}
                          isMaterial={true}
                          numberType={DECIMAL}
                          allowPositive={true}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={"Đơn giá"}>
                        <InputNumber
                          className={""}
                          isMaterial={true}
                          numberType={DECIMAL}
                          allowPositive={true}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={"Thuế"}>
                        <InputNumber
                          className={""}
                          isMaterial={true}
                          numberType={DECIMAL}
                          allowPositive={true}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={18} className='pr-3'>
                      <FormItem label={translate("Đơn vị")}>
                        <Select
                          classFilter={ModelFilter}
                          placeHolder={"Chọn đơn vị"}
                          isMaterial={true}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={"Tổng tiền"}>
                        <InputNumber
                          className={""}
                          isMaterial={true}
                          numberType={DECIMAL}
                          allowPositive={true}
                        />
                      </FormItem>
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
