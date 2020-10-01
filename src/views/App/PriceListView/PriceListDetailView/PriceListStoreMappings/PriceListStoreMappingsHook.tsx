import React from "react";
import nameof from "ts-nameof.macro";
import { PriceList, PriceListStoreMappings } from "models/PriceList";
import detailService from "services/pages/detail-service";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import { PriceListStoreMappingsFilter } from "models/PriceList/PriceListStoreMappingsFilter";
import { CreateColumn, CreateTableColumns } from "core/models/TableColumn";
import { useTranslation } from "react-i18next";
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { masterTableIndex } from "helpers/table";
import { StoreTypeFilter } from "models/StoreTypeFilter";
import { priceListRepository } from "repositories/price-list-repository";
import { StoreFilter } from "models/StoreFilter";
import { Store } from "antd/lib/form/interface";
import tableService, {
  mappingToMapper,
  getAntOrderType,
} from "services/table-service";
import { advanceFilterFactory } from "services/component-factory/component-factory-service";
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

  const {
    renderStringFilter,
    renderIdFilter,
    // renderDateFilter,
  } = advanceFilterFactory;

  const [
    priceListStoreMappingsFilter,
    dispatchPriceListStoreMappingsFilter,
  ] = React.useReducer<
    React.Reducer<
      PriceListStoreMappingsFilter,
      AdvanceFilterAction<PriceListStoreMappingsFilter>
    >
  >(advanceFilterReducer, new PriceListStoreMappingsFilter()); // filter factory

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleChangeFilter,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<PriceListStoreMappingsFilter>(
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
          .Sorter(true) // if setSorter === true ...
          .SortOrder(
            getAntOrderType<
              PriceListStoreMappings,
              PriceListStoreMappingsFilter
            >(
              priceListStoreMappingsFilter,
              nameof(storeMappingContents[0].storeCode),
            ),
          ) // ... so, you need to have setSortOder
          .AddChild(
            CreateColumn()
              .Title(
                renderStringFilter(
                  priceListStoreMappingsFilter["storeCode"]["contain"],
                  handleChangeFilter(
                    "storeCode",
                    "contain" as any,
                    StringFilter,
                  ),
                  translate("priceList.filter.storeCode"),
                ),
              )
              .DataIndex(nameof(storeMappingContents[0].storeCode)), // dataIndex for render storeType value
          ),
        CreateColumn()
          .Title(() => <>{translate("priceLists.store.name")}</>)
          .Key(nameof(storeMappingContents[0].storeName)) //Key
          .DataIndex(nameof(storeMappingContents[0].storeName))
          .Sorter(true) // if setSorter === true ...
          .SortOrder(
            getAntOrderType<
              PriceListStoreMappings,
              PriceListStoreMappingsFilter
            >(
              priceListStoreMappingsFilter,
              nameof(storeMappingContents[0].storeName),
            ),
          ) // ... so, you need to have setSortOder
          .AddChild(
            CreateColumn()
              .Title(
                renderStringFilter(
                  priceListStoreMappingsFilter["storeName"]["contain"],
                  handleChangeFilter(
                    "storeName",
                    "contain" as any,
                    StringFilter,
                  ),
                  translate("priceList.filter.storeName"),
                ),
              )
              .DataIndex(nameof(storeMappingContents[0].storeName)), // dataIndex for render storeType value
          ),
        CreateColumn()
          .Title(() => <>{translate("priceLists.store.storeType")}</>)
          .Key(nameof(storeMappingContents[0].storeTypeName)) //Key
          .DataIndex(nameof(storeMappingContents[0].storeTypeName))
          .Sorter(true) // if setSorter === true ...
          .SortOrder(
            getAntOrderType<
              PriceListStoreMappings,
              PriceListStoreMappingsFilter
            >(
              priceListStoreMappingsFilter,
              nameof(storeMappingContents[0].storeTypeName),
            ),
          ) // ... so, you need to have setSortOder
          .AddChild(
            CreateColumn()
              .Title(
                renderIdFilter(
                  priceListStoreMappingsFilter["storeTypeId"]["equal"],
                  handleChangeFilter("storeTypeId", "equal" as any, IdFilter),
                  StoreTypeFilter,
                  priceListRepository.filterListStoreType,
                ),
              )
              .Key(nameof(storeMappingContents[0].storeType)) //Key
              .DataIndex(nameof(storeMappingContents[0].storeType)), // dataIndex for render storeType value
          ),
      ),
    [
      priceListStoreMappingsFilter,
      storeMappingContents,
      renderStringFilter,
      handleChangeFilter,
      translate,
      renderIdFilter,
    ],
  );

  return {
    loadPriceListStoreMappingsList: loadList,
    setLoadPriceListStoreMappingsList: setLoadList,
    handleSearchPriceListStoreMappings: handleSearch,
    handleUpdateNewPriceListStoreMappingsFilter: handleUpdateNewFilter,
    handleResetPriceListStoreMappingsFilter: handleResetFilter,
    priceListStoreMappingsFilter,
    dispatchPriceListStoreMappingsFilter,
    storeMappingContents,
    setStoreMappingContents,
    priceListStoreMappingsContentColumns,
  };
}

export function usePriceListStoreMappingsModal(source: PriceListStoreMappings) {
  const [translate] = useTranslation();
  const [storeFilter, dispatchStoreFilter] = React.useReducer<
    React.Reducer<StoreFilter, AdvanceFilterAction<StoreFilter>>
  >(advanceFilterReducer, new StoreFilter()); // filter factory

  const {
    renderStringFilter,
    // renderIdFilter,
    // renderDateFilter,
  } = advanceFilterFactory;

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleChangeFilter,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useChangeAdvanceFilter<StoreFilter>(
    storeFilter,
    dispatchStoreFilter,
    StoreFilter,
    false, // default loadList
  );

  const selectedStoreList = React.useMemo(
    () => (source.length > 0 ? source.map(mappingToMapper("store")) : []),
    [source],
  ); // calculate selectedList from updated source

  const storeModalFilters = React.useMemo(
    () => [
      renderStringFilter(
        storeFilter["code"]["contain"],
        handleChangeFilter("code", "contain" as any, StringFilter),
        translate("priceList.filter.name"),
      ),
    ],
    [handleChangeFilter, renderStringFilter, storeFilter, translate],
  );

  const storeColumns = React.useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(translate("general.columns.index"))
          .Key("index") // key
          .Render(masterTableIndex<Store, StoreFilter>(storeFilter)), // render
        CreateColumn()
          .Title(translate("priceLists.store.code"))
          .Key("code") // key
          .DataIndex("code"),
        CreateColumn()
          .Title(translate("priceLists.store.name"))
          .Key("name") // key
          .DataIndex("name"),
      ),
    [storeFilter, translate],
  );

  const {
    visible,
    loadControl,
    handleEndControl,
    handleOpenModal,
    handleCloseModal,
    handleSaveModal,
  } = tableService.useContenModal(handleSearch); // state for modal

  React.useEffect(() => {
    if (loadControl) {
      handleSearch();
      handleEndControl();
    }
  }, [handleSearch, loadControl, handleEndControl]); // subscribe event emitter

  return {
    storeModalFilters,
    visibleStore: visible, // state for modal visibility
    handleOpenStoreModal: handleOpenModal,
    handleCloseStoreModal: handleCloseModal, // close modal as onClose props in modal
    handleSaveStoreModal: handleSaveModal, // save modal as onSave props in modal
    selectedStoreList, // for default selectedRowKeys
    storeFilter,
    dispatchStoreFilter,
    storeColumns, // columns for modal table
    loadStoreList: loadList,
    setLoadStoreList: setLoadList,
    handleSearchStore: handleSearch,
    handleUpdateNewStoreFilter: handleUpdateNewFilter,
    handleResetStoreFilter: handleResetFilter,
  };
}

export const storeContentMapper = (
  model: PriceListStoreMappings | Store,
): PriceListStoreMappings => {
  if (model.hasOwnProperty("store")) {
    const { store } = model;
    return {
      ...model,
      storeId: store?.id,
      storeCode: store?.code,
      storeName: store?.name,
      storeTypeId: store?.storeTypeId,
      storeTypeName: store?.storeType?.name,
      provinceId: store?.provinceId,
      storeGroupingId: store?.storeGroupingId,
      storeType: store?.storeType,
      province: store?.province,
    };
  } // if typeof item is content
  return storeContentMapper({
    ...new PriceListStoreMappings(),
    store: model,
  }); // if typeof item is mapper
};
