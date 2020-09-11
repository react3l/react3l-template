import { District } from "models/District";
import { Province } from "models/Province";
import React from "react";
import { Model } from "@react3l/react3l/core";
import "./ProvinceDistrictContentTable.scss";

interface ProvinceDistrictContentTableProps<
  T extends Model,
  TContent extends Model
> {
  parentModel: T;

  onChangeSimpleField: (fieldName: keyof T) => (fieldValue: T[keyof T]) => void;

  fieldName: keyof T;
}

function ProvinceDistrictContentTable(
  props: ProvinceDistrictContentTableProps<Province, District>,
) {
  return <></>;
}

export default ProvinceDistrictContentTable;
