import { storiesOf } from "@storybook/react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { IdFilter } from "react3l-advanced-filters/IdFilter";
import { StringFilter } from "react3l-advanced-filters/StringFilter";
import { Model, ModelFilter } from "react3l/core";
import { Observable } from "rxjs";
import nameof from "ts-nameof.macro";
import Select from "./Select";
import FormItem, { ValidateStatus } from "../FormItem/FormItem";

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([]);
  }, 1000);
});

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

function Default() {
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Ban hành chính",
    code: "FAD",
  });

  const [selectModelFilter] = React.useState<ModelFilter>(new ModelFilter());

  const [isMaterial, setIsMaterial] = React.useState(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
  }, []);

  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);

  const handleRenderModel = React.useCallback((item: Model) => {
    if (item) {
      return item.name;
    } else {
      return "";
    }
  }, []);

  return (
    <div style={{ margin: "10px", width: "250px" }}>
      <Select
        placeHolder={"Select Organization"}
        model={selectModel}
        isMaterial={isMaterial}
        modelFilter={selectModelFilter}
        searchProperty={nameof(selectModel.name)}
        render={handleRenderModel}
        onChange={handleSetModel}
        getList={demoSearchFunc}
        classFilter={DemoFilter}
      />

      <div style={{ margin: "10px", width: "300px" }}>
        <FormItem validateStatus={ValidateStatus.error}
                label={'Select field:'}
                message={'Field required!'}
                hasIcon={!isMaterial}>
          <Select
            placeHolder={"Select Organization"}
            model={selectModel}
            isMaterial={isMaterial}
            modelFilter={selectModelFilter}
            searchProperty={nameof(selectModel.name)}
            render={handleRenderModel}
            onChange={handleSetModel}
            getList={demoSearchFunc}
            classFilter={DemoFilter}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
          <Radio value={true}>Material Style</Radio>
          <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

storiesOf("Select", module).add(nameof(Default), Default);
