import React, { Reducer } from "react";
import InputNumber, { DECIMAL, LONG } from "./InputNumber";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { ModelFilter } from "@react3l/react3l/core/model-filter";
import { NumberFilter } from "@react3l/advanced-filters/NumberFilter";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/AdvanceFilterService";
import { Filter } from "@react3l/advanced-filters/Filter";
import FormItem, { ValidateStatus } from "components/Utility/FormItem/FormItem";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export function InputNumberStories() {
  const [numberType, setNumberType] = React.useState<string>(LONG);

  const [isReverse, setIsReverse] = React.useState(false);

  const [isMaterial, setIsMaterial] = React.useState(false);

  const [isPositive, setIsPositive] = React.useState(false);

  const [iconName, setIconName] = React.useState("");

  const [filter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter, Filter>>
  >(advanceFilterReducer, new DemoFilter());

  const [value, setValue] = advanceFilterService.useNumberFilter<DemoFilter>(
    filter,
    dispatch,
    "number",
    "equal",
  );

  const handleChangeType = React.useCallback(
    (event: RadioChangeEvent) => {
      setNumberType(event.target.value);
      setValue(undefined);
    },
    [setValue],
  );

  const handleChangeSeperation = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsReverse(event.target.value);
      setValue(undefined);
    },
    [setValue],
  );

  const handleChangeStyle = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsMaterial(event.target.value);
      setValue(undefined);
      if (event.target.value) {
        setIconName("tio-dollar");
      } else setIconName("");
    },
    [setValue],
  );

  const handleChangePositive = React.useCallback(
    (event: RadioChangeEvent) => {
      setIsPositive(event.target.value);
      setValue(undefined);
    },
    [setValue],
  );

  React.useEffect(() => {}, [filter]);

  return (
    <div style={{ width: "250px", margin: "10px", backgroundColor: "#F2F2F2" }}>
      <InputNumber
        placeHolder={"Enter number..."}
        className={iconName}
        value={value}
        onChange={setValue}
        isMaterial={isMaterial}
        numberType={numberType}
        isReverseSymb={isReverse}
        allowPositive={isPositive}
      />
      <div style={{ marginTop: "10px", width: "250px" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          label={"Title Form: "}
          message={"Field required!"}
          hasIcon={!isMaterial}
        >
          <InputNumber
            placeHolder={"Enter number..."}
            className={iconName}
            value={value}
            onChange={setValue}
            isMaterial={isMaterial}
            numberType={numberType}
            isReverseSymb={isReverse}
            allowPositive={isPositive}
          />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeType} value={numberType}>
          <Radio value={DECIMAL}>Decimal</Radio>
          <Radio value={LONG}>Long</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeSeperation} value={isReverse}>
          <Radio value={true}>Reverse Seperation</Radio>
          <Radio value={false}>Normal</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangePositive} value={isPositive}>
          <Radio value={true}>Allow Positive</Radio>
          <Radio value={false}>Not Allow Positive</Radio>
        </Radio.Group>
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
