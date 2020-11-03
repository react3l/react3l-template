import { IdFilter } from "@react3l/advanced-filters/IdFilter";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { storiesOf } from "@storybook/react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { Observable, of } from "rxjs";
import nameof from "ts-nameof.macro";
import FormItem, { ValidateStatus } from "../FormItem/FormItem";
import Select from "./Select";

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

const demoListEnum = (TModelFilter: ModelFilter) => {
  return of([
    {id: 1, name: 'Enum 1', code: 'E1'},
    {id: 2, name: 'Enum 2', code: 'E2'},
    {id: 3, name: 'Enum 3', code: 'E3'}
  ]);
};

function Default() {
  const [selectModel, setSelectModel] = React.useState<Model>({
    id: 0,
    name: "Ban hành chính",
    code: "FAD",
  });

  const [enumModel, setEnumModel] = React.useState<Model>();

  const [selectModelFilter] = React.useState<ModelFilter>(new ModelFilter());

  const [isMaterial, setIsMaterial] = React.useState(false);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
  }, []);

  const handleSetModel = React.useCallback((...[, item]) => {
    setSelectModel(item);
  }, []);

  const handleSetEnum = React.useCallback((...[, item]) => {
    setEnumModel(item);
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
        <FormItem
          validateStatus={ValidateStatus.error}
          label={"Select field:"}
          message={"Field required!"}
          hasIcon={!isMaterial}
        >
          <Select
            placeHolder={"Select Organization"}
            model={selectModel}
            isMaterial={isMaterial}
            modelFilter={selectModelFilter}
            searchProperty={nameof(selectModel.name)}
            render={handleRenderModel}
            onChange={handleSetModel}
            getList={demoListEnum}
            classFilter={DemoFilter}
          />
        </FormItem>
      </div>

      <div style={{ margin: "10px", width: "300px" }}>
        <Select
          placeHolder={"Select Enum:"}
          model={enumModel}
          isMaterial={isMaterial}
          isEnumerable={true}
          render={handleRenderModel}
          onChange={handleSetEnum}
          getList={demoListEnum}
          classFilter={ModelFilter}
        />
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
