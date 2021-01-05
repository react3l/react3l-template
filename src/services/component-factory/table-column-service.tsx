import { SortOrder } from "antd/lib/table/interface";
import { TableColumn } from "core/models/TableColumn";
import React from "react";

export interface ColumnData {
  title?: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  sorter?: boolean;
  sortOrder?: SortOrder;
  ellipsis?: boolean;
  renderTitle?: () => JSX.Element;
  renderContent?: (value: string | number | object) => JSX.Element;
  children?: ColumnData[];
}

export const tableColumnFactory = {
  renderSimpleValue(value: string | number | object): JSX.Element {
    if (value) {
      if (typeof value === "string") {
        return <div className='text-left'>{value}</div>;
      }
      if (typeof value === "number") {
        return <div className='text-right'>{value}</div>;
      }
      if (typeof value === "object") {
        if (value.hasOwnProperty("name")) {
          return <div className='text-left'>{value["name"]}</div>;
        }
        return <div className='text-left'>{value["displayName"]}</div>;
      }
    } else {
      return null;
    }
  },

  renderColumn(columnData: ColumnData): TableColumn {
    const {
      dataIndex,
      title,
      key,
      width,
      sorter,
      sortOrder,
      ellipsis,
      renderTitle,
      renderContent,
      children,
    } = columnData;
    // allow obmit renderContent
    let render = renderContent ? renderContent : this.renderSimpleValue;
    // render simple title or nested
    let columnTitle =
      typeof title !== "undefined" ? this.renderSimpleValue : renderTitle;
    // render nested column
    if (children?.length > 0) {
      const newChildren = children.map((child) => this.renderColumn(child));
      return new TableColumn(
        columnTitle,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        newChildren,
      );
    }

    return new TableColumn(
      columnTitle,
      key,
      dataIndex,
      render,
      sorter,
      sortOrder,
      ellipsis,
      width,
    );
  },

  renderTableColumn(data: ColumnData[]): TableColumn[] {
    return data.map((item) => this.renderColumn(item));
  },
};
