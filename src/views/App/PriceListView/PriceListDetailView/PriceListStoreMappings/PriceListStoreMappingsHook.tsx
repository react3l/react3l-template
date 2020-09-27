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
import { StoreFilter } from "models/StoreFilter";
import { Store } from "antd/lib/form/interface";
import { mappingToMapper } from "services/tbl-service";
import tableService from "services/tbl-service";
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

export function usePriceListStoreMappingsModal(source: PriceListStoreMappings) {
  const [translate] = useTranslation();
  const [storeFilter, dispatchStoreFilter] = React.useReducer<
    React.Reducer<StoreFilter, AdvanceFilterAction<StoreFilter>>
  >(advanceFilterReducer, new StoreFilter()); // filter factory

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleUpdateNewFilter,
    handleResetFilter,
  } = advanceFilterService.useChangeAdvanceFilter<StoreFilter>(
    storeFilter,
    dispatchStoreFilter,
    StoreFilter,
    false, // default loadList
  );

  const selectedList = React.useMemo(
    () => (source.length > 0 ? source.map(mappingToMapper("store")) : []),
    [source],
  ); // calculate selectedList from updated source

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
      ),
    [storeFilter, translate],
  );

  const {
    visible,
    loadControl,
    handleEndControl,
    handleOpenModal,
    handleCloseModal,
  } = tableService.useContenModal(); // state for modal

  React.useEffect(() => {
    if (loadControl) {
      handleSearch();
      handleEndControl();
    }
  }, [handleSearch, loadControl, handleEndControl]); // subscribe event emitter

  return {
    visibleStore: visible, // state for modal visibility
    handleOpenStoreModal: handleOpenModal,
    handleCloseStoreModal: handleCloseModal, // close modal as onClose props in modal
    selectedStoreList: selectedList, // for default selectedRowKeys
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
