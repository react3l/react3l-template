/* begin general import */
import React from "react";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Switch, Tabs } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import InputNumber, { DECIMAL, LONG } from "components/Utility/Input/InputNumber/InputNumber";
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { District } from 'models/District';
import { DISTRICT_MASTER_ROUTE } from 'config/route-consts'
import { districtRepository } from "repositories/district-repository";

import { Province, ProvinceFilter } from 'models/Province'

import { Status, StatusFilter } from 'models/Status'
/* end individual import */

const { TabPane } = Tabs;

function DistrictDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<District>
    (
        District,
        districtRepository.get,
        districtRepository.save,
        DISTRICT_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("districts.detail.title")}
                </div>
                {isDetail ? (
                <div className='page__id'>{`- # ${model.id}`}</div>
                ) : (
                translate("general.actions.create")
                )}
            </div>
            <div className='w-100 mt-3 page__detail-tabs'>
                <Row className='d-flex'>
                    <Col lg={18}>
                    <Card className='mr-3'>
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab={translate("general.detail.generalInfomation")}
                                     key='1'>
                                <Row>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("districts.code")}
                                                validateStatus={formService.getValidationStatus<District>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("districts.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("districts.name")}
                                                validateStatus={formService.getValidationStatus<District>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("districts.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("districts.priority")}
                                                validateStatus={formService.getValidationStatus<District>(model.errors, nameof(model.priority))}
                                                message={ model.errors?.priority }>
                                            <InputNumber isMaterial={true}
                                                            value={ model.priority }
                                                            placeHolder={translate("districts.placeholder.priority")}
                                                            onChange={handleChangeSimpleField(nameof(model.priority))}
                                                            numberType={DECIMAL} />
                                        </FormItem>
                                    </Col>
                                    







                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("districts.used")}
                                                validateStatus={formService.getValidationStatus<District>(model.errors, nameof(model.used))}
                                                message={ model.errors?.used }>
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("districts.province")}
                                                validateStatus={formService.getValidationStatus<District>(model.errors, nameof(model.province))}
                                                message={ model.errors?.province } >
                                                <Select isMaterial={true}
                                                    classFilter={ ProvinceFilter }
                                                    placeHolder={translate("districts.placeholder.province")}
                                                    getList={ districtRepository.singleListProvince }
                                                    onChange={handleChangeObjectField(nameof(model.province))}
                                                    model={ model.province } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("districts.status")}
                                                validateStatus={formService.getValidationStatus<District>(model.errors, nameof(model.status))}
                                                message={ model.errors?.status } >
                                                <Select isMaterial={true}
                                                    classFilter={ StatusFilter }
                                                    placeHolder={translate("districts.placeholder.status")}
                                                    getList={ districtRepository.singleListStatus }
                                                    onChange={handleChangeObjectField(nameof(model.status))}
                                                    model={ model.status } />
                                        </FormItem>
                                    </Col>

                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                    </Col>
                </Row>
            </div>
            <div className='w-100 mt-3 page__detail-tabs'>
                <Row className='mt-3 mb-5'>
                    <button className='btn component__btn-primary pr-4 mb-5'
                            onClick={handleSave()}>
                        {translate("districts.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default DistrictDetailView;
