import React from 'react';
import './ProvinceDistrictContentTable.scss';
import {formService} from 'services/form-service';
import {Province} from 'models/Province';
import {District} from 'models/District';
import {Model} from 'react3l/core';
import Table, {ColumnProps} from 'antd/lib/table';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';

interface ProvinceDistrictContentTableProps<T extends Model, TContent extends Model> {
  parentModel: T;

  onChangeSimpleField: (fieldName: keyof T) => (fieldValue: T[keyof T]) => void;

  fieldName: keyof T;
}

function ProvinceDistrictContentTable(props: ProvinceDistrictContentTableProps<Province, District>) {
  const [translate] = useTranslation();

  const {parentModel, onChangeSimpleField} = props;

  const [
    districts,
    handleChangeDistrictField,
  ] = formService.useContentField<Province, District>(District, parentModel, 'districts', onChangeSimpleField);

  const columns: ColumnProps<District>[] = React.useMemo(
    () => [
      {
        title: translate('district.id'),
        key: nameof(districts[0].id),
        dataIndex: nameof(districts[0].id),
        render(id: number, district: District, index: number) {
          return (
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={handleChangeDistrictField(index, 'id')}
            />
          );
        },
      },
      {
        title: translate('district.name'),
        key: nameof(districts[0].name),
        dataIndex: nameof(districts[0].name),
        render(name: string, district: District, index: number) {
          return (
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChangeDistrictField(index, 'name')}
            />
          );
        },
      },
    ],
    [districts, handleChangeDistrictField, translate],
  );

  return (
    <Table
      dataSource={districts}
      columns={columns}
    />
  );
}

export default ProvinceDistrictContentTable;
