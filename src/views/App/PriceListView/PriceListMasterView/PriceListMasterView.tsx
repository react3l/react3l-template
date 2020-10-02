import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Col, Descriptions, Row, Tooltip } from "antd";
import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { FileModel } from "components/Utility/ChatBox/ChatBox.model";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import Modal from "components/Utility/Modal/Modal";
import Pagination from "components/Utility/Pagination/Pagination";
import { formatDateTime } from "helpers/date-time";
import { renderMasterIndex } from "helpers/table";
import { PriceList, PriceListFilter } from "models/PriceList";
import { PriceListStatusFilter } from "models/PriceList/PriceListStatusFilter";
import { SalesOrderTypeFilter } from "models/PriceList/SalesOrderTypeFilter";
import moment from "moment";
import { Moment } from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Animate } from "react-show";
import { priceListRepository } from "repositories/price-list-repository";
import { Observable, of } from "rxjs";
import masterService from "services/pages/master-service";
import nameof from "ts-nameof.macro";

const listMessageDemo = [
  {   id: 1, 
      discussionId: '9b1a5cc1-ed96-4c4f-b44f-dc8491a5b136',  
      content: '<a>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</a>', 
      creatorId: 10, 
      createdAt: moment(), 
      creator: {
          id: 10, 
          userName: 'Le Duc Thang', 
          displayName: 'thangld19', 
          avatar: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      },
  },
  {   id: 2, 
      discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
      content: '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="IMG"/>', 
      creatorId: 11, 
      createdAt: moment(), 
      creator: {
          id: 11, 
          userName: 'Le Duc Thang',
          displayName: 'thangld19', 
          avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
      },
  },
  {   id: 3, 
      discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
      content: '<a>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</a>', 
      creatorId: 11, 
      createdAt: moment(), 
      creator: {
          id: 11, 
          userName: 'Le Duc Thang',
          displayName: 'thangld19', 
          avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
      },
  },
  {   id: 4, 
      discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
      content: 'Lorem Ipsum is simply', 
      creatorId: 11, 
      createdAt: moment(), 
      creator: {
          id: 11, 
          userName: 'Le Duc Thang',
          displayName: 'thangld19', 
          avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
      },
  },
  {   id: 5, 
      discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 
      creatorId: 10, 
      createdAt: moment(), 
      creator: {
          id: 10, 
          userName: 'Le Duc Thang',
          displayName: 'thangld19', 
          avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
      },
  },
  {   id: 6, 
      discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
      content: 'Lorem Ipsum is simply dummy text', 
      creatorId: 10, 
      createdAt: moment(), 
      creator: {
          id: 10, 
          userName: 'Le Duc Thang',
          displayName: 'thangld19', 
          avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
      },
  },
];

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next(listMessageDemo);
    observer.complete();
  }, 1000);
});

const countObservable = new Observable<number>((observer) => {
  setTimeout(() => {
    observer.next(50);
    observer.complete();
  }, 1000);
});

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

const demoCountFunc = (TModelFilter: ModelFilter) => {
  return countObservable;
};

const demoPostFunc = (Message: any) => {
  return of(Message);
};

const demoAttachFunc = (file: File) => {
  const fileValue: FileModel = {
      id: 1,
      name: file.name,
      path: '/testpath',
  };
  return of(fileValue);
};

const demoDeleteFunc = (message: any) => {
  return of(true);
};

const userList = [
  {id: 1, name: 'Le Duc Thang', displayName: 'thangld19@fpt.com.vn'},
  {id: 2, name: 'Dang Tuan Vu', displayName: 'vudt19@fpt.com.vn'},
  {id: 1, name: 'Bui Quang Huy', displayName: 'huybq11@fpt.com.vn'},
];

const demoGetList = (value: string) => {
  return of(userList);
};

function PriceListMasterView() {
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
  } = masterService.useMaster<PriceList, PriceListFilter>(
    PriceListFilter,
    priceListRepository.list,
    priceListRepository.count,
    priceListRepository.delete,
    priceListRepository.bulkDelete,
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<PriceList>(PriceList, priceListRepository.get);

  const columns: ColumnProps<PriceList>[] = useMemo(
    () => [
      {
        title: translate("general.columns.index"),
        key: "index",
        width: 100,
        render: renderMasterIndex<PriceList>(pagination),
      },
      {
        title: translate("priceList.code"),
        key: nameof(list[0].code),
        dataIndex: nameof(list[0].code),
      },
      {
        title: translate("priceList.name"),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
      },
      {
        title: (
          <div className='text-center'>{translate("priceList.updatedAt")}</div>
        ),
        key: nameof(list[0].updatedAt),
        dataIndex: nameof(list[0].updatedAt),
        render(...params: [Moment, PriceList, number]) {
          return <div className='text-center'>{formatDateTime(params[0])}</div>;
        },
      },
      {
        title: (
          <div className='text-center'>{translate("priceList.status")}</div>
        ),
        key: nameof(list[0].statusId),
        dataIndex: nameof(list[0].statusId),
        render(...params: [number, PriceList, number]) {
          return (
            <div className={params[0] === 1 ? "active" : ""}>
              <i className='tio-checkmark_circle d-flex justify-content-center'></i>
            </div>
          );
        },
      },
      {
        title: translate("general.actions.label"),
        key: "action",
        dataIndex: nameof(list[0].id),
        width: 200,
        align: "center",
        render(id: number, priceList: PriceList) {
          return (
            <div className='d-flex justify-content-center button-action-table'>
              <Tooltip title={translate("general.actions.view")}>
                <button className='btn gradient-btn-icon' onClick={handleOpenPreview(id)}>
                  <i className='tio-visible' />
                </button>
              </Tooltip>
              <Tooltip title={translate("general.actions.edit")}>
                <button
                  className='btn gradient-btn-icon'
                  onClick={handleGoDetail(id)}
                >
                  <i className='tio-edit' />
                </button>
              </Tooltip>
              <Tooltip title={"delete"}>
                <button
                  className='btn btn-sm component__btn-delete'
                  onClick={() => handleServerDelete(priceList)}
                >
                  <i className='tio-delete' />
                </button>
              </Tooltip>
            </div>
          );
        },
      },
    ],

    [handleGoDetail, handleServerDelete, translate, handleOpenPreview, list, pagination],
  );

  return (
    <>
      <div className='page page__master'>
        <div className='page__header d-flex align-items-center justify-content-between'>
          <div className='page__title'>
            {translate("paymentRequest.master.title")}
          </div>
          <div className='page__actions d-flex align-items-center'>
            <button
              className='btn btn-sm component__btn-primary ml-3 grow-animate-1'
              onClick={handleGoCreate}
            >
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
                <button
                  className={classNames(
                    "btn component__btn-toggle mr-4 grow-animate-1",
                    toggle === true ? "component__btn-toggle-active" : "",
                  )}
                  onClick={handleToggleSearch}
                >
                  <i className='tio-tune_horizontal'></i>
                  <span className='component_btn-text'>Nâng cao</span>
                </button>
                <button className='btn component__btn-toggle grow-animate-1' 
                  onClick={handleResetFilter}>
                  <i className='tio-restore'></i>
                  <span className='component_btn-text'>Bỏ lọc</span>
                </button>
              </div>
              {/* end toggle and reset filter */}
            </div>
            <Animate
              show={toggle}
              duration={500}
              style={{
                height: "auto",
              }}
              transitionOnMount={true}
              start={{
                height: 0,
              }}
              leave={{
                opacity: 0,
                height: 0,
              }}
            >
              <Row className='mt-4'>
                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate("general.priceList.code")}
                  </label>
                  <AdvanceStringFilter
                    value={filter[nameof(list[0].code)]["contain"]}
                    onChange={handleChangeFilter(
                      nameof(list[0].code),
                      "contain" as any,
                      StringFilter,
                    )}
                    placeHolder={translate("priceList.filter.code")} // -> tat ca
                  />
                </Col>
                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate("general.priceList.name")}
                  </label>
                  <AdvanceStringFilter
                    value={filter[nameof(list[0].name)]["contain"]}
                    onChange={handleChangeFilter(
                      nameof(list[0].name),
                      "contain" as any,
                      StringFilter,
                    )}
                    placeHolder={translate("priceList.filter.name")} // -> tat ca
                  />
                </Col>
                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate("priceList.status")}
                  </label>
                  <AdvanceIdFilter
                    value={filter[nameof(list[0].statusId)]["equal"]}
                    onChange={handleChangeFilter(
                      nameof(list[0].statusId),
                      "equal" as any,
                      IdFilter,
                    )}
                    classFilter={PriceListStatusFilter}
                    getList={priceListRepository.filterListStatus}
                    placeHolder={translate("general.filter.idFilter")}
                  />
                </Col>
                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate("priceList.saleOrderType")}
                  </label>
                  <AdvanceIdFilter
                    value={filter[nameof(list[0].salesOrderTypeId)]["equal"]}
                    onChange={handleChangeFilter(
                      nameof(list[0].salesOrderTypeId),
                      "equal" as any,
                      IdFilter,
                    )}
                    classFilter={SalesOrderTypeFilter}
                    getList={priceListRepository.filterListSalesOrderType}
                    placeHolder={translate("general.filter.idFilter")}
                  />
                </Col>
              </Row>
            </Animate>
          </Card>
        </div>
        <div className='page__master-table'>
          <Card>
            <Table
              tableLayout='fixed'
              rowKey={nameof(list[0].id)}
              columns={columns}
              pagination={false}
              dataSource={list}
              loading={loadingList}
              onChange={handleTableChange}
              rowSelection={rowSelection}
              title={() => (
                <>
                  <div className='d-flex justify-content-between'>
                    <div className='flex-shrink-1 d-flex align-items-center'>
                      <div className='table-title ml-2'>
                        {translate("priceLists.table.title")}
                      </div>
                    </div>

                    <div className='flex-shrink-1 d-flex align-items-center'>
                      <Tooltip title={translate("Xóa tất cả")} key='bulkDelete'>
                        <button
                          className='btn border-less component__btn-delete grow-animate-2'
                          style={{ border: "none", backgroundColor: "unset" }}
                          onClick={handleServerBulkDelete} // local bulk Delete onChange
                          disabled={!canBulkDelete} // disabled when selectedList length === 0
                        >
                          <i className='tio-delete' />
                        </button>
                      </Tooltip>
                      <Tooltip title={translate("general.actions.importExcel")}>
                        <>
                          <input
                            ref={importButtonRef}
                            type="file"
                            style={{display: 'none'}}
                            id="master-import"
                            onChange={handleImportList(priceListRepository.import)}
                          />
                          <button className='btn border-less gradient-btn-icon grow-animate-2'
                            onClick={() => {importButtonRef.current.click();}}>
                            <i className='tio-file_add_outlined' />
                          </button>
                        </>
                      </Tooltip>
                      <Tooltip title={translate("general.actions.exportExcel")}>
                        <button className='btn border-less gradient-btn-icon grow-animate-2'
                            onClick={handleListExport(filter, priceListRepository.export)}>
                            <i className='tio-file_outlined' />
                          </button>
                      </Tooltip>
                      <Tooltip
                        title={translate("general.actions.downloadTemplate")}

                      >
                        <button className='btn border-less gradient-btn-icon grow-animate-2'
                          onClick={handleExportTemplateList(priceListRepository.exportTemplate)}>
                          <i className='tio-download_to' />
                        </button>
                      </Tooltip>
                      <Pagination
                        skip={filter.skip}
                        take={filter.take}
                        total={total}
                        onChange={handlePagination}
                        style={{ margin: "10px" }}
                      />
                    </div>
                  </div>
                </>
              )}
            />
          </Card>
        </div>
      </div>
      <Modal title={''}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={1000}
        visibleFooter={false}
        >
          { isLoadingPreview ? 
            <div className="loading-block">
              <img src="/assets/svg/spinner.svg"  alt='Loading...'/>
            </div> :
            <div className="preview__containter">
              <div className="preview__left-side">
                <div className="preview__header">
                  <div className="preview__vertical-bar"></div>
                  <div className="preview__header-info">
                    <div className="preview__header-text">
                      <span className="preview__header-title">Đại lí Huề Hòa</span>
                      <span className="preview__header-date">Ngày tạo { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                    </div>
                    <button className="btn gradient-btn-icon ant-tooltip-open">
                      <i className="tio-edit"></i>
                    </button>
                  </div>
                </div>
                <div className="preview__body">
                  <div className="preview__content">
                    <Descriptions title={previewModel.name} column={2}>
                      <Descriptions.Item label={translate('priceList.name')}>
                        <span className="gradient-text">{ previewModel.name }</span>
                      </Descriptions.Item>
                      <Descriptions.Item label={translate('priceList.code')}>
                        <span className="gradient-text">{ previewModel.code }</span>
                      </Descriptions.Item>
                      <Descriptions.Item label={translate('priceList.startDate')}>
                        <span className="gradient-text">
                          { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }
                        </span>
                      </Descriptions.Item>
                      <Descriptions.Item label={translate('priceList.endDate')}>
                        <span className="gradient-text">
                          { previewModel.endDate ? moment(previewModel.endDate).format('DD/MM/YYYY') : null }
                        </span>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                  <div className="preview__content no-data">
                    {/* <Table
                      tableLayout='fixed'
                      rowKey={nameof(previewModel.priceListStoreMappings[0].id)}
                      columns={[
                        { title: translate('priceListStoreMappings.storeName'), dataIndex: 'storeName', key: 'storeName'},
                        { title: translate('priceListStoreMappings.storeCode'), dataIndex: 'storeCode', key: 'storeCode'},
                      ]}
                      pagination={false}
                      dataSource={previewModel.priceListStoreMappings}
                    /> */}
                  </div>
                </div>
                <div className="preview__footer"></div>
              </div>
              <div className="preview__right-side">
              <ChatBox getMessages={demoSearchFunc}
                countMessages={demoCountFunc}
                postMessage={demoPostFunc}
                deleteMessage={demoDeleteFunc}
                attachFile = {demoAttachFunc}
                suggestList = {demoGetList}
                discussionId={'cb042dd9-03bf-4218-a126-9cd7444c68e4'}
                userInfo={{
                    id: 10, 
                    userName: 'Le Duc Thang',
                    displayName: 'thangld19', 
                    avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
                    }}/>
              </div>
            </div>
          }
      </Modal>
    </>
  );
}

export default PriceListMasterView;
