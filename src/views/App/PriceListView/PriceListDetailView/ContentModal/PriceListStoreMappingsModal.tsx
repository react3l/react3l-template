import { Card, Col, Modal, Row } from "antd";
import nameof from "ts-nameof.macro";
import { Store } from "antd/lib/form/interface";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StoreFilter } from "models/StoreFilter";
import { StoreTypeFilter } from "models/StoreTypeFilter";
import React, { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import tableService from "services/tbl-service";
import Pagination from "components/Utility/Pagination/Pagination";
import Table from "antd/lib/table";
import { renderMasterIndex } from "helpers/table";

export interface PriceListStoreMappingsModalProps {
  visible: boolean;
  loadControl: boolean;
  endLoadControl: () => void;
  width?: number;
  defaultSelectedRowKey?: number[];
  onSave?: (selectedList: Store[]) => void;
  onClose?: () => void;
}

function PriceListStoreMappingsModal(props: PriceListStoreMappingsModalProps) {
  const [translate] = useTranslation();
  const {
    visible,
    defaultSelectedRowKey,
    onSave,
    width,
    onClose,
    loadControl,
    endLoadControl,
  } = props;

  const [filter, setFilter] = useState<StoreFilter>(new StoreFilter());

  const {
    list,
    total,
    loadingList,
    pagination,
    handlePagination,
    handleTableChange,
    handleSearch,
    rowSelection,
  } = tableService.useTable<Store, StoreFilter>(
    filter,
    setFilter,
    priceListRepository.listStore,
    priceListRepository.countStore,
    null,
    null,
    null,
    "checkbox",
    loadControl,
    endLoadControl,
    defaultSelectedRowKey,
  );

  //   need separating to be reused
  const handleFilter = useCallback(
    (fieldName: string, fieldType: string) => {
      return (value: any) => {
        setFilter({
          ...filter,
          [fieldName]: {
            [fieldType]: value,
          },
        });
        if (typeof handleSearch === "function") {
          handleSearch();
        }
      };
    },
    [filter, setFilter, handleSearch],
  );

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
        <button className='btn btn-sm component__btn-primary mr-2'>
          <span>
            <i className='tio-save' /> Lưu
          </span>
        </button>
        <button className='btn btn-sm component__btn-cancel' onClick={onClose}>
          <i className='tio-clear' /> Hủy
        </button>
      </div>
    ),
    [onClose],
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
                  onChange={handleFilter("code", "contain")}
                  placeHolder={translate("priceList.filter.code")} // -> tat ca
                />
              </Col>
              <Col lg={6}>
                <AdvanceIdFilter
                  value={filter["statusId"]["equal"]}
                  onChange={handleFilter("statusId", "equal")}
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
