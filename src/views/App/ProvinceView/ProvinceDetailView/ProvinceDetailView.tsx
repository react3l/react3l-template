import Card from "antd/lib/card";
import { AdministrativeType } from "models/AdministrativeType";
import { Province } from "models/Province";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { administrativeTypeRepository } from "repositories/administrative-type-repository";
import { provinceRepository } from "repositories/province-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import "views/App/ProvinceView/ProvinceDetailView/ProvinceDetailView.scss";
import ProvinceDistrictContentTable from "views/App/ProvinceView/ProvinceDetailView/ProvinceDistrictContentTable/ProvinceDistrictContentTable";

function ProvinceDetailView() {
  const { id } = useParams();

  const [translate] = useTranslation();

  const [
    province,
    handleChangeSimpleField,
    handleChangeObjectField,
  ] = formService.useDetailForm<Province>(
    Province,
    parseInt(id),
    provinceRepository.get,
  );

  const [administrativeTypeList] = enumService.useEnumList<AdministrativeType>(
    administrativeTypeRepository.list,
  );

  const handleChangeCode = formService.useChangeHandler<Province>(
    handleChangeSimpleField,
    "code",
  );

  const handleChangeName = formService.useChangeHandler<Province>(
    handleChangeSimpleField,
    "name",
  );

  const handleChangeEnglishName = formService.useChangeHandler<Province>(
    handleChangeSimpleField,
    "englishName",
  );

  const handleChangeAdministrativeType = formService.useChangeHandler<Province>(
    handleChangeObjectField,
    "administrativeType",
  );

  return (
    <Card>
      <input
        type='text'
        className='form-control'
        defaultValue={province.code}
        placeholder={translate("province.code")}
        onChange={handleChangeCode}
      />
      <input
        type='text'
        className='form-control'
        defaultValue={province.name}
        placeholder={translate("province.name")}
        onChange={handleChangeName}
      />
      <input
        type='text'
        className='form-control'
        defaultValue={province.englishName}
        placeholder={translate("province.englishName")}
        onChange={handleChangeEnglishName}
      />
      <select
        className='form-control'
        value={province.administrativeTypeId}
        placeholder={translate("province.administrativeType")}
        onChange={handleChangeAdministrativeType}
      >
        {administrativeTypeList.map((administrativeType) => (
          <option key={administrativeType.id} value={administrativeType.id}>
            {administrativeType.name}
          </option>
        ))}
      </select>
      <ProvinceDistrictContentTable
        onChangeSimpleField={handleChangeSimpleField}
        parentModel={province}
        fieldName=''
      />
    </Card>
  );
}

export default ProvinceDetailView;
