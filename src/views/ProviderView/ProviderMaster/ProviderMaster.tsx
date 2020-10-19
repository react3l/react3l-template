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
import ProviderPreview from "./ProviderPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { providerRepository } from "repositories/provider-repository";
import { Provider, ProviderFilter } from "models/Provider";
import { PROVIDER_DETAIL_ROUTE } from "config/route-consts";
/* end individual import */

function ProviderMasterView() {
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
    } = masterService.useMaster<Provider, ProviderFilter>
    (
        ProviderFilter,
        PROVIDER_DETAIL_ROUTE,
        providerRepository.list,
        providerRepository.count,
        providerRepository.delete,
        providerRepository.bulkDelete,
    );

    const {
        isOpenPreview,
        isLoadingPreview,
        previewModel,
        handleOpenPreview,
        handleClosePreview,
    } = masterService.usePreview<Provider>
    (
        Provider,
        providerRepository.get
    );

    const columns: ColumnProps<Provider>[] = useMemo(
            () => [
                    {
                        title: translate("general.columns.index"),
                        key: "index",
                        width: 100,
                        render: renderMasterIndex<Provider>(pagination),
                    },
                    
                    
                    
                    
                    {
                        title: translate('providers.name'),
                        key: nameof(list[0].name),
                        dataIndex: nameof(list[0].name),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].name),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.googleRedirectUri'),
                        key: nameof(list[0].googleRedirectUri),
                        dataIndex: nameof(list[0].googleRedirectUri),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].googleRedirectUri),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.aDIP'),
                        key: nameof(list[0].aDIP),
                        dataIndex: nameof(list[0].aDIP),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].aDIP),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.aDUsername'),
                        key: nameof(list[0].aDUsername),
                        dataIndex: nameof(list[0].aDUsername),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].aDUsername),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.aDPassword'),
                        key: nameof(list[0].aDPassword),
                        dataIndex: nameof(list[0].aDPassword),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].aDPassword),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.googleClient'),
                        key: nameof(list[0].googleClient),
                        dataIndex: nameof(list[0].googleClient),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].googleClient),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.googleClientSecret'),
                        key: nameof(list[0].googleClientSecret),
                        dataIndex: nameof(list[0].googleClientSecret),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].googleClientSecret),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.microsoftClient'),
                        key: nameof(list[0].microsoftClient),
                        dataIndex: nameof(list[0].microsoftClient),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].microsoftClient),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.microsoftClientSecret'),
                        key: nameof(list[0].microsoftClientSecret),
                        dataIndex: nameof(list[0].microsoftClientSecret),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].microsoftClientSecret),
                            ),
                    },
                    
                    
                    
                    {
                        title: translate('providers.microsoftRedirectUri'),
                        key: nameof(list[0].microsoftRedirectUri),
                        dataIndex: nameof(list[0].microsoftRedirectUri),
                        sorter: true,
                        sortOrder: getAntOrderType<Provider, ProviderFilter>
                            (
                                filter,
                                nameof(list[0].microsoftRedirectUri),
                            ),
                    },
                    
                    
                    {
                        title: translate("general.actions.label"),
                        key: "action",
                        dataIndex: nameof(list[0].id),
                        width: 200,
                        align: "center",
                        render(id: number, provider: Provider) {
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
                                            handleServerDelete(provider)}
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
                        {translate("providers.master.title")}
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
                                        translate('providers.name')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].name)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].name),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.name')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.googleRedirectUri')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].googleRedirectUri)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].googleRedirectUri),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.googleRedirectUri')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.aDIP')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].aDIP)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].aDIP),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.aDIP')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.aDUsername')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].aDUsername)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].aDUsername),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.aDUsername')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.aDPassword')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].aDPassword)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].aDPassword),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.aDPassword')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.googleClient')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].googleClient)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].googleClient),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.googleClient')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.googleClientSecret')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].googleClientSecret)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].googleClientSecret),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.googleClientSecret')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.microsoftClient')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].microsoftClient)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].microsoftClient),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.microsoftClient')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.microsoftClientSecret')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].microsoftClientSecret)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].microsoftClientSecret),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.microsoftClientSecret')} />
                                </Col>
                                

                                <Col lg={4} className='pr-4'>
                                    <label className='label'>
                                        translate('providers.microsoftRedirectUri')
                                    </label>
                                    <AdvanceStringFilter value={filter[nameof(list[0].microsoftRedirectUri)]["contain"]}
                                                            onChange={handleChangeFilter(
                                                            nameof(list[0].microsoftRedirectUri),
                                                            'contain' as any,
                                                            StringFilter,
                                                            )}
                                                            placeHolder={translate('providers.placeholder.microsoftRedirectUri')} />
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
                                            {translate('providers.table.title')}
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
                                                    onChange={handleImportList(providerRepository.import)} />
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={() =>
                                                {importButtonRef.current.click();}}>
                                                <i className='tio-file_add_outlined' />
                                            </button>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.exportExcel")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleListExport(filter, providerRepository.export)}>
                                                <i className='tio-file_outlined' />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={translate("general.button.downloadTemplate")}>
                                            <button className='btn border-less gradient-btn-icon grow-animate-2'
                                                    onClick={handleExportTemplateList(providerRepository.exportTemplate)}>
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
            <ProviderPreview previewModel={previewModel}
                                        isOpenPreview={isOpenPreview}
                                        isLoadingPreview={isLoadingPreview}
                                        handleClosePreview={handleClosePreview}
                                        handleGoDetail={handleGoDetail}
                                        translate={translate} />
        </>
    );
}

export default ProviderMasterView;
