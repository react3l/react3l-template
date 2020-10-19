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
import AppUserPreview from "./AppUserPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import { NumberFilter } from "@react3l/advanced-filters";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import { DateFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { appUserRepository } from "repositories/app-user-repository";
import { AppUser, AppUserFilter } from "models/AppUser";
import { APP_USER_DETAIL_ROUTE } from "config/route-consts";
import { Organization, OrganizationFilter } from "models/Organization";
import { Position, PositionFilter } from "models/Position";
import { Province, ProvinceFilter } from "models/Province";
import { Sex, SexFilter } from "models/Sex";
import { Status, StatusFilter } from "models/Status";
/* end individual import */

function AppUserMasterView() {
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
    } = masterService.useMaster<AppUser, AppUserFilter>
    (
        AppUserFilter,
        APP_USER_DETAIL_ROUTE,
        appUserRepository.list,
        appUserRepository.count,
        appUserRepository.delete,
        appUserRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<AppUser>
    (
        AppUser,
        appUserRepository.get
    );

    const columns: ColumnProps<AppUser>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<AppUser>(pagination),
                    },
                    
                    
                    
                    
                    {
                        title: translate('appUsers.username'),
                        key: nameof(list[0].username),
                        dataIndex: nameof(list[0].username),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].username),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.password'),
                        key: nameof(list[0].password),
                        dataIndex: nameof(list[0].password),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].password),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.otpCode'),
                        key: nameof(list[0].otpCode),
                        dataIndex: nameof(list[0].otpCode),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].otpCode),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.otpExpired'),
                        key: nameof(list[0].otpExpired),
                        dataIndex: nameof(list[0].otpExpired),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].otpExpired),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.displayName'),
                        key: nameof(list[0].displayName),
                        dataIndex: nameof(list[0].displayName),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].displayName),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.address'),
                        key: nameof(list[0].address),
                        dataIndex: nameof(list[0].address),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].address),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.email'),
                        key: nameof(list[0].email),
                        dataIndex: nameof(list[0].email),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].email),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.phone'),
                        key: nameof(list[0].phone),
                        dataIndex: nameof(list[0].phone),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].phone),
                            ),
                    },
                    
                    
                    
                    
                    
                    
                    
                    {
                        title: translate('appUsers.department'),
                        key: nameof(list[0].department),
                        dataIndex: nameof(list[0].department),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].department),
                            ),
                    },
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {
                        title: translate('appUsers.avatar'),
                        key: nameof(list[0].avatar),
                        dataIndex: nameof(list[0].avatar),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].avatar),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.birthday'),
                        key: nameof(list[0].birthday),
                        dataIndex: nameof(list[0].birthday),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].birthday),
                            ),
                    },
                    
                    
                    
                    
                    
                    {
                        title: translate('appUsers.used'),
                        key: nameof(list[0].used),
                        dataIndex: nameof(list[0].used),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].used),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.longitude'),
                        key: nameof(list[0].longitude),
                        dataIndex: nameof(list[0].longitude),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].longitude),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.latitude'),
                        key: nameof(list[0].latitude),
                        dataIndex: nameof(list[0].latitude),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].latitude),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('appUsers.organization'),
                        key: nameof(list[0].organization),
                        dataIndex: nameof(list[0].organization),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].organization),
                            ),
                        render(organization: Organization) {
                            return organization?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('appUsers.position'),
                        key: nameof(list[0].position),
                        dataIndex: nameof(list[0].position),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].position),
                            ),
                        render(position: Position) {
                            return position?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('appUsers.province'),
                        key: nameof(list[0].province),
                        dataIndex: nameof(list[0].province),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].province),
                            ),
                        render(province: Province) {
                            return province?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('appUsers.sex'),
                        key: nameof(list[0].sex),
                        dataIndex: nameof(list[0].sex),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
                            (
                                filter,
                                nameof(list[0].sex),
                            ),
                        render(sex: Sex) {
                            return sex?.name;
                        }
                    },
                    
                    
                    {
                        title: translate('appUsers.status'),
                        key: nameof(list[0].status),
                        dataIndex: nameof(list[0].status),
                        sorter: true,
                        sortOrder: getAntOrderType<AppUser, AppUserFilter>
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
                        render(id: number, appUser: AppUser) {
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
                                            handleServerDelete(appUser)}
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
                        {translate("appUsers.master.title")}
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
                                        translate('appUsers.username')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].username)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].username),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.username')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.password')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].password)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].password),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.password')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.otpCode')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].otpCode)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].otpCode),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.otpCode')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.otpExpired')
                                    </label>
                                    <AdvanceDateFilter value={filter[nameof(list[0].otpExpired)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].otpExpired),
                                                        'equal' as any,
                                                        DateFilter,
                                                        )}
                                                        placeholder={translate('appUsers.placeholder.otpExpired')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.displayName')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].displayName)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].displayName),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.displayName')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.address')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].address)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].address),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.address')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.email')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].email)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].email),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.email')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.phone')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].phone)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].phone),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.phone')} />
                                </Col>
                                



                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.department')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].department)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].department),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.department')} />
                                </Col>
                                







                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.avatar')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].avatar)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].avatar),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.avatar')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.birthday')
                                    </label>
                                    <AdvanceDateFilter value={filter[nameof(list[0].birthday)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].birthday),
                                                        'equal' as any,
                                                        DateFilter,
                                                        )}
                                                        placeholder={translate('appUsers.placeholder.birthday')} />
                                </Col>
                                


                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.used')
                                    </label>
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.longitude')
                                    </label>
                                    <AdvanceNumberFilter value={filter[nameof(list[0].longitude)]["equal"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].longitude),
                                                            'equal' as any,
                                                            NumberFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.longitude')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('appUsers.latitude')
                                    </label>
                                    <AdvanceNumberFilter value={filter[nameof(list[0].latitude)]["equal"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].latitude),
                                                            'equal' as any,
                                                            NumberFilter,
                                                            )}
                                                            placeHolder={translate('appUsers.placeholder.latitude')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('appUsers.organization')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].organizationId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].organizationId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ OrganizationFilter }
                                                        getList={ appUserRepository.singleListOrganization }
                                                        placeHolder={translate('appUsers.placeholder.organization')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('appUsers.position')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].positionId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].positionId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ PositionFilter }
                                                        getList={ appUserRepository.singleListPosition }
                                                        placeHolder={translate('appUsers.placeholder.position')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('appUsers.province')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].provinceId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].provinceId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ ProvinceFilter }
                                                        getList={ appUserRepository.singleListProvince }
                                                        placeHolder={translate('appUsers.placeholder.province')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('appUsers.sex')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].sexId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].sexId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ SexFilter }
                                                        getList={ appUserRepository.singleListSex }
                                                        placeHolder={translate('appUsers.placeholder.sex')} />
                                </Col>

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        { translate('appUsers.status')}
                                    </label>
                                    <AdvanceIdFilter value={filter[nameof(list[0].statusId)]["equal"]}
                                                        onChange={handleChangeFilter(
                                                        nameof(list[0].statusId),
                                                        'equal' as any,
                                                        IdFilter,
                                                        )}
                                                        classFilter={ StatusFilter }
                                                        getList={ appUserRepository.singleListStatus }
                                                        placeHolder={translate('appUsers.placeholder.status')} />
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
                                            {translate('appUsers.table.title')}
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
                                                    onChange={handleImportList(appUserRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, appUserRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(appUserRepository.exportTemplate)}>
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
            <AppUserPreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default AppUserMasterView;
