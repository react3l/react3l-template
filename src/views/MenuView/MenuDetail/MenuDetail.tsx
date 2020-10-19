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
import { Menu } from 'models/Menu';
import { MENU_MASTER_ROUTE } from 'config/route-consts'
import { menuRepository } from "repositories/menu-repository";
import { useFieldTable } from "./FieldHook";
/* end individual import */

const { TabPane } = Tabs;

function MenuDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<Menu>
    (
        Menu,
        menuRepository.get,
        menuRepository.save,
        MENU_MASTER_ROUTE
    );
    
    const {
        fieldFilter,
        fieldContents,
        setFieldContents,
        fieldContentColumns,
        fieldList,
        loadFieldList,
        fieldTotal,
        handleAddField,
        handleFieldTableChange,
        handleFieldPagination,
        fieldRowSelection,
        canBulkDeleteField,
        handleLocalBulkDeleteField,
        fieldRef,
        handleClickField,
        handleImportField,
        handleExportField,
        handleExportTemplateField,
    } = useFieldTable(model, handleUpdateNewModel);
    

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("menus.detail.title")}
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
                                        <FormItem label={translate("menus.code")}
                                                validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.code))}
                                                message={ model.errors?.code }>
                                            <InputText isMaterial={true}
                                                        value={ model.code }
                                                        placeHolder={translate("menus.placeholder.code")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.code))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("menus.name")}
                                                validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("menus.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("menus.path")}
                                                validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.path))}
                                                message={ model.errors?.path }>
                                            <InputText isMaterial={true}
                                                        value={ model.path }
                                                        placeHolder={translate("menus.placeholder.path")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.path))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("menus.isDeleted")}
                                                validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.isDeleted))}
                                                message={ model.errors?.isDeleted }>
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
                                
                                <TabPane tab={translate("menus.fields")}
                                         key='1'>
                                    <Row>
                                        <ContentTable model={model}
                                                      filter={ fieldFilter }
                                                      list={ fieldList }
                                                      loadingList={loadFieldList}
                                                      total={ fieldTotal }
                                                      handleTableChange={handleFieldTableChange}
                                                      rowSelection={ fieldRowSelection }
                                                      handleLocalBulkDelete={ handleLocalBulkDeleteField }
                                                      canBulkDelete={ canBulkDeleteField }
                                                      handleExportContent={ handleExportField }
                                                      handleExportTemplateContent={ handleExportTemplateField }
                                                      handlePagination={ handleFieldPagination }
                                                      handleAddContent={ handleAddField }
                                                      ref={ fieldRef }
                                                      handleClick={ handleClickField }
                                                      handleImportContentList={ handleImportField }
                                                      columns={ fieldContentColumns }
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
                        {translate("menus.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default MenuDetailView;
