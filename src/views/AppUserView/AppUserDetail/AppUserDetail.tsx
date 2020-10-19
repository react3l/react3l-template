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
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { AppUser } from 'models/AppUser';
import { APP_USER_MASTER_ROUTE } from 'config/route-consts'
import { appUserRepository } from "repositories/app-user-repository";

import { Organization, OrganizationFilter } from 'models/Organization'

import { Position, PositionFilter } from 'models/Position'

import { Province, ProvinceFilter } from 'models/Province'

import { Sex, SexFilter } from 'models/Sex'

import { Status, StatusFilter } from 'models/Status'
import { useAppUserRoleMappingTable } from "./AppUserRoleMappingHook";
import { appUserRoleMappingContentMapper, useAppUserRoleMappingModal } from "./AppUserRoleMappingHook";
/* end individual import */

const { TabPane } = Tabs;

function AppUserDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<AppUser>
    (
        AppUser,
        appUserRepository.get,
        appUserRepository.save,
        APP_USER_MASTER_ROUTE
    );
    
    const {
        appUserRoleMappingFilter,
        appUserRoleMappingContents,
        setAppUserRoleMappingContents,
        appUserRoleMappingContentColumns,
        appUserRoleMappingList,
        loadAppUserRoleMappingList,
        appUserRoleMappingTotal,
        handleAddAppUserRoleMapping,
        handleAppUserRoleMappingTableChange,
        handleAppUserRoleMappingPagination,
        appUserRoleMappingRowSelection,
        canBulkDeleteAppUserRoleMapping,
        handleLocalBulkDeleteAppUserRoleMapping,
        appUserRoleMappingRef,
        handleClickAppUserRoleMapping,
        handleImportAppUserRoleMapping,
        handleExportAppUserRoleMapping,
        handleExportTemplateAppUserRoleMapping,
    } = useAppUserRoleMappingTable(model, handleUpdateNewModel);
    const {
        visibleRole,
        roleFilter,
        handleUpdateNewRoleFilter,
        handleSearchRole,
        handleResetRoleFilter,
        loadRoleList,
        setLoadRoleList,
        roleModalFilters,
        handleOpenRoleModal,
        handleCloseRoleModal,
        handleSaveRoleModal,
        selectedRoleList,
        roleColumns,
    } = useAppUserRoleMappingModal(appUserRoleMappingContents);
    

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("appUsers.detail.title")}
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
                                        <FormItem label={translate("appUsers.username")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.username))}
                                                message={ model.errors?.username }>
                                            <InputText isMaterial={true}
                                                        value={ model.username }
                                                        placeHolder={translate("appUsers.placeholder.username")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.username))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.password")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.password))}
                                                message={ model.errors?.password }>
                                            <InputText isMaterial={true}
                                                        value={ model.password }
                                                        placeHolder={translate("appUsers.placeholder.password")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.password))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.otpCode")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.otpCode))}
                                                message={ model.errors?.otpCode }>
                                            <InputText isMaterial={true}
                                                        value={ model.otpCode }
                                                        placeHolder={translate("appUsers.placeholder.otpCode")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.otpCode))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.otpExpired")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.otpExpired))}
                                                message={ model.errors?.otpExpired }>
                                            <DatePicker isMaterial={true}
                                                        value={ model.otpExpired }
                                                        placeholder={translate("appUsers.placeholder.otpExpired")}
                                                        onChange={handleChangeSimpleField(nameof(model.otpExpired))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.displayName")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.displayName))}
                                                message={ model.errors?.displayName }>
                                            <InputText isMaterial={true}
                                                        value={ model.displayName }
                                                        placeHolder={translate("appUsers.placeholder.displayName")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.displayName))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.address")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.address))}
                                                message={ model.errors?.address }>
                                            <InputText isMaterial={true}
                                                        value={ model.address }
                                                        placeHolder={translate("appUsers.placeholder.address")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.address))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.email")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.email))}
                                                message={ model.errors?.email }>
                                            <InputText isMaterial={true}
                                                        value={ model.email }
                                                        placeHolder={translate("appUsers.placeholder.email")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.email))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.phone")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.phone))}
                                                message={ model.errors?.phone }>
                                            <InputText isMaterial={true}
                                                        value={ model.phone }
                                                        placeHolder={translate("appUsers.placeholder.phone")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.phone))} />
                                        </FormItem>
                                    </Col>
                                    



                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.department")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.department))}
                                                message={ model.errors?.department }>
                                            <InputText isMaterial={true}
                                                        value={ model.department }
                                                        placeHolder={translate("appUsers.placeholder.department")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.department))} />
                                        </FormItem>
                                    </Col>
                                    







                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.avatar")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.avatar))}
                                                message={ model.errors?.avatar }>
                                            <InputText isMaterial={true}
                                                        value={ model.avatar }
                                                        placeHolder={translate("appUsers.placeholder.avatar")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.avatar))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.birthday")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.birthday))}
                                                message={ model.errors?.birthday }>
                                            <DatePicker isMaterial={true}
                                                        value={ model.birthday }
                                                        placeholder={translate("appUsers.placeholder.birthday")}
                                                        onChange={handleChangeSimpleField(nameof(model.birthday))} />
                                        </FormItem>
                                    </Col>
                                    


                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.used")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.used))}
                                                message={ model.errors?.used }>
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.longitude")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.longitude))}
                                                message={ model.errors?.longitude }>
                                            <InputNumber isMaterial={true}
                                                            value={ model.longitude }
                                                            placeHolder={translate("appUsers.placeholder.longitude")}
                                                            onChange={handleChangeSimpleField(nameof(model.longitude))}
                                                            numberType={DECIMAL} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.latitude")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.latitude))}
                                                message={ model.errors?.latitude }>
                                            <InputNumber isMaterial={true}
                                                            value={ model.latitude }
                                                            placeHolder={translate("appUsers.placeholder.latitude")}
                                                            onChange={handleChangeSimpleField(nameof(model.latitude))}
                                                            numberType={DECIMAL} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.organization")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.organization))}
                                                message={ model.errors?.organization } >
                                                <TreeSelect isMaterial={true}
                                                        placeHolder={translate("appUsers.placeholder.organization")}
                                                        selectable={true}
                                                        classFilter={ OrganizationFilter }
                                                        onChange={handleChangeTreeObjectField(nameof(model.organization))}
                                                        checkStrictly={true}
                                                        getTreeData={ appUserRepository.singleListOrganization }
                                                        item={ model.organization } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.position")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.position))}
                                                message={ model.errors?.position } >
                                                <Select isMaterial={true}
                                                    classFilter={ PositionFilter }
                                                    placeHolder={translate("appUsers.placeholder.position")}
                                                    getList={ appUserRepository.singleListPosition }
                                                    onChange={handleChangeObjectField(nameof(model.position))}
                                                    model={ model.position } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.province")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.province))}
                                                message={ model.errors?.province } >
                                                <Select isMaterial={true}
                                                    classFilter={ ProvinceFilter }
                                                    placeHolder={translate("appUsers.placeholder.province")}
                                                    getList={ appUserRepository.singleListProvince }
                                                    onChange={handleChangeObjectField(nameof(model.province))}
                                                    model={ model.province } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.sex")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.sex))}
                                                message={ model.errors?.sex } >
                                                <Select isMaterial={true}
                                                    classFilter={ SexFilter }
                                                    placeHolder={translate("appUsers.placeholder.sex")}
                                                    getList={ appUserRepository.singleListSex }
                                                    onChange={handleChangeObjectField(nameof(model.sex))}
                                                    model={ model.sex } />
                                        </FormItem>
                                    </Col>

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("appUsers.status")}
                                                validateStatus={formService.getValidationStatus<AppUser>(model.errors, nameof(model.status))}
                                                message={ model.errors?.status } >
                                                <Select isMaterial={true}
                                                    classFilter={ StatusFilter }
                                                    placeHolder={translate("appUsers.placeholder.status")}
                                                    getList={ appUserRepository.singleListStatus }
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
                                
                                <TabPane tab={translate("appUsers.appUserRoleMappings")}
                                         key='1'>
                                    <Row>
                                        <ContentTable model={model}
                                                      filter={ appUserRoleMappingFilter }
                                                      list={ appUserRoleMappingList }
                                                      loadingList={loadAppUserRoleMappingList}
                                                      total={ appUserRoleMappingTotal }
                                                      handleTableChange={handleAppUserRoleMappingTableChange}
                                                      rowSelection={ appUserRoleMappingRowSelection }
                                                      handleLocalBulkDelete={ handleLocalBulkDeleteAppUserRoleMapping }
                                                      canBulkDelete={ canBulkDeleteAppUserRoleMapping }
                                                      handleExportContent={ handleExportAppUserRoleMapping }
                                                      handleExportTemplateContent={ handleExportTemplateAppUserRoleMapping }
                                                      handlePagination={ handleAppUserRoleMappingPagination }
                                                      handleAddContent={ handleAddAppUserRoleMapping }
                                                      ref={ appUserRoleMappingRef }
                                                      handleClick={ handleClickAppUserRoleMapping }
                                                      handleImportContentList={ handleImportAppUserRoleMapping }
                                                      columns={ appUserRoleMappingContentColumns }
                                                      onOpenModal={handleOpenRoleModal}
/>
                                        <ContentModal content={ appUserRoleMappingContents }
                                                      setContent={ setAppUserRoleMappingContents }
                                                      visible={ visibleRole }
                                                      filter={ roleFilter }
                                                      onUpdateNewFilter={ handleUpdateNewRoleFilter }
                                                      onResetFilter={ handleResetRoleFilter }
                                                      onSearch={ handleSearchRole }
                                                      getList={ appUserRepository.listRole }
                                                      getTotal={ appUserRepository.countRole }
                                                      loadList={loadRoleList}
                                                      setLoadList={setLoadRoleList}
                                                      selectedList={selectedRoleList}
                                                      columns={ roleColumns }
                                                      filterList={ roleModalFilters }
                                                      mapperField={nameof(model.appUserRoleMappings[0].role)}
                                                      mapper={ appUserRoleMappingContentMapper }
                                                      onClose={ handleCloseRoleModal }
                                                      onSave={ handleSaveRoleModal } />
                                    </Row>
                                </TabPane>
                                
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-3 mb-5'>
                    <button className='btn component__btn-primary pr-4 mb-5'
                            onClick={handleSave()}>
                        {translate("appUsers.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default AppUserDetailView;
