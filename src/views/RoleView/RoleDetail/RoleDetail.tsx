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
import { Role } from 'models/Role';
import { ROLE_MASTER_ROUTE } from 'config/route-consts'
import { roleRepository } from "repositories/role-repository";

import { Status, StatusFilter } from 'models/Status'
import { usePermissionTable } from "./PermissionHook";
/* end individual import */

const { TabPane } = Tabs;

function RoleDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<Role>
    (
        Role,
        roleRepository.get,
        roleRepository.save,
        ROLE_MASTER_ROUTE
    );
    
    const {
        permissionFilter,
        permissionContents,
        setPermissionContents,
        permissionContentColumns,
        permissionList,
        loadPermissionList,
        permissionTotal,
        handleAddPermission,
        handlePermissionTableChange,
        handlePermissionPagination,
        permissionRowSelection,
        canBulkDeletePermission,
        handleLocalBulkDeletePermission,
        permissionRef,
        handleClickPermission,
        handleImportPermission,
        handleExportPermission,
        handleExportTemplatePermission,
    } = usePermissionTable(model, handleUpdateNewModel);
    

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("roles.detail.title")}
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
                                        <FormItem label={translate("roles.code")}
                                                validateStatus={formService.getValidationStatus<Role>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("roles.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("roles.name")}
                                                validateStatus={formService.getValidationStatus<Role>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("roles.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    


                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("roles.used")}
                                                validateStatus={formService.getValidationStatus<Role>(model.errors, nameof(model.used))}
                                                message={ model.errors?.used }>
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("roles.status")}
                                                validateStatus={formService.getValidationStatus<Role>(model.errors, nameof(model.status))}
                                                message={ model.errors?.status } >
                                                <Select isMaterial={true}
                                                    classFilter={ StatusFilter }
                                                    placeHolder={translate("roles.placeholder.status")}
                                                    getList={ roleRepository.singleListStatus }
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
                <Row className='d-flex'>
                    <Col lg={18}>
                        <Card className='mr-3'>
                            <Tabs defaultActiveKey='1'>
                                
                                <TabPane tab={translate("roles.permissions")}
                                         key='1'>
                                    <Row>
                                        <ContentTable model={model}
                                                      filter={ permissionFilter }
                                                      list={ permissionList }
                                                      loadingList={loadPermissionList}
                                                      total={ permissionTotal }
                                                      handleTableChange={handlePermissionTableChange}
                                                      rowSelection={ permissionRowSelection }
                                                      handleLocalBulkDelete={ handleLocalBulkDeletePermission }
                                                      canBulkDelete={ canBulkDeletePermission }
                                                      handleExportContent={ handleExportPermission }
                                                      handleExportTemplateContent={ handleExportTemplatePermission }
                                                      handlePagination={ handlePermissionPagination }
                                                      handleAddContent={ handleAddPermission }
                                                      ref={ permissionRef }
                                                      handleClick={ handleClickPermission }
                                                      handleImportContentList={ handleImportPermission }
                                                      columns={ permissionContentColumns }
                                                      hasAddContentInline={true}
                                                      />
                                    </Row>
                                </TabPane>
                                
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-3 mb-5'>
                    <button className='btn component__btn-primary pr-4 mb-5'
                            onClick={handleSave()}>
                        {translate("roles.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default RoleDetailView;
