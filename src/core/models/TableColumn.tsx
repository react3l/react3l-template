import React from "react";
import { SortOrder } from "antd/lib/table/interface";

export class TableColumn {
  title: string | JSX.Element;
  key: string;
  dataIndex: string;
  render: (value: string | number) => JSX.Element = renderSimpleValue;
  sorter?: boolean = false;
  sortOrder?: SortOrder;
  ellipsis?: boolean = false;
  width?: number = 120;
  children?: TableColumn[] = null;

  constructor(
    title?: string | JSX.Element,
    key?: string,
    dataIndex?: string,
    render?: (value: string | number | Object) => JSX.Element,
    sorter?: boolean,
    ellipsis?: boolean,
    width?: number,
    children?: any[],
  ) {
    this.title = title || "";
    this.key = key;
    this.dataIndex = dataIndex;
    this.render = render || renderSimpleValue;
    this.sorter = sorter || false;
    this.ellipsis = ellipsis || false;
    this.width = width ? width : 120;
    this.children = children;
  }

  // support two layers
  nestedRender = (column: TableColumn) => {
    if (column.hasOwnProperty("children")) {
      const newChildren = [];
      column["children"].forEach((child) => {
        const item = {
          title: child[0],
          key: child[1],
          dataIndex: child[2],
          render: child[3],
        };
        newChildren.push(item);
      });
      return {
        ...column,
        children: newChildren,
      };
    }
    return column;
  };
}

const renderSimpleValue = (value: string | number | object) => {
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
  return <>value</>;
};
