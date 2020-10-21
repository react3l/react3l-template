import React from "react";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Observable } from "rxjs";
import { Moment } from "moment";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import AdvanceNumberRangeFilter from "components/Utility/AdvanceFilter/AdvanceNumberRangeFilter/AdvanceNumberRangeFilter";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import { translate } from "@react3l/react3l/helpers";
import { Tooltip } from "antd";
import { Popconfirm } from "antd";

export class ComponentFactoryService {
  RenderStringFilter(
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
  }

  RenderIdFilter<TFilter extends ModelFilter>(
    value: string | number,
    onChange: (t: number) => void,
    classFilter: new () => TFilter,
    getList: (filter: any) => Observable<any>,
    placeholder?: string,
  ) {
    return (
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
  }

  RenderDateFilter(
    value: Moment | [Moment, Moment],
    onChange: (value: Moment | [Moment, Moment], dateString?: string) => void,
    type: "single" | "range",
    placeholder?: string,
  ) {
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
        placeholder={placeholder as string}
      />
    );
  }

  RenderNumberFilter(
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
  }

  RenderAction = (columnAction: any) => {
    const { title, action, item, icon, hasConfirm } = columnAction;
    if (hasConfirm) {
      return (
        <Popconfirm
          placement='left'
          title={title}
          onConfirm={() => action(item)}
          okText={translate("general.actions.delete")}
          cancelText={translate("general.actions.cancel")}
        >
          <Tooltip title={title}>
            <button className='btn border-less gradient-btn-icon'>
              <i className={icon} />
            </button>
          </Tooltip>
        </Popconfirm>
      );
    }
    return (
      <Tooltip title={title}>
        <button className='btn border-less gradient-btn-icon'>
          <i className={icon} />
        </button>
      </Tooltip>
    );
  };

  RenderActionColumn = <T extends Model>(...columnActions: any[]) => {
    return (...params: [string | number, T, number]) => (
      <div className='d-flex justify-content-center button-action-table'>
        {columnActions?.length > 0 &&
          columnActions.map((actionItem, index) => (
            <React.Fragment key={index}>
              {this.RenderAction({ ...actionItem, item: params[1] })}
            </React.Fragment>
          ))}
      </div>
    );
  };
}

export const componentFactoryService = new ComponentFactoryService();
