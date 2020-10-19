/* begin general import */
import React, { useMemo } from "react";
import { Col, Row, Tooltip } from "antd";
import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import Pagination from "components/Utility/Pagination/Pagination";
import { formatDateTime } from "helpers/date-time";
import { renderMasterIndex } from "helpers/table";
import { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { Animate } from "react-show";
import masterService from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import PermissionContentPreview from "./PermissionContentPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { permissionContentRepository } from "repositories/permission-content-repository";
import { PermissionContent, PermissionContentFilter } from "models/PermissionContent";
import { PERMISSION_CONTENT_DETAIL_ROUTE } from "config/route-consts";
import { Field, FieldFilter } from "models/Field";
import { Permission, PermissionFilter } from "models/Permission";
import { PermissionOperator, PermissionOperatorFilter } from "models/PermissionOperator";
/* end individual import */

function PermissionContentMasterView() {
    const [translate] = useTranslation();

    const {
        list,
        total,
        loadingList,
        filter,
        toggle,
        handleChangeFilter,
        handleResetFilter,
        handleGoCreate,
        handleGoDetail,
        handleToggleSearch,
        handleTableChange,
        handlePagination,
        handleServerDelete,
        handleServerBulkDelete,
        handleImportList,
        handleListExport,
        handleExportTemplateList,
        importButtonRef,
        rowSelection,
        canBulkDelete,
        pagination, // optional using
    } = masterService.useMaster<PermissionContent, PermissionContentFilter>
    (
        PermissionContentFilter,
        PERMISSION_CONTENT_DETAIL_ROUTE,
        permissionContentRepository.list,
        permissionContentRepository.count,
        permissionContentRepository.delete,
        permissionContentRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<PermissionContent>
    (
        PermissionContent,
        permissionContentRepository.get
    );

    const columns: ColumnProps<PermissionContent>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<PermissionContent>(pagination),
                    },
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {
                        title: translate('permissionContents.value'),
                        key: nameof(list[0].value),
                        dataIndex: nameof(list[0].value),
                        sorter: true,
                        sortOrder: getAntOrderType<PermissionContent, PermissionContentFilter>
                            (
                                filter,
                                nameof(list[0].value),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('permissionContents.field'),
                        key: nameof(list[0].field),
                        dataIndex: nameof(list[0].field),
                        sorter: true,
                        sortOrder: getAntOrderType<PermissionContent, PermissionContentFilter>
                            (
                                filter,
                                nameof(list[0].field),
                            ),
                        render(field: Field) {
                            return field?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('permissionContents.permission'),
                        key: nameof(list[0].permission),
                        dataIndex: nameof(list[0].permission),
                        sorter: true,
                        sortOrder: getAntOrderType<PermissionContent, PermissionContentFilter>
                            (
                                filter,
                                nameof(list[0].permission),
                            ),
                        render(permission: Permission) {
                            return permission?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('permissionContents.permissionOperator'),
                        key: nameof(list[0].permissionOperator),
                        dataIndex: nameof(list[0].permissionOperator),
                        sorter: true,
                        sortOrder: getAntOrderType<PermissionContent, PermissionContentFilter>
                            (
                                filter,
                                nameof(list[0].permissionOperator),
                            ),
                        render(permissionOperator: PermissionOperator) {
                            return permissionOperator?.name;
                        }
                    },
                    
                    {
                        title: translate("general.actions.label"),
                        key: "action",
                        dataIndex: nameof(list[0].id),
                        width: 200,
                        align: "center",
                        render(id: number, permissionContent: PermissionContent) {
                            return (
                                <div className='d-flex justify-content-center button-action-table'>
                                    <Tooltip title={translate("general.actions.view")}>
                                        <button className='btn gradient-btn-icon' onClick={handleOpenPreview(id)}>
                                            <i className='tio-visible' />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title={translate("general.actions.edit")}>
                                        <button className='btn gradient-btn-icon'
                                                onClick={handleGoDetail(id)}>
                                            <i className='tio-edit' />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title={translate("general.actions.delete")}>
                                        <button className='btn btn-sm component__btn-delete'
                                                onClick={() =>
                                            handleServerDelete(permissionContent)}
                                            >
                                            <i className='tio-delete' />
                                        </button>
                                    </Tooltip>
                                </div>);
                        },
                    },
                ], [handleGoDetail, handleServerDelete, translate, handleOpenPreview, list, pagination]);

    return (
        <>
            <div className='page page__master'>
                <div className='page__header d-flex align-items-center justify-content-between'>
                    <div className='page__title'>
                        {translate("permissionContents.master.title")}
                    </div>
                    <div className='page__actions d-flex align-items-center'>
                        <button className='btn btn-sm component__btn-primary ml-3 grow-animate-1'
                                onClick={handleGoCreate}>
                            {translate("general.actions.create")}
                        </button>
                    </div>
                </div>
                <div className='page__search'>
                    <Card title={translate("general.search.title")}>
                        <div className='d-flex align-items-center'>
                            <div className='pr-4 flex-grow-1'>
                                <InputSearch />
                            </div>
                            {/* start toggle and reset filter */}
                            <div className='d-flex justify-content-around'>
                                <button className={classNames(
                                        'btn component__btn-toggle mr-4 grow-animate-1' ,
                                        toggle === true ? 'component__btn-toggle-active' : '' ,
                                        )}
                                        onClick={handleToggleSearch}>
                                    <i className='tio-tune_horizontal'></i>
                                    <span className='component_btn-text'>
                                        {translate("general.button.advance")}
                                    </span>
                                </button>
                                <button className='btn component__btn-toggle grow-animate-1'
                                        onClick={handleResetFilter}>
                                    <i className='tio-restore'></i>
                                    <span className='component_btn-text'>
                                        {translate("general.button.filter")}
                                    </span>
                                </button>
                            </div>
                            {/* end toggle and reset filter */}
                        </div>
                        <Animate show={toggle}
                                    duration={500}
                                    style={ {height: "auto" } }
                                    transitionOnMount={true}
                                    start={ {height: 0} }
                                    leave={ {opacity: 0, height: 0} }>
                            <Row className='mt-4'>
                                




                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('permissionContents.value')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].value)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].value),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('permissionContents.placeholder.value')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('permissionContents.field')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].fieldId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].fieldId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ FieldFilter }
                                                        getList={ permissionContentRepository.singleListField }
                                                        placeHolder={translate('permissionContents.placeholder.field')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('permissionContents.permission')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].permissionId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].permissionId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ PermissionFilter }
                                                        getList={ permissionContentRepository.singleListPermission }
                                                        placeHolder={translate('permissionContents.placeholder.permission')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('permissionContents.permissionOperator')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].permissionOperatorId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].permissionOperatorId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ PermissionOperatorFilter }
                                                        getList={ permissionContentRepository.singleListPermissionOperator }
                                                        placeHolder={translate('permissionContents.placeholder.permissionOperator')} />
                                </Col>
                            </Row>
                        </Animate>
                    </Card>
                </div>
                <div className='page__master-table'>
                    <Card>
                        <Table tableLayout='fixed'
                                rowKey={nameof(list[0].id)}
                                columns={columns}
                                pagination={false}
                                dataSource={list}
                                loading={loadingList}
                                onChange={handleTableChange}
                                rowSelection={rowSelection}
                                scroll={ { x: 'max-content' } }
                                title={() =>
                            (
                            <>
                                <div className='d-flex justify-content-between'>
                                    <div className='flex-shrink-1 d-flex align-items-center'>
                                        <div className='table-title ml-2'>
                                            {translate('permissionContents.table.title')}
                                        </div>
                                    </div>

                                    <div className='flex-shrink-1 d-flex align-items-center'>
                                        <Tooltip title={translate("general.button.bulkDelete")} key='bulkDelete'>
                                            <button className='btn border-less component__btn-delete grow-animate-2'
                                                    style={ {border: "none" , backgroundColor: "unset" } }
                                                    onClick={handleServerBulkDelete}
                                                    disabled={!canBulkDelete}>
                                                <i className='tio-delete' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.importExcel")}>
                                            <>
                                            <input ref={importButtonRef}
                                                    type="file"
                                                    style={ {display: 'none' } }
                                                    id="master-import"
                                                    onChange={handleImportList(permissionContentRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, permissionContentRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(permissionContentRepository.exportTemplate)}>
                                                <i className='tio-download_to' />
                                            </button>
                                        </Tooltip>
                                        <Pagination skip={filter.skip}
                                                    take={filter.take}
                                                    total={total}
                                                    onChange={handlePagination}
                                                    style={ {margin: "10px" } } />
                                    </div>
                                </div>
                            </>
                            )}
                            />
                    </Card>
                </div>
            </div>
            <PermissionContentPreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default PermissionContentMasterView;
