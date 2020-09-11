import Radio, { RadioChangeEvent } from "antd/lib/radio";
import React, { Reducer } from "react";
import { NumberFilter } from "@react3l/advanced-filters/NumberFilter";
import { ModelFilter } from "@react3l/react3l/core";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/AdvanceFilterService";
import AdvanceNumberRangeFilter from "./AdvanceNumberRangeFilter";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export function AdvanceNumberRangeFilterStories() {
  const [isTitle, setIsTitle] = React.useState(false);

  const [title, setTitle] = React.useState("");

  const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
    setIsTitle(event.target.value);
    if (event.target.value) {
      setTitle("Input text");
    } else setTitle("");
  }, []);

  const [filter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter>>
  >(advanceFilterReducer, new DemoFilter());

  const [
    numberRange,
    setNumberRange,
  ] = advanceFilterService.useNumberRangeFilter(filter, dispatch, "number");

  return (
    <div style={{ width: "250px", margin: "10px", backgroundColor: "#F2F2F2" }}>
      <AdvanceNumberRangeFilter
        placeHolderRange={["From...", "To..."]}
        title={title}
        valueRange={numberRange}
        onChangeRange={setNumberRange}
      />
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeTitle} value={isTitle}>
          <Radio value={true}>Titled</Radio>
          <Radio value={false}>Untitled</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
