import Card from "antd/lib/card";
import React from "react";
import { useTranslation } from "react-i18next";
// import { useParams } from "react-router";
import { Row, Col, Tabs } from "antd";
import InputText from "components/Utility/Input/InputText/InputText";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import Select from "components/Utility/Select/Select";

const { TabPane } = Tabs;

function PaymentRequestDetailView() {
  // const { id } = useParams();

  const [translate] = useTranslation();

  // const [
  //   province,
  //   handleChangeSimpleField,
  //   handleChangeObjectField,
  // ] = formService.useDetailForm<Province>(
  //   Province,
  //   parseInt(id),
  //   provinceRepository.get
  // );

  // const [administrativeTypeList] = enumService.useEnumList<AdministrativeType>(
  //   administrativeTypeRepository.list
  // );

  // const handleChangeCode = formService.useChangeHandler<Province>(
  //   handleChangeSimpleField,
  //   "code"
  // );

  // const handleChangeName = formService.useChangeHandler<Province>(
  //   handleChangeSimpleField,
  //   "name"
  // );

  // const handleChangeEnglishName = formService.useChangeHandler<Province>(
  //   handleChangeSimpleField,
  //   "englishName"
  // );

  // const handleChangeAdministrativeType = formService.useChangeHandler<Province>(
  //   handleChangeObjectField,
  //   "administrativeType"
  // );

  return (
    <>
      <div className="page page__detail">
        <div className="page__header d-flex align-items-center ">
          <div className="page__title mr-1">
            {translate("paymentRequest.detail.title")}
          </div>
          {/* {
          id && ( */}
          <div className="page__id">- # 1077620</div>
          {/* )
        } */}
        </div>

        <div className="w-100 mt-3">
          <Row className="d-flex">
            <Col lg={18}>
              <Card className="mr-3">
                <Tabs defaultActiveKey="2">
                  <TabPane tab={translate("Thông tin chung")} key="1">
                    <Row>
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Người đề nghị"}
                          placeHolder={"Enter text..."}
                          className={"tio-account_square_outlined"}
                        />
                      </Col>
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Hình thức thanh toán  "}
                          placeHolder={"Enter text..."}
                          className={"tio-credit_cards"}
                        />
                      </Col>
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Bên nhận"}
                          placeHolder={"Enter text..."}
                          className={"tio-group_add"}
                        />
                      </Col>
                      <Col lg={6}>
                        <label className="label-detail">
                          {translate('Ngày gửi đề nghị')}
                        </label>
                        <DatePicker isMaterial={true} />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Kỳ ngân sách"}
                          placeHolder={"Enter text..."}
                          className={"tio-event"}
                        />
                      </Col>
                      <Col lg={6} className="pr-3">
                        <label className="label-detail">
                          {translate('Ngày gửi đề nghị')}
                        </label>
                        <Select placeHolder={'Chọn đơn vị'}
                          isMaterial={true} />
                      </Col>
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"CC Email"}
                          placeHolder={"Enter text..."}
                          className={"tio-email_outlined"}
                        />
                      </Col>
                      <Col lg={6}>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Thời hạnt thanh toán"}
                          placeHolder={"Enter text..."}
                          className={"tio-date_range"}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={24}>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Diễn giải chi tiết"}
                          placeHolder={"Nhập diễn giải chi tiết"}
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
                <Col lg={6}>
                </Col>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="w-100 mt-3">
          <Row className="d-flex">
            <Col lg={18}>
              <Card className="mr-3">
                <Tabs defaultActiveKey="1">
                  <TabPane tab={translate("Thông tin hóa đơn")} key="1">
                    <Row>
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Kỳ ngân sách"}
                          placeHolder={"Enter text..."}
                          className={"tio-event"}
                        />
                      </Col>
                      <Col lg={6} className="pr-3">
                        <Select placeHolder={'Select Organization'}
                          isMaterial={true} />
                      </Col>
                      <Col lg={6} className="pr-3">
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Người đề nghị"}
                          placeHolder={"Enter text..."}
                          className={"tio-account_square_outlined"}
                        />
                      </Col>
                      <Col lg={6}>
                        <InputText
                          isMaterial={true}
                          value={null}
                          title={"Người đề nghị"}
                          placeHolder={"Enter text..."}
                          className={"tio-account_square_outlined"}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Col lg={6}>
                </Col>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default PaymentRequestDetailView;
