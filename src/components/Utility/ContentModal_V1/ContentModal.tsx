import React, { Dispatch, SetStateAction, useMemo, useCallback } from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import Modal, { ModalProps } from "antd/lib/modal";
import { Card, Table, Row, Col } from "antd";
import Pagination from "../Pagination/Pagination";
import "./ContentModal.scss";
import { useContentModal } from "./ContentModalHook";
import { Observable } from "rxjs";
import { translate } from "@react3l/react3l/helpers/i18n";
import { TableColumn } from "core/models/TableColumn";

export interface ContentModalProp<T extends Model, TFilter extends ModelFilter>
  extends ModalProps {
  filter: TFilter;
  handleUpdateNewFilter: (filter: TFilter) => void;
  handleResetFilter: () => void;
  handleSearch: () => void;
  getList: (filter: TFilter) => Observable<T[]>;
  getTotal: (filter: TFilter) => Observable<number>;
  loadList: boolean;
  setLoadList: Dispatch<SetStateAction<boolean>>;
  selectedList: T[];
  columns: TableColumn[];
}
export default function ContentModal<
  T extends Model,
  TFilter extends ModelFilter
>(props: ContentModalProp<T, TFilter>) {
  const {
    filter,
    loadList,
    setLoadList,
    handleUpdateNewFilter,
    handleResetFilter,
    handleSearch,
    getList,
    getTotal,
    selectedList,
    columns,
  } = props;

  const {
    list,
    total,
    loadingList,
    handlePagination,
    handleTableChange,
    rowSelection,
    handleCloseModal,
    handleSaveModal,
  } = useContentModal(
    loadList,
    setLoadList,
    filter,
    handleUpdateNewFilter,
    handleResetFilter,
    handleSearch,
    getList,
    getTotal,
    selectedList,
  );
  const renderTableTitle = useCallback(() => {
    return (
      <div className='d-flex justify-content-end'>
        <Pagination
          skip={filter?.skip}
          take={filter?.take}
          total={total}
          onChange={handlePagination}
        />
      </div>
    );
  }, [filter, total, handlePagination]);

  const renderModalFooter = useMemo(
    () => (
      <div className='d-flex justify-content-end'>
        <button
          className='btn btn-sm component__btn-primary mr-2'
          onClick={handleSaveModal}
        >
          <span>
            <i className='tio-save' /> {translate("general.actions.save")}
          </span>
        </button>
        <button
          className='btn btn-sm component__btn-cancel'
          onClick={handleCloseModal}
        >
          <i className='tio-clear' /> {translate("general.actions.save")}
        </button>
      </div>
    ),
    [handleCloseModal, handleSaveModal],
  );

  return (
    <>
      <Modal
        {...props}
        style={{ top: 20 }}
        closable={false}
        destroyOnClose={true}
        wrapClassName={"content-modal__container"}
        footer={renderModalFooter}
      >
        {/* start filter zone */}
        <Card>
          <Row>
            <Col lg={8} className='pr-3'></Col>
          </Row>
        </Card>
        {/* end filter zone */}
        {/* start table zone */}
        <Table
          rowKey={nameof(list[0].id)}
          tableLayout='fixed'
          columns={columns}
          dataSource={list}
          loading={loadingList}
          rowSelection={rowSelection}
          onChange={handleTableChange}
          pagination={false}
          title={renderTableTitle}
        />
        {/* end table zone */}
      </Modal>
    </>
  );
}
