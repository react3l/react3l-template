import React, { useMemo } from "react";
import { Card, Col, Row, Switch, Tabs } from "antd";
import nameof from "ts-nameof.macro";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { OrganizationFilter } from "models/OrganizationFilter";
import { PriceList, PriceListStoreMappings, Store } from "models/PriceList";
import { SalesOrderTypeFilter } from "models/PriceList/SalesOrderTypeFilter";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import { formService } from "services/FormService";
import detailService from "services/pages/detail-service";
import PriceListStoreMappingsTable from "../PriceListDetailView/ContentTable/PriceListStoreMappingTable";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import { useContentTable } from "components/Utility/ContentTable/ContentTableHook";
import { PriceListStoreMappingsFilter } from "models/PriceList/PriceListStoreMappingsFilter";
import { CreateColumn, CreateTableColumns } from "core/models/TableColumn";
import { masterTableIndex } from "helpers/table";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
import { StoreTypeFilter } from "models/StoreTypeFilter";
const { TabPane } = Tabs;

function PriceListDetailView() {
  const [translate] = useTranslation();
  const {
    model,
    handleUpdateNewModel, // expose dispatch to update model
    isDetail,
    handleChangeSimpleField,
    handleChangeTreeObjectField,
    handleChangeObjectField,
    handleSave,
  } = detailService.useDetail<PriceList>(
    PriceList,
    priceListRepository.get,
    priceListRepository.save,
  );

  const {
    content: storeMappingContents,
    setContent: setStoreMappingContents,
  } = detailService.useContentList(
    model,
    handleUpdateNewModel, // update content has sideEffect update model
    nameof(model.priceListStoreMappings),
  );

  const {
    filter, // filter for local table
    handleChangeFilter, // normally used in advanceFilter component
  } = useContentTable<
    PriceListStoreMappings,
    Store,
    PriceListStoreMappingsFilter
  >(
    storeMappingContents,
    setStoreMappingContents,
    mapper,
    PriceListStoreMappings,
    PriceListStoreMappingsFilter,
    nameof(storeMappingContents[0].store),
  );

  const priceListStoreMappingsContentColumns = useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(() => <>{translate("general.columns.index")}</>)
          .Key("index") // key
          .Render(
            masterTableIndex<
              PriceListStoreMappings,
              PriceListStoreMappingsFilter
            >(filter),
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
                    value={filter["storeTypeId"]["equal"]}
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
    [filter, handleChangeFilter, storeMappingContents, translate],
  );

  // const columnDisplayOrder = CreateDisplayOrder(
  //   CreateIndex().AddChild(), // if normal column has its child, you may need to add child for index column
  //   CreateStringFilterTitle()
  //     .Sorter()
  //     .SortOrder()
  //     .Ellipsis()
  //     .Width()
  //     .AddChild(), // stringFilterTitle default has no render
  // );

  return (
    <div className='page page__detail'>
      {/* start detail header */}
      <div className='page__header d-flex align-items-center '>
        <div className='page__title mr-1'>
          {translate("paymentRequest.detail.title")}
        </div>
        {isDetail ? (
          <div className='page__id'>{`- # ${model.id}`}</div>
        ) : (
          translate("general.actions.create")
        )}
      </div>
      {/* end detail header */}
      {/* start general information */}
      <div className='w-100 mt-3 page__detail-tabs'>
        <Row className='d-flex'>
          <Col lg={18}>
            <Card className='mr-3'>
              <Tabs defaultActiveKey='1'>
                <TabPane
                  tab={translate("general.detail.generalInfomation")}
                  key='1'
                >
                  <Row>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={translate("priceList.code")}>
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate("priceList.placeholder.code")}
                          className={"tio-account_square_outlined"}
                          onChange={handleChangeSimpleField(nameof(model.code))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem
                        label={translate("priceList.name")}
                        validateStatus={formService.getValidationStatus(
                          model?.errors,
                          "name",
                        )}
                        message={model?.errors?.name}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate("priceList.placeholder.name")}
                          className={"tio-account_square_outlined"}
                          onChange={handleChangeSimpleField(nameof(model.name))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <FormItem label={translate("priceList.organzation")}>
                        <TreeSelect
                          isMaterial={true}
                          placeHolder={"Select Organization"}
                          selectable={true}
                          classFilter={OrganizationFilter}
                          onChange={handleChangeTreeObjectField(
                            nameof(model.organization),
                          )} // handleChange Tree
                          checkStrictly={true}
                          getTreeData={
                            priceListRepository.singleListOrganization
                          }
                          item={model.organization}
                          // listItem={listItem}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6}>
                      <FormItem label={translate("priceList.saleOrderType")}>
                        <Select
                          classFilter={SalesOrderTypeFilter}
                          placeHolder={translate(
                            "priceList.placeholder.saleOrderType",
                          )}
                          getList={priceListRepository.singleListSalesOrderType}
                          onChange={handleChangeObjectField(
                            nameof(model.saleOrderType),
                          )} // handleChange Object Field
                          model={model.saleOrderType}
                          isMaterial={true}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={6}>
                      <FormItem label={translate("priceList.startDate")}>
                        <DatePicker
                          value={model.startDate}
                          onChange={handleChangeSimpleField(
                            nameof(model.startDate),
                          )} // handleChange Date
                          isMaterial={true}
                          placeholder={translate(
                            "priceList.placeholder.startDate",
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6}>
                      <FormItem
                        label={translate("priceList.endDate")}
                        validateStatus={formService.getValidationStatus(
                          model?.errors,
                          nameof(model.endDate),
                        )}
                      >
                        <DatePicker
                          value={model.endDate}
                          onChange={handleChangeSimpleField(
                            nameof(model.endDate),
                          )} // handleChange Date
                          isMaterial={true}
                          placeholder={translate(
                            "priceList.placeholder.endDate",
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6}>
                      {/*  */}
                      <label className='label-detail input-select__title'>
                        {translate("priceList.status")}
                      </label>
                      <Switch
                        size='small'
                        onChange={handleChangeSimpleField(
                          nameof(model.statusId),
                        )}
                        defaultChecked={model.statusId === 1 ? true : false}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
      {/* end general information */}
      {/* start dependent lists*/}
      <div className='w-100 mt-3 page__detail-tabs'>
        <Row className='d-flex'>
          <Col lg={18}>
            <Card className='mr-3'>
              <Tabs defaultActiveKey='1'>
                <TabPane
                  tab={translate("priceList.priceListStoreMappings")}
                  key='1'
                >
                  <Row>
                    <PriceListStoreMappingsTable
                      model={model}
                      content={storeMappingContents}
                      setContent={setStoreMappingContents}
                      mapperField={nameof(
                        model.priceListStoreMappings[0].store,
                      )}
                    />
                    <ContentTable
                      model={model}
                      content={storeMappingContents}
                      setContent={setStoreMappingContents}
                      mapperField={nameof(
                        model.priceListStoreMappings[0].store,
                      )}
                      contentClass={PriceListStoreMappings}
                      contentFilterClass={PriceListStoreMappingsFilter}
                      contentMapper={mapper}
                      columns={priceListStoreMappingsContentColumns}
                    />
                  </Row>
                </TabPane>
                <TabPane
                  tab={translate("priceList.priceListItemMappings")}
                  key='2'
                >
                  <Row></Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        {/* end dependent lists */}
        {/* start save action */}
        <Row className='mt-3 mb-5'>
          <button
            className='btn component__btn-primary pr-4 mb-5'
            onClick={handleSave()}
          >
            {translate("priceList.actions.saveModel")}
          </button>
        </Row>
        {/* end save action */}
      </div>
    </div>
  );
}

export default PriceListDetailView;

function mapper(model: PriceListStoreMappings | Store): PriceListStoreMappings {
  if (model.hasOwnProperty("store")) {
    const { store } = model;
    return {
      ...model,
      storeId: store?.id,
      storeCode: store?.code,
      storeName: store?.name,
      storeTypeId: store?.storeTypeId,
      provinceId: store?.provinceId,
      storeGroupingId: store?.storeGroupingId,
      storeType: store?.storeType,
      province: store?.province,
    };
  }
  return mapper({ ...new PriceListStoreMappings(), store: model });
}
