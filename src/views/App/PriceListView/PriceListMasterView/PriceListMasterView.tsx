import Card from "antd/lib/card";
import Table, { ColumnProps } from "antd/lib/table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import filterService from "services/filter-service";
import { PriceListFilter, PriceList } from "models/PriceList";
import tableService from "services/tbl-service";
import { priceListRepository } from "repositories/price-list-repository";
import { Tooltip } from "antd";
import { renderMasterIndex } from "helpers/table";
import nameof from "ts-nameof.macro";

const { Text } = Typography;

function PriceListMasterView() {
  const [translate] = useTranslation();

  const { filter, setFilter } = filterService.useUrlQuery(PriceListFilter);

  const {
    list,
    total,
    loadingList,
    pagination,
    handleChange,
    handleServerDelete,
    // handleServerBulkDelete,
    rowSelection,
  } = tableService.useTable<PriceList, PriceListFilter>(
    filter,
    setFilter,
    priceListRepository.list,
    priceListRepository.count,
    priceListRepository.delete,
    priceListRepository.bulkDelete,
  );

  const columns: ColumnProps<PriceList>[] = useMemo(
    () => [
      {
        title: "STT",
        key: "index",
        width: 100,
        render: renderMasterIndex<PriceList>(pagination),
      },
      {
        title: "code",
        key: "code",
        dataIndex: "code",
        render(...[code]) {
          return <div className='display-code'>{code}</div>;
        },
      },
      {
        title: "action",
        key: "action",
        dataIndex: "id",
        width: 200,
        align: "center",
        render(id: number, priceList: PriceList) {
          return (
            <div className='d-flex justify-content-center button-action-table'>
              {/* {!product.used && validAction('delete') && ( */}
              <Tooltip title={"delete"}>
                <button
                  className='btn btn-sm btn-link text-danger'
                  onClick={() => handleServerDelete(priceList)}
                >
                  <i className='tio-delete_outlined' />
                </button>
              </Tooltip>
              {/* )} */}
            </div>
          );
        },
      },
    ],

    [handleServerDelete, pagination],
  );

  return (
    <Card title={<Text>{translate("province.master.title")}</Text>}>
      <div>{total}</div>
      <Table
        tableLayout='fixed'
        bordered={true}
        rowKey={nameof(list[0].id)}
        columns={columns}
        dataSource={list}
        loading={loadingList}
        pagination={pagination}
        onChange={handleChange}
        rowSelection={rowSelection}
        title={() => (
          <div className='d-flex justify-content-start'>
            <Link to='/province/create'>
              <Button type='primary' className='mr-2'>
                {translate("general.actions.create")}
              </Button>
            </Link>
            {/* <Button type='primary' onClick={handleBatchDelete}>
              {translate("general.actions.delete")}
            </Button> */}
          </div>
        )}
      />
    </Card>
  );
}

export default PriceListMasterView;
