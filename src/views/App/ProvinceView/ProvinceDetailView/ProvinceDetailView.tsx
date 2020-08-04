import React from 'react';
import 'views/App/ProvinceView/ProvinceDetailView/ProvinceDetailView.scss';
import Card from 'antd/lib/card';
import {useParams} from 'react-router';
import {formService} from 'services/form-service';
import {Province} from 'models/Province';
import {provinceRepository} from 'repositories/province-repository';
import ProvinceDistrictContentTable
  from 'views/App/ProvinceView/ProvinceDetailView/ProvinceDistrictContentTable/ProvinceDistrictContentTable';

function ProvinceDetailView() {
  const {id} = useParams();

  const [
    province,
    handleChangeSimpleField,
    handleChangeObjectField,
  ] = formService.useDetailForm<Province>(Province, id, provinceRepository.get);

  const handleChangeCode = formService.useChangeHandler<Province>(handleChangeSimpleField, 'code');

  const handleChangeName = formService.useChangeHandler<Province>(handleChangeSimpleField, 'name');

  const handleChangeAdministrativeType = formService.useChangeHandler<Province>(handleChangeObjectField, 'administrativeType');

  const handleChangeCodeByNativeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeCode(event.target.value);
    },
    [handleChangeCode],
  );

  const handleChangeNameByNativeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeName(event.target.value);
    },
    [handleChangeName],
  );

  return (
    <Card>
      <input
        type="text"
        defaultValue={province.code}
        onChange={handleChangeCodeByNativeInput}
      />
      <input
        type="text"
        defaultValue={province.name}
        onChange={handleChangeNameByNativeInput}
      />
      <select
        value={province.administrativeTypeId}
        onChange={handleChangeAdministrativeType}
      />
      <ProvinceDistrictContentTable
        onChangeSimpleField={handleChangeSimpleField}
        parentModel={province}
        fieldName=""
      />
    </Card>
  );
}

export default ProvinceDetailView;
