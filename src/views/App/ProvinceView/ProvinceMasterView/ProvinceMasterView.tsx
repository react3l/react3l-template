import React from 'react';
import 'views/App/ProvinceView/ProvinceMasterView/ProvinceMasterView.scss';
import Table, {ColumnProps} from 'antd/lib/table';
import {tableService} from 'services/table-service';
import {Province} from 'models/Province';
import {ProvinceFilter} from 'models/ProvinceFilter';
import {provinceRepository} from 'repositories/province-repository';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import Button from 'antd/lib/button';
import {Link} from 'react-router-dom';

function ProvinceMasterView() {
  const [translate] = useTranslation();

  const [
    provinceList,
    provinceFilter,
    provinceLoading,
    pagination,
    handleChange,
  ] = tableService.useMasterTable<Province, ProvinceFilter>(
    ProvinceFilter,
    provinceRepository.list,
    provinceRepository.count,
  );

  const [
    rowSelection,
    selectedRowKeys,
  ] = tableService.useRowSelection<Province>();

  const [
    handleBatchDelete,
  ] = tableService.useBatchDelete(selectedRowKeys, provinceRepository.batchDelete);

  const columns: ColumnProps<Province>[] = React.useMemo(
    () => [
      {
        title: translate('province.id'),
        key: nameof(provinceList[0].id),
        dataIndex: nameof(provinceList[0].id),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].id)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('province.code'),
        key: nameof(provinceList[0].code),
        dataIndex: nameof(provinceList[0].code),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].code)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('province.name'),
        key: nameof(provinceList[0].name),
        dataIndex: nameof(provinceList[0].name),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].name)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('province.englishName'),
        key: nameof(provinceList[0].englishName),
        dataIndex: nameof(provinceList[0].englishName),
        sorter: true,
        sortOrder: tableService.getAntOrderType(provinceFilter, nameof(provinceList[0].englishName)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate('general.table.actions'),
        key: tableService.getActionColumnName(Province),
        dataIndex: nameof(provinceList[0].id),
        render(id: number) {
          return (
            <>
              <Button type="link">
                {translate('general.actions.view')}
              </Button>
              <Button type="link">
                {translate('general.actions.edit')}
              </Button>
              <Button type="link">
                {translate('general.actions.delete')}
              </Button>
            </>
          );
        },
      },
    ],
    [provinceFilter, provinceList, translate],
  );

  return (
    <Table
      tableLayout="fixed"
      bordered={true}
      rowKey={nameof(provinceList[0].id)}
      columns={columns}
      dataSource={provinceList}
      loading={provinceLoading}
      pagination={pagination}
      onChange={handleChange}
      rowSelection={rowSelection}
      title={() => (
        <div className="d-flex justify-content-start">
          <Link to="/province/create">
            <Button type="primary" className="mr-2">
              {translate('general.actions.create')}
            </Button>
          </Link>
          <Button type="primary" onClick={handleBatchDelete}>
            {translate('general.actions.delete')}
          </Button>
        </div>
      )}
    />
  );
}

export default ProvinceMasterView;
