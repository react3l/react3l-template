import React, { Dispatch, SetStateAction, useMemo, useCallback } from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import Modal, { ModalProps } from "antd/lib/modal";
import { Card, Table, Row, Col } from "antd";
import nameof from "ts-nameof.macro";
import "./ContentModal.scss";
import { useContentModal } from "./ContentModalHook";
import { Observable } from "rxjs";
import { translate } from "@react3l/react3l/helpers/i18n";
import { TableColumn } from "core/models/TableColumn";
import Pagination from "components/Utility/Pagination/Pagination";

export interface ContentModalProp<
  TContent extends Model, // Eg: priceListStoreMappings[]
  TMapper extends Model, // Eg: Store[]
  TFilter extends ModelFilter // Eg: StoreFilter
> extends ModalProps {
  content: TContent[];
  setContent: (content: TContent[]) => void;
  filter: TFilter;
  onUpdateNewFilter: (filter: TFilter) => void;
  onResetFilter: () => void;
  onSearch: () => void;
  getList: (filter: TFilter) => Observable<TMapper[]>;
  getTotal: (filter: TFilter) => Observable<number>;
  loadList: boolean;
  setLoadList: Dispatch<SetStateAction<boolean>>;
  selectedList: TMapper[];
  columns: TableColumn[];
  filterList: JSX.Element[];
  mapperField: string;
  mapper: (item: TContent | TMapper) => TContent;
  onSave: (mapperList: TMapper[]) => void;
  onClose: () => void;
}
export default function ContentModal<
  TContent extends Model,
  TMapper extends Model,
  TFilter extends ModelFilter
>(props: ContentModalProp<TContent, TMapper, TFilter>) {
  const {
    filter,
    loadList,
    setLoadList,
    onUpdateNewFilter,
    onResetFilter,
    onSearch,
    getList,
    getTotal,
    selectedList,
    columns,
    filterList,
    onSave,
    onClose,
    content,
    setContent,
    mapperField,
    mapper,
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
    content,
    setContent,
    loadList,
    setLoadList,
    filter,
    onUpdateNewFilter,
    onResetFilter,
    onSearch,
    getList,
    getTotal,
    selectedList,
    mapper,
    mapperField,
    onClose,
    onSave,
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
          onClick={handleSaveModal(list)}
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
    [handleCloseModal, handleSaveModal, list],
  ); // need to migrate to component factory service

  const renderModalFilters = useMemo(() => {
    if (filterList?.length > 0) {
      return filterList.map((component: JSX.Element, index: number) => (
        <Col lg={8} className='pr-3' key={index}>
          {component}
        </Col>
      ));
    }
    return null;
  }, [filterList]); // need to migrate to component factory service

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
        <div className='page__detail-tabs mb-3'>
          <Card>
            <Row>{renderModalFilters}</Row>
          </Card>
        </div>
        {/* end filter zone */}
        {/* start table zone */}
        <div className='page__detail-tabs'>
          <Card>
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
          </Card>
        </div>
        {/* end table zone */}
      </Modal>
    </>
  );
}
