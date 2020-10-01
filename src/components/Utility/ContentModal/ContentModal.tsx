import React, { ReactNode } from "react";
import "./ContentModal.scss";
import nameof from "ts-nameof.macro";
import Modal, { ModalProps } from "antd/lib/modal";
import { Model } from "@react3l/react3l/core/model";
import { ModelFilter } from "@react3l/react3l/core";
import { ColumnProps } from "antd/lib/table/Column";
import { Card, Table } from "antd";
import Pagination from "../Pagination/Pagination";
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
  return <></>;
}

export default ContentModal;
