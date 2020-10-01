import React, { useCallback, useMemo, useReducer, useEffect } from "react";
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Card, Col, Modal, Row } from "antd";
import { Store } from "antd/lib/form/interface";
import Table from "antd/lib/table";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import Pagination from "components/Utility/Pagination/Pagination";
import { renderMasterIndex } from "helpers/table";
import { StoreFilter } from "models/StoreFilter";
import { StoreTypeFilter } from "models/StoreTypeFilter";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import {
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import tableService from "services/table-service";
import nameof from "ts-nameof.macro";

export interface PriceListStoreMappingsModalProps {
  visible: boolean;
  loadControl: boolean;
  endLoadControl: () => void;
  onSearch: () => void;
  width?: number;
  selectedList?: Store[];
  onSave?: (selectedList: Store[]) => void;
  onClose?: () => void;
}

function PriceListStoreMappingsModal(props: PriceListStoreMappingsModalProps) {
  const [translate] = useTranslation();
  const {
    visible,
    onSave,
    width,
    onClose,
    selectedList,
    loadControl,
    endLoadControl,
  } = props;

  const [filter, dispatch] = useReducer(
    advanceFilterReducer,
    new StoreFilter(),
  ); // deprecated

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleChangeFilter,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useChangeAdvanceFilter<StoreFilter>(
    filter,
    dispatch,
    StoreFilter,
    false, // default loadList
  );

  useEffect(() => {
    if (loadControl) {
      handleSearch();
      endLoadControl();
    }
  }, [handleSearch, loadControl, endLoadControl]); // subscribe event emitter

  const {
    list,
    total,
    loadingList,
    pagination,
    handlePagination,
    handleTableChange,
    rowSelection,
    selectedList: mapperList,
  } = tableService.useModalTable<Store, StoreFilter>(
    filter,
    handleUpdateNewFilter,
    loadList,
    setLoadList,
    handleSearch,
    priceListRepository.listStore,
    priceListRepository.countStore,
    selectedList,
  );

  // need separate to reused
  const handleCloseModal = useCallback(() => {
    handleResetFilter(); // resetFilter to default
    if (typeof onClose === "function") {
      onClose();
    }
  }, [handleResetFilter, onClose]);

  // need separate to reused
  const handleSaveModal = useCallback(() => {
    if (typeof onSave === "function") {
      onSave(mapperList);
    }
    handleCloseModal();
  }, [mapperList, onSave, handleCloseModal]);

  //   need separating to be reused
  const columns = useMemo(
    () => [
      {
        title: translate("general.columns.index"),
        key: "index",
        width: 120,
        render: renderMasterIndex<Store>(pagination),
      },
      {
        title: translate("priceLists.store.code"),
        key: nameof(list[0].code),
        dataIndex: nameof(list[0].code),
        width: 150,
        render(code: string) {
          return code;
        },
        ellipsis: true,
      },
    ],
    [list, pagination, translate],
  );

  // Modal custom footer
  const modalFooter = useMemo(
    () => (
      <div className='d-flex justify-content-end'>
        <button
          className='btn btn-sm component__btn-primary mr-2'
          onClick={handleSaveModal}
        >
          <span>
            <i className='tio-save' /> Lưu
          </span>
        </button>
        <button
          className='btn btn-sm component__btn-cancel'
          onClick={handleCloseModal}
        >
          <i className='tio-clear' /> Hủy
        </button>
      </div>
    ),
    [handleSaveModal, handleCloseModal],
  );

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onClose}
        closable={false}
        width={width}
        footer={modalFooter}
      >
        <div className='page__detail-tabs mb-3'>
          <Card>
            <Row>
              <Col lg={6} className='pr-3'>
                <AdvanceStringFilter
                  value={filter["code"]["contain"]}
                  onBlur={handleChangeFilter(
                    nameof(list[0].code),
                    "contain" as any,
                    StringFilter,
                  )}
                  placeHolder={translate("priceList.filter.code")} // -> tat ca
                />
              </Col>
              <Col lg={6}>
                <AdvanceIdFilter
                  value={filter["statusId"]["equal"]}
                  onChange={handleChangeFilter(
                    nameof(list[0].statusId),
                    "equal" as any,
                    IdFilter,
                  )}
                  classFilter={StoreTypeFilter}
                  getList={priceListRepository.filterListStoreType}
                  placeHolder={translate("general.filter.idFilter")}
                />
              </Col>
            </Row>
          </Card>
        </div>
        <div className='page__detail-tabs'>
          <Card>
            <Table
              tableLayout='fixed'
              bordered={true}
              rowKey={nameof(list[0].id)}
              columns={columns}
              pagination={false}
              dataSource={list}
              loading={loadingList}
              onChange={handleTableChange}
              rowSelection={rowSelection}
              title={() => (
                <>
                  <div className='d-flex justify-content-end'>
                    <div className='flex-shrink-1 d-flex align-items-center'>
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
      </Modal>
    </>
  );
}

PriceListStoreMappingsModal.defaultProps = {
  width: 900, // need dynamic
};

export default PriceListStoreMappingsModal;
