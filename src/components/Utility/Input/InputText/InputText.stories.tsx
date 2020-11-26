import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import { ModelFilter } from "@react3l/react3l/core";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import FormItem, { ValidateStatus } from "components/Utility/FormItem/FormItem";
import React, { Reducer } from "react";
import {
  AdvanceFilterAction, advanceFilterReducer, advanceFilterService
} from "services/advance-filter-service";
import InputText from "./InputText";

export class DemoFilter extends ModelFilter {
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

export function InputTextStories() {
  const [isMaterial, setIsMaterial] = React.useState(false);

  const [iconName, setIconName] = React.useState("");

  const [modelFilter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter>>
  >(advanceFilterReducer, new DemoFilter());

  const [value, setValue] = advanceFilterService.useStringFilter<DemoFilter>(
    modelFilter,
    dispatch,
    "name",
    "startWith",
  );

  const [inputValue, setInputVal] = React.useState();

  const handleChange = React.useCallback((value) => {
    setInputVal(value);
  }, []);

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
    if (event.target.value) {
      setIconName("tio-files_labeled_outlined");
    } else setIconName("");
  }, []);

  React.useEffect(() => {}, [modelFilter]);

  return (
    <div style={{ width: "250px", margin: "10px", backgroundColor: "#F2F2F2" }}>
      <InputText
        isMaterial={isMaterial}
        value={inputValue}
        onChange={handleChange}
        placeHolder={"Enter text..."}
        className={iconName}
      />

      <div style={{ marginTop: "10px", width: "100%" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          message={"Field required!"}
          hasIcon={!isMaterial}
        >
          <InputText
            isMaterial={isMaterial}
            value={value}
            onChange={setValue}
            placeHolder={"Enter text..."}
            className={iconName}
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
