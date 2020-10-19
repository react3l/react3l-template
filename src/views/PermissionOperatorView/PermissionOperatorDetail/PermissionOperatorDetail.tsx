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
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { PermissionOperator } from 'models/PermissionOperator';
import { PERMISSION_OPERATOR_MASTER_ROUTE } from 'config/route-consts'
import { permissionOperatorRepository } from "repositories/permission-operator-repository";

import { FieldType, FieldTypeFilter } from 'models/FieldType'
/* end individual import */

const { TabPane } = Tabs;

function PermissionOperatorDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<PermissionOperator>
    (
        PermissionOperator,
        permissionOperatorRepository.get,
        permissionOperatorRepository.save,
        PERMISSION_OPERATOR_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("permissionOperators.detail.title")}
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
                                        <FormItem label={translate("permissionOperators.code")}
                                                validateStatus={formService.getValidationStatus<PermissionOperator>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("permissionOperators.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissionOperators.name")}
                                                validateStatus={formService.getValidationStatus<PermissionOperator>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("permissionOperators.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    


                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissionOperators.fieldType")}
                                                validateStatus={formService.getValidationStatus<PermissionOperator>(model.errors, nameof(model.fieldType))}
                                                message={ model.errors?.fieldType } >
                                                <Select isMaterial={true}
                                                    classFilter={ FieldTypeFilter }
                                                    placeHolder={translate("permissionOperators.placeholder.fieldType")}
                                                    getList={ permissionOperatorRepository.singleListFieldType }
                                                    onChange={handleChangeObjectField(nameof(model.fieldType))}
                                                    model={ model.fieldType } />
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
                        {translate("permissionOperators.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default PermissionOperatorDetailView;
