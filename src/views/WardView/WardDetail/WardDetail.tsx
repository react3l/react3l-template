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
import { Ward } from 'models/Ward';
import { WARD_MASTER_ROUTE } from 'config/route-consts'
import { wardRepository } from "repositories/ward-repository";

import { District, DistrictFilter } from 'models/District'

import { Status, StatusFilter } from 'models/Status'
/* end individual import */

const { TabPane } = Tabs;

function WardDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<Ward>
    (
        Ward,
        wardRepository.get,
        wardRepository.save,
        WARD_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("wards.detail.title")}
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
                                        <FormItem label={translate("wards.code")}
                                                validateStatus={formService.getValidationStatus<Ward>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("wards.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("wards.name")}
                                                validateStatus={formService.getValidationStatus<Ward>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("wards.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("wards.priority")}
                                                validateStatus={formService.getValidationStatus<Ward>(model.errors, nameof(model.priority))}
                                                message={ model.errors?.priority }>
                                            <InputNumber isMaterial={true}
                                                            value={ model.priority }
                                                            placeHolder={translate("wards.placeholder.priority")}
                                                            onChange={handleChangeSimpleField(nameof(model.priority))}
                                                            numberType={DECIMAL} />
                                        </FormItem>
                                    </Col>
                                    







                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("wards.used")}
                                                validateStatus={formService.getValidationStatus<Ward>(model.errors, nameof(model.used))}
                                                message={ model.errors?.used }>
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("wards.district")}
                                                validateStatus={formService.getValidationStatus<Ward>(model.errors, nameof(model.district))}
                                                message={ model.errors?.district } >
                                                <Select isMaterial={true}
                                                    classFilter={ DistrictFilter }
                                                    placeHolder={translate("wards.placeholder.district")}
                                                    getList={ wardRepository.singleListDistrict }
                                                    onChange={handleChangeObjectField(nameof(model.district))}
                                                    model={ model.district } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("wards.status")}
                                                validateStatus={formService.getValidationStatus<Ward>(model.errors, nameof(model.status))}
                                                message={ model.errors?.status } >
                                                <Select isMaterial={true}
                                                    classFilter={ StatusFilter }
                                                    placeHolder={translate("wards.placeholder.status")}
                                                    getList={ wardRepository.singleListStatus }
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
                        {translate("wards.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default WardDetailView;
