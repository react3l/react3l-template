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
import RolePreview from "./RolePreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { roleRepository } from "repositories/role-repository";
import { Role, RoleFilter } from "models/Role";
import { ROLE_DETAIL_ROUTE } from "config/route-consts";
import { Status, StatusFilter } from "models/Status";
/* end individual import */

function RoleMasterView() {
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
    } = masterService.useMaster<Role, RoleFilter>
    (
        RoleFilter,
        ROLE_DETAIL_ROUTE,
        roleRepository.list,
        roleRepository.count,
        roleRepository.delete,
        roleRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<Role>
    (
        Role,
        roleRepository.get
    );

    const columns: ColumnProps<Role>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<Role>(pagination),
                    },
                    
                    
                    
                    
                    {
                        title: translate('roles.code'),
                        key: nameof(list[0].code),
                        dataIndex: nameof(list[0].code),
                        sorter: true,
                        sortOrder: getAntOrderType<Role, RoleFilter>
                            (
                                filter,
                                nameof(list[0].code),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('roles.name'),
                        key: nameof(list[0].name),
                        dataIndex: nameof(list[0].name),
                        sorter: true,
                        sortOrder: getAntOrderType<Role, RoleFilter>
                            (
                                filter,
                                nameof(list[0].name),
                            ),
                    },
                    
                    
                    
                    
                    
                    {
                        title: translate('roles.used'),
                        key: nameof(list[0].used),
                        dataIndex: nameof(list[0].used),
                        sorter: true,
                        sortOrder: getAntOrderType<Role, RoleFilter>
                            (
                                filter,
                                nameof(list[0].used),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('roles.status'),
                        key: nameof(list[0].status),
                        dataIndex: nameof(list[0].status),
                        sorter: true,
                        sortOrder: getAntOrderType<Role, RoleFilter>
                            (
                                filter,
                                nameof(list[0].status),
                            ),
                        render(status: Status) {
                            return status?.name;
                        }
                    },
                    
                    
                    
                    {
                        title: translate("general.actions.label"),
                        key: "action",
                        dataIndex: nameof(list[0].id),
                        width: 200,
                        align: "center",
                        render(id: number, role: Role) {
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
                                            handleServerDelete(role)}
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
                        {translate("roles.master.title")}
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
                                        translate('roles.code')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].code)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].code),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('roles.placeholder.code')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('roles.name')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].name)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].name),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('roles.placeholder.name')} />
                                </Col>
                                


                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('roles.used')
                                    </label>
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('roles.status')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].statusId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].statusId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ StatusFilter }
                                                        getList={ roleRepository.singleListStatus }
                                                        placeHolder={translate('roles.placeholder.status')} />
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
                                            {translate('roles.table.title')}
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
                                                    onChange={handleImportList(roleRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, roleRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(roleRepository.exportTemplate)}>
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
            <RolePreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default RoleMasterView;
