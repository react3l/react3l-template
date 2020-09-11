import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import Pagination from "./Pagination";
import { ModelFilter } from "@react3l/react3l/core/model-filter";
import { IdFilter } from "@react3l/advanced-filters/IdFilter";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";

export class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

function Default() {
  const [filter, setFilter] = React.useState<DemoFilter>(new DemoFilter());

  const handleChangeFilter = React.useCallback(
    (page: number, pageSize?: number) => {
      setFilter({
        ...filter,
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    },
    [filter],
  );

  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        width: "500px",
        background: "#fff",
        height: "300px",
      }}
    >
      <Pagination
        skip={filter.skip}
        take={filter.take}
        onChange={handleChangeFilter}
        style={{ margin: "10px" }}
      />
    </div>
  );
}

storiesOf("Pagination", module).add(nameof(Default), Default);
