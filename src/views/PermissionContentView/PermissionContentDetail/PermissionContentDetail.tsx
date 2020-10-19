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
import { PermissionContent } from 'models/PermissionContent';
import { PERMISSION_CONTENT_MASTER_ROUTE } from 'config/route-consts'
import { permissionContentRepository } from "repositories/permission-content-repository";

import { Field, FieldFilter } from 'models/Field'

import { Permission, PermissionFilter } from 'models/Permission'

import { PermissionOperator, PermissionOperatorFilter } from 'models/PermissionOperator'
/* end individual import */

const { TabPane } = Tabs;

function PermissionContentDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<PermissionContent>
    (
        PermissionContent,
        permissionContentRepository.get,
        permissionContentRepository.save,
        PERMISSION_CONTENT_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("permissionContents.detail.title")}
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
                                        <FormItem label={translate("permissionContents.value")}
                                                validateStatus={formService.getValidationStatus<PermissionContent>(model.errors, nameof(model.value))}
                                                message={ model.errors?.value }>
                                            <InputText isMaterial={true}
                                                        value={ model.value }
                                                        placeHolder={translate("permissionContents.placeholder.value")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.value))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissionContents.field")}
                                                validateStatus={formService.getValidationStatus<PermissionContent>(model.errors, nameof(model.field))}
                                                message={ model.errors?.field } >
                                                <Select isMaterial={true}
                                                    classFilter={ FieldFilter }
                                                    placeHolder={translate("permissionContents.placeholder.field")}
                                                    getList={ permissionContentRepository.singleListField }
                                                    onChange={handleChangeObjectField(nameof(model.field))}
                                                    model={ model.field } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissionContents.permission")}
                                                validateStatus={formService.getValidationStatus<PermissionContent>(model.errors, nameof(model.permission))}
                                                message={ model.errors?.permission } >
                                                <Select isMaterial={true}
                                                    classFilter={ PermissionFilter }
                                                    placeHolder={translate("permissionContents.placeholder.permission")}
                                                    getList={ permissionContentRepository.singleListPermission }
                                                    onChange={handleChangeObjectField(nameof(model.permission))}
                                                    model={ model.permission } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("permissionContents.permissionOperator")}
                                                validateStatus={formService.getValidationStatus<PermissionContent>(model.errors, nameof(model.permissionOperator))}
                                                message={ model.errors?.permissionOperator } >
                                                <Select isMaterial={true}
                                                    classFilter={ PermissionOperatorFilter }
                                                    placeHolder={translate("permissionContents.placeholder.permissionOperator")}
                                                    getList={ permissionContentRepository.singleListPermissionOperator }
                                                    onChange={handleChangeObjectField(nameof(model.permissionOperator))}
                                                    model={ model.permissionOperator } />
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
                        {translate("permissionContents.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default PermissionContentDetailView;
