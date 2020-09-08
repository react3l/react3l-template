import React from "react";
import { ModelFilter, Model } from "react3l/core";
import { StringFilter } from "react3l-advanced-filters/StringFilter";
import { NumberFilter } from "react3l-advanced-filters/NumberFilter";
import { queryStringService } from "services/QueryStringService";
import { advanceFilterService } from "services/AdvanceFilterService";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import { Observable } from "rxjs";
import { IdFilter } from "react3l-advanced-filters/IdFilter";
import { DateFilter } from "react3l-advanced-filters/DateFilter";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceNumberRangeFilter from "components/Utility/AdvanceFilter/AdvanceNumberRangeFilter/AdvanceNumberRangeFilter";
import Pagination from "components/Utility/Pagination/Pagination";

class DemoFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  number: NumberFilter = new NumberFilter();
  numberRange: NumberFilter = new NumberFilter();
  date: DateFilter = new DateFilter();
  dateRange: DateFilter = new DateFilter();
  skip: number = 0;
  take: number = 10;
}

export class DemoListFilter extends ModelFilter {
  id: IdFilter = new IdFilter();
  name: StringFilter = new StringFilter();
  code: StringFilter = new StringFilter();
}

const demoObservable = new Observable<Model[]>((observer) => {
  setTimeout(() => {
    observer.next([
      { id: 4, name: "Ban hành chính", code: "FAD" },
      { id: 1, name: "Ban công nghệ thông tin", code: "FIM" },
      { id: 2, name: "Ban nhân sự", code: "FHR" },
      { id: 3, name: "Ban tài chính", code: "FAF" },
    ]);
  }, 1000);
});

const demoSearchFunc = (TModelFilter: ModelFilter) => {
  return demoObservable;
};

function IndirectSalesOrderMasterView() {
  const [
    filter,
    ,
    dispatch,
    handleChangeFilter,
    ,
    handlePagination,
    handleResetFilter,
  ] = queryStringService.useQueryString<Model, DemoFilter>(DemoFilter);

  const [
    ,
    ,
    ,
    ,
    ,
  ] = advanceFilterService.useFilter<DemoFilter>(filter, dispatch, DemoFilter);

  const [valueString, setValueString] = advanceFilterService.useAdvaceFilter<
    DemoFilter,
    StringFilter
  >(filter, dispatch, "name", "startWith", StringFilter);

  const [valueNumber, setValueNumber] = advanceFilterService.useAdvaceFilter<
    DemoFilter,
    NumberFilter
  >(filter, dispatch, "number", "equal", NumberFilter);

  const [valueId, setValueId] = advanceFilterService.useAdvaceFilter<
    DemoFilter,
    IdFilter
  >(filter, dispatch, "id", "equal", IdFilter);

  const [valueDate, setValueDate] = advanceFilterService.useAdvaceFilter<
    DemoFilter,
    DateFilter
  >(filter, dispatch, "date", "equal", DateFilter);

  const [
    valueDateRange,
    setValueDateRange,
  ] = advanceFilterService.useDateRangeFilter<DemoFilter, DateFilter>(
    filter,
    dispatch,
    "dateRange",
  );

  const [
    valueNumberRange,
    setValueNumberRange,
  ] = advanceFilterService.useNumberRangeFilter(
    filter,
    dispatch,
    "numberRange",
  );

  return (
    <>
      <div style={{ marginTop: "10px", width: "220px" }}>
        <AdvanceStringFilter
          value={valueString}
          onChange={setValueString}
          placeHolder={"Enter text..."}
        />
      </div>

      <div style={{ marginTop: "10px", width: "220px" }}>
        <AdvanceStringFilter
          value={filter["name"]["startWith"]}
          onChange={handleChangeFilter("name", "startWith")}
          placeHolder={"Enter text..."}
        />
      </div>

      <div style={{ marginTop: "10px", width: "220px" }}>
        <AdvanceNumberFilter
          value={valueNumber}
          allowPositive={true}
          numberType={"DECIMAL"}
          onChange={setValueNumber}
          placeHolder={"Enter number..."}
        />
      </div>

      <div style={{ marginTop: "10px", width: "220px" }}>
        <AdvanceIdFilter
          value={valueId}
          classFilter={DemoListFilter}
          onChange={setValueId}
          placeHolder={"Select id..."}
          getList={demoSearchFunc}
        />
      </div>

      <div style={{ marginTop: "10px", width: "220px" }}>
        <AdvanceDateFilter onChange={setValueDate} value={valueDate} />
      </div>

      <div style={{ marginTop: "10px", width: "220px" }}>
        <AdvanceDateRangeFilter
          onChange={setValueDateRange}
          value={valueDateRange}
        />
      </div>

      <div style={{ marginTop: "10px", width: "250px" }}>
        <AdvanceNumberRangeFilter
          placeHolderRange={["From...", "To..."]}
          valueRange={valueNumberRange}
          onChangeRange={setValueNumberRange}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <Pagination
          skip={filter.skip}
          take={filter.take}
          onChange={handlePagination}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button className='btn btn-info' onClick={handleResetFilter}>
          ResetFilter
        </button>
      </div>
    </>
  );
}

export default IndirectSalesOrderMasterView;
