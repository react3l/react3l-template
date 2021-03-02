import { Model } from "@react3l/react3l/core";
import { SortOrder } from "antd/lib/table/interface";
import React from "react";

export class TableColumn {
  title: (() => JSX.Element) | JSX.Element | string;
  key: string;
  dataIndex: string;
  render: (...params: [any, any, number]) => JSX.Element | string | number;
  sorter?: boolean = false;
  sortOrder?: SortOrder;
  ellipsis?: boolean = false;
  width?: number = 120;
  children?: TableColumn[] = null;

  constructor(
    title?: (() => JSX.Element) | JSX.Element | string,
    key?: string,
    dataIndex?: string,
    render?: (...params: [any, any, number]) => JSX.Element | string | number,
    sorter?: boolean,
    sortOrder?: "descend" | "ascend",
    ellipsis?: boolean,
    width?: number,
    children?: any[],
  ) {
    this.title = title;
    this.key = key;
    this.dataIndex = dataIndex;
    this.render = render || tableColumnFactory.renderSimpleValue;
    this.sorter = sorter;
    this.sortOrder = sortOrder;
    this.ellipsis = ellipsis || false;
    this.width = width ? width : 120;
    this.children = children;
  }

  Title(title: (() => JSX.Element) | JSX.Element | string) {
    this.title = title;
    return this;
  }

  Key(key: string) {
    this.key = key;
    return this;
  }

  DataIndex(index: string) {
    this.dataIndex = index;
    return this;
  }

  Sorter(isSort: boolean = false) {
    this.sorter = isSort;
    return this;
  }

  SortOrder(sortOrder: "descend" | "ascend") {
    this.sortOrder = sortOrder;
    return this;
  }

  Ellipsis(isEllipsis: boolean) {
    this.ellipsis = isEllipsis;
    return this;
  }

  Width(width: number) {
    this.width = width;
    return this;
  }

  Render(
    render: (...params: [any, any, number]) => JSX.Element | string | number,
  ) {
    this.render = render;
    return this;
  }

  Children(...children: TableColumn[]) {
    this.children = children;
    return this;
  } // add multi Columns

  AddChild(child: TableColumn) {
    this.children ? this.children.push(child) : (this.children = [child]);
    return this;
  } // add single Column
}

export function CreateColumn() {
  return new TableColumn();
}

export function CreateTableColumns(...args: TableColumn[]) {
  return args;
}

export class TableAction<T extends Model> {
  title?: string;
  action?: (item: T) => void;
  item?: T;
  icon?: string;
  hasConfirm?: boolean = false;

  Title = (title: string) => {
    this.title = title;
    return this;
  };

  Action = (action: (item: T) => void) => {
    this.action = action;
    return this;
  };

  Icon = (icon: string) => {
    this.icon = icon;
    return this;
  };

  HasConfirm = (hasConfirm: boolean) => {
    this.hasConfirm = hasConfirm;
    return this;
  };
}

export function CreateTableAction() {
  return new TableAction();
}

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
