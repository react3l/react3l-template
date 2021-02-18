import { Model, Repository } from '@react3l/react3l/core';
import nameof from "ts-nameof.macro";
import { Card, Table, Tooltip } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Pagination from 'components/Utility/Pagination/Pagination';
import { TFunction } from 'i18next';
import React from 'react';
import { UseMaster } from 'services/pages/master-service';

export interface AppMainMasterTableProps extends UseMaster {
    columns?: ColumnProps<Model>[],
    translate?: TFunction,
    repository?: any 
};

export function AppMainMasterTable (props: AppMainMasterTableProps) {
    const {
        list,
        columns,
        filter,
        loadingList,
        canBulkDelete,
        rowSelection,
        importButtonRef,
        total,
        repository,
        translate,
        handleTableChange,
        handleServerBulkDelete,
        handleImportList,
        handleListExport,
        handleExportTemplateList,
        handlePagination
    } = props;
    
    return <>
        <div className='page__master-table'>
            <Card>
                <Table rowKey={nameof(list[0].id)}
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
                                            onChange={handleImportList(repository.import)} />
                                    <button className='btn border-less gradient-btn-icon grow-animate-2'
                                            onClick={() =>
                                        {importButtonRef.current.click();}}>
                                        <i className='tio-file_add_outlined' />
                                    </button>
                                    </>
                                </Tooltip>
                                <Tooltip title={translate("general.button.exportExcel")}>
                                    <button className='btn border-less gradient-btn-icon grow-animate-2'
                                            onClick={handleListExport(filter, repository.export)}>
                                        <i className='tio-file_outlined' />
                                    </button>
                                </Tooltip>
                                <Tooltip title={translate("general.button.downloadTemplate")}>
                                    <button className='btn border-less gradient-btn-icon grow-animate-2'
                                            onClick={handleExportTemplateList(repository.exportTemplate)}>
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
    </>;
}