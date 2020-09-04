import { SortOrder } from "antd/lib/table/interface";
import { tableColumnFactory } from "services/component-factory/table-column-service";

export class TableColumn {
  title: () => JSX.Element | JSX.Element;
  key: string;
  dataIndex: string;
  render: (value: string | number | object) => JSX.Element;
  sorter?: boolean = false;
  sortOrder?: SortOrder;
  ellipsis?: boolean = false;
  width?: number = 120;
  children?: TableColumn[] = null;

  constructor(
    title?: () => JSX.Element | JSX.Element,
    key?: string,
    dataIndex?: string,
    render?: (value: string | number | object) => JSX.Element,
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
    this.sorter = sorter || false;
    this.sortOrder = sortOrder || "ascend";
    this.ellipsis = ellipsis || false;
    this.width = width ? width : 120;
    this.children = children;
  }
}
