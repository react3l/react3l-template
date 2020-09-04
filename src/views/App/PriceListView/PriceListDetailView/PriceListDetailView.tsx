import React from "react";
import { Col, Row, Switch, Tabs, Card } from "antd";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import { PriceList } from "models/PriceList";
import detailService from "services/pages/detail-service";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { OrganizationFilter } from "models/OrganizationFilter";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import { SalesOrderTypeFilter } from "models/PriceList/SalesOrderTypeFilter";
import nameof from "ts-nameof.macro";
import FormItem from "components/Utility/FormItem/FormItem";

const { TabPane } = Tabs;

function PriceListDetailView() {
  const [translate] = useTranslation();
  const {
    model,
    isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
  } = detailService.useDetail<PriceList>(PriceList, priceListRepository.get);
  return (
    <div className='page page__detail'>
      {/* start detail header */}
      <div className='page__header d-flex align-items-center '>
        <div className='page__title mr-1'>
          {translate("paymentRequest.detail.title")}
        </div>
        {isDetail ? (
          <div className='page__id'>{`- # ${model.id}`}</div>
        ) : (
          translate("general.actions.create")
        )}
      </div>
      {/* end detail header */}
      {/* start general information */}
      <div className='w-100 mt-3 page__detail-tabs'>
        <Row className='d-flex'>
          <Col lg={18}>
            <Card className='mr-3'>
              <Tabs defaultActiveKey='1'>
                <TabPane
                  tab={translate("general.detail.generalInfomation")}
                  key='1'
                >
                  <Row>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={translate("priceList.code")}>
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate("priceList.placeholder.code")}
                          className={"tio-account_square_outlined"}
                          onChange={handleChangeSimpleField(nameof(model.code))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={translate("priceList.name")}>
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate("priceList.placeholder.name")}
                          className={"tio-account_square_outlined"}
                          onChange={handleChangeSimpleField(nameof(model.name))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={translate("priceList.organzation")}>
                        <Select
                          classFilter={OrganizationFilter}
                          placeHolder={translate(
                            "priceList.placeholder.organzation",
                          )}
                          onChange={handleChangeObjectField(
                            nameof(model.organzation),
                          )}
                          isMaterial={true}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6}>
                      <FormItem label={translate("priceList.saleOrderType")}>
                        <Select
                          classFilter={SalesOrderTypeFilter}
                          placeHolder={translate(
                            "priceList.placeholder.saleOrderType",
                          )}
                          isMaterial={true}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={6}>
                      <FormItem label={translate("priceList.startDate")}>
                        <DatePicker
                          value={model.startDate}
                          isMaterial={true}
                          placeholder={translate(
                            "priceList.placeholder.startDate",
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6}>
                      <FormItem label={translate("priceList.endDate")}>
                        <DatePicker
                          value={model.endDate}
                          isMaterial={true}
                          placeholder={translate("priceList.placeholder.endDate")}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6}>
                      <label className='label-detail input-select__title'>
                        {translate("priceList.organzation")}
                      </label>
                      <Switch
                        size='small'
                        onChange={handleChangeSimpleField(
                          nameof(model.statusId),
                        )}
                        defaultChecked={model.statusId === 1 ? true : false}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
      {/* end general information */}
    </div>
  );
}

export default PriceListDetailView;
