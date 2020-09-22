import React from "react";
import nameof from "ts-nameof.macro";
import { PriceList, PriceListStoreMappings } from "models/PriceList";
import detailService from "services/pages/detail-service";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/AdvanceFilterService";
import { PriceListStoreMappingsFilter } from "models/PriceList/PriceListStoreMappingsFilter";
import { CreateColumn, CreateTableColumns } from "core/models/TableColumn";
import { useTranslation } from "react-i18next";
import { IdFilter } from "@react3l/advanced-filters";
import { masterTableIndex } from "helpers/table";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { StoreTypeFilter } from "models/StoreTypeFilter";
import { priceListRepository } from "repositories/price-list-repository";

export function usePriceListStoreMappingsTable(
  model: PriceList,
  setModel: (data: PriceList) => void,
) {
  const [translate] = useTranslation();
  const {
    content: storeMappingContents,
    setContent: setStoreMappingContents,
  } = detailService.useContentList(
    model,
    setModel, // update content has sideEffect update model
    nameof(model.priceListStoreMappings),
  );

  const [
    priceListStoreMappingsFilter,
    dispatchPriceListStoreMappingsFilter,
  ] = React.useReducer<
    React.Reducer<
      PriceListStoreMappingsFilter,
      AdvanceFilterAction<PriceListStoreMappingsFilter>
    >
  >(advanceFilterReducer, new PriceListStoreMappingsFilter()); // filter factory

  const { handleChangeFilter } = advanceFilterService.useChangeAdvanceFilter<
    PriceListStoreMappingsFilter
  >(
    priceListStoreMappingsFilter,
    dispatchPriceListStoreMappingsFilter,
    PriceListStoreMappingsFilter,
  ); // filter service

  const priceListStoreMappingsContentColumns = React.useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(() => <>{translate("general.columns.index")}</>)
          .Key("index") // key
          .Render(
            masterTableIndex<
              PriceListStoreMappings,
              PriceListStoreMappingsFilter
            >(priceListStoreMappingsFilter),
          ), // render
        CreateColumn()
          .Title(() => <>{translate("priceLists.store.code")}</>)
          .Key(nameof(storeMappingContents[0].storeCode)) //Key
          .DataIndex(nameof(storeMappingContents[0].storeCode))
          .AddChild(
            CreateColumn()
              .Title(() => (
                <>
                  <AdvanceIdFilter
                    value={priceListStoreMappingsFilter["storeTypeId"]["equal"]}
                    onChange={handleChangeFilter(
                      nameof(storeMappingContents[0].storeTypeId),
                      "equal" as any,
                      IdFilter,
                    )}
                    classFilter={StoreTypeFilter}
                    getList={priceListRepository.filterListStoreType}
                    placeHolder={translate("general.filter.idFilter")} // -> tat ca
                  />
                </>
              ))
              .DataIndex(nameof(storeMappingContents[0].storeType)),
          ), // dataIndex
      ),
    [
      priceListStoreMappingsFilter,
      handleChangeFilter,
      storeMappingContents,
      translate,
    ],
  );

  return {
    priceListStoreMappingsFilter,
    dispatchPriceListStoreMappingsFilter,
    storeMappingContents,
    setStoreMappingContents,
    priceListStoreMappingsContentColumns,
  };
}

export function usePriceListStoreMappingsModal() {
  return {};
}
