import React from "react";
import { ModelFilter } from "@react3l/react3l/core";
import { Observable } from "rxjs";
import { Moment } from "moment";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import AdvanceNumberRangeFilter from "components/Utility/AdvanceFilter/AdvanceNumberRangeFilter/AdvanceNumberRangeFilter";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import { translate } from "@react3l/react3l/helpers";

export const advanceFilterFactory = {
  renderStringFilter(
    value: string,
    onChange: (t: string) => void,
    placeholder: string,
    title?: string,
  ) {
    return (
      <AdvanceStringFilter
        value={value}
        onBlur={onChange}
        placeHolder={placeholder}
        title={title}
      />
    );
  },

  renderIdFilter<TFilter extends ModelFilter>(
    value: string | number,
    onChange: (t: number) => void,
    classFilter: new () => TFilter,
    getList: (filter: any) => Observable<any>,
    placeholder?: string,
  ) {
    return () => (
      <AdvanceIdFilter
        value={+value}
        onChange={onChange}
        classFilter={classFilter}
        placeHolder={
          placeholder ? placeholder : translate("genera.placeholder.idfilter") // default is selected All
        }
        getList={getList}
      />
    );
  },

  renderDateFilter(
    value: Moment | [Moment, Moment],
    onChange: (value: Moment | [Moment, Moment], dateString?: string) => void,
    type: "single" | "range",
  ) {
    return () => {
      if (type === "range") {
        return (
          <AdvanceDateRangeFilter
            onChange={onChange as (value: [Moment, Moment]) => void}
            value={value as [Moment, Moment]}
          />
        );
      }
      return (
        <AdvanceDateFilter
          onChange={onChange as (value: Moment) => void}
          value={value as Moment}
        />
      );
    };
  },

  renderNumberFilter(
    value: number | [number, number],
    placeholder: string | [string, string],
    onChange: (t: number | [number, number]) => void,
    type: "single" | "range",
    allowPositive: boolean = false,
    numberType: string = "DECIMAL",
    decimalDigit: number = 6,
  ) {
    if (type === "range") {
      return (
        <AdvanceNumberRangeFilter
          placeHolderRange={placeholder as [string, string]}
          valueRange={value as [number, number]}
          onChangeRange={onChange as (value: [number, number]) => void}
          allowPositive={allowPositive}
          numberType={numberType}
          decimalDigit={decimalDigit}
        />
      );
    }
    return (
      <AdvanceNumberFilter
        placeHolder={placeholder as string}
        value={value as number}
        onChange={onChange as (value: number) => void}
        allowPositive={allowPositive}
        numberType={numberType}
        decimalDigit={decimalDigit}
      />
    );
  },
};
