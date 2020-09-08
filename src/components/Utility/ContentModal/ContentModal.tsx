import React, { ReactNode } from "react";
import "./ContentModal.scss";
import nameof from "ts-nameof.macro";
import Modal, { ModalProps } from "antd/lib/modal";
import { Model } from "@react3l/react3l/core/model";
import { ModelFilter } from "@react3l/react3l/core";
import { ColumnProps } from "antd/lib/table/Column";
import { Card, Table } from "antd";
import Pagination from "../Pagination/Pagination";
import { tableService } from "services/TableService";
import { translate } from "@react3l/react3l/helpers/i18n";

export interface ContentModalProps<
  T extends Model,
  TFilter extends ModelFilter
> extends ModalProps {
  children: ReactNode;

  selectedKeys?: T[];

  list?: T[];

  loading?: boolean;

  columns?: ColumnProps<T>[];

  filter?: TFilter;

  total?: number;

  handlePagination?: (skip: number, take: number) => void;

  handleCancel?: () => void;

  handleSave?: () => void;
}

function ContentModal(props: ContentModalProps<Model, ModelFilter>) {
  const {
    children,
    list,
    loading,
    columns,
    filter,
    total,
    handlePagination,
    handleCancel,
    handleSave,
  } = props;

  const [rowSelection] = tableService.useRowSelection<Model>();

  const renderTitle = React.useCallback(() => {
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

  return (
    <>
      <Modal
        {...props}
        style={{ top: 20 }}
        closable={false}
        destroyOnClose={true}
        wrapClassName={"content-modal__container"}
        footer={[
          <button
            className='btn btn-sm component__btn-cancel'
            key='cancel'
            onClick={handleCancel}
          >
            {translate("general.actions.cancel")}
          </button>,
          <button
            className='btn btn-sm component__btn-primary'
            key='save'
            onClick={handleSave}
          >
            {translate("general.actions.save")}
          </button>,
        ]}
      >
        <Card>{children}</Card>
        <div className='content-modal__table'>
          <Table
            rowKey={nameof(list[0].id)}
            tableLayout='fixed'
            columns={columns}
            dataSource={list}
            loading={loading}
            rowSelection={rowSelection}
            pagination={false}
            title={renderTitle}
          />
        </div>
      </Modal>
    </>
  );
}

export default ContentModal;
