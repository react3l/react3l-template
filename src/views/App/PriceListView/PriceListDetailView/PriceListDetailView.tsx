import { Card, Col, Row, Switch, Tabs } from "antd";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
/* start import bundle for one pair of content table and content modal */
import ContentModal from "components/Utility/ContentModal/ContentModal"; // view for content modal
import ContentTable from "components/Utility/ContentTable/ContentTable"; // view for content table
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { OrganizationFilter } from "models/OrganizationFilter";
import { PriceList } from "models/PriceList";
import { SalesOrderTypeFilter } from "models/PriceList/SalesOrderTypeFilter";
import React from "react";
import { useTranslation } from "react-i18next";
import { priceListRepository } from "repositories/price-list-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import {
  storeContentMapper,
  usePriceListStoreMappingsModal,
  usePriceListStoreMappingsTable,
} from "./PriceListStoreMappings/PriceListStoreMappingsHook"; // hook for content table, content modal and mapper
/* end import bundle for one pair of content table and content modal */

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
    priceListStoreMappingsFilter,
    storeMappingContents,
    setStoreMappingContents,
    priceListStoreMappingsContentColumns,
    priceListStoreMappingsList,
    loadPriceListStoreMappingsList,
    priceListStoreMappingsTotal,
    handleAddPriceListStoreMappings,
    handlePriceListStoreMappingsTableChange,
    handlePriceListStoreMappingsPagination,
    priceListStoreMappingsRowSelection,
    canBulkDeletePriceListStoreMappings,
    handleLocalBulkDeletePriceListStoreMappings,
    priceListStoreMappingsRef,
    handleClickPriceListStoreMappings,
    handleImportPriceListStoreMappings,
    handleExportPriceListStoreMappings,
    handleExportTemplatePriceListStoreMappings,
  } = usePriceListStoreMappingsTable(model, handleUpdateNewModel); // hook for priceListStoreMappings table

  const {
    visibleStore,
    storeFilter,
    handleUpdateNewStoreFilter,
    handleSearchStore,
    handleResetStoreFilter,
    loadStoreList,
    setLoadStoreList,
    storeModalFilters,
    handleOpenStoreModal,
    handleCloseStoreModal,
    handleSaveStoreModal,
    selectedStoreList,
    storeColumns,
  } = usePriceListStoreMappingsModal(storeMappingContents); // hook for priceListStoreMappings modal

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
                    <ContentTable
                      model={model} // input for import, export
                      filter={priceListStoreMappingsFilter}
                      list={priceListStoreMappingsList}
                      loadingList={loadPriceListStoreMappingsList}
                      total={priceListStoreMappingsTotal}
                      handleTableChange={
                        handlePriceListStoreMappingsTableChange
                      }
                      rowSelection={priceListStoreMappingsRowSelection}
                      handleLocalBulkDelete={
                        handleLocalBulkDeletePriceListStoreMappings
                      }
                      canBulkDelete={canBulkDeletePriceListStoreMappings}
                      handleExportContent={handleExportPriceListStoreMappings}
                      handleExportTemplateContent={
                        handleExportTemplatePriceListStoreMappings
                      }
                      handlePagination={handlePriceListStoreMappingsPagination}
                      handleAddContent={handleAddPriceListStoreMappings}
                      ref={priceListStoreMappingsRef}
                      handleClick={handleClickPriceListStoreMappings}
                      handleImportContentList={
                        handleImportPriceListStoreMappings
                      }
                      columns={priceListStoreMappingsContentColumns}
                      onOpenModal={handleOpenStoreModal} // handleOpen below modal component
                    />
                    <ContentModal
                      content={storeMappingContents}
                      setContent={setStoreMappingContents}
                      visible={visibleStore}
                      filter={storeFilter}
                      onUpdateNewFilter={handleUpdateNewStoreFilter}
                      onResetFilter={handleResetStoreFilter}
                      onSearch={handleSearchStore}
                      getList={priceListRepository.listStore}
                      getTotal={priceListRepository.countStore}
                      loadList={loadStoreList}
                      setLoadList={setLoadStoreList}
                      selectedList={selectedStoreList}
                      columns={storeColumns}
                      filterList={storeModalFilters}
                      mapperField={nameof(
                        model.priceListStoreMappings[0].store,
                      )}
                      mapper={storeContentMapper}
                      onClose={handleCloseStoreModal}
                      onSave={handleSaveStoreModal}
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
