/* begin general import */
import React from "react";
import nameof from "ts-nameof.macro";
import { useTranslation } from "react-i18next";
import detailService from "services/pages/detail-service";
import {
  CreateColumn,
  CreateTableAction,
  CreateTableColumns,
} from "core/models/TableColumn";
import { masterTableIndex } from "helpers/table";
import tableService, {
  mappingToMapper,
  getAntOrderType,
} from "services/table-service";
import { componentFactoryService } from "services/component-factory/component-factory-service";
import { useContentTable } from "components/Utility/ContentTable/ContentTableHook";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  advanceFilterService,
} from "services/advance-filter-service";
import {
  IdFilter,
  StringFilter,
  NumberFilter,
  DateFilter,
} from "@react3l/advanced-filters";
/* end general import */

/* begin individual import */
import { Menu } from "models/Menu";
import { Field, FieldFilter } from "models/Field";
import { menuRepository } from "repositories/menu-repository";
import { FieldType, FieldTypeFilter } from "models/FieldType";
/* end individual import */

export function useFieldTable(model: Menu, setModel: (data: Menu) => void) {
  const [translate] = useTranslation();
  const {
    content: fieldContents,
    setContent: setFieldContents,
  } = detailService.useContentList(model, setModel, nameof(model.field));
  const {
    RenderStringFilter,
    RenderIdFilter,
    RenderActionColumn,
  } = componentFactoryService;

  const [fieldFilter, dispatchFieldFilter] = React.useReducer<
    React.Reducer<FieldFilter, AdvanceFilterAction<FieldFilter>>
  >(advanceFilterReducer, new FieldFilter());

  const {
    loadList,
    setLoadList,
    handleSearch,
    handleChangeFilter,
    handleResetFilter,
    handleUpdateNewFilter,
  } = advanceFilterService.useChangeAdvanceFilter<FieldFilter>(
    fieldFilter,
    dispatchFieldFilter,
    FieldFilter,
  );

  const {
    list,
    loadingList,
    total,
    handleAddContent,
    handleTableChange,
    handlePagination,
    rowSelection,
    canBulkDelete,
    handleLocalBulkDelete,
    ref,
    handleClick,
    handleImportContentList,
    handleContentExport,
    handleContentExportTemplate,
  } = useContentTable<Field, any, FieldFilter>(
    fieldContents,
    setFieldContents,
    undefined,
    Field,
    fieldFilter,
    handleUpdateNewFilter,
    handleSearch,
    loadList,
    setLoadList,
  );

  const fieldContentColumns = React.useMemo(() => {
    return CreateTableColumns(
      CreateColumn()
        .Title(() => <>{translate("general.columns.index")}</>)
        .AddChild(
          CreateColumn()
            .Key("index")
            .Width(120)
            .Render(masterTableIndex<Field, FieldFilter>(fieldFilter)),
        ),

      CreateColumn()
        .Title(() => <>{translate("menu.field.name")}</>)
        .Key(nameof(fieldContents[0].name)) //Key
        .DataIndex(nameof(fieldContents[0].name))
        .Sorter(true)
        .SortOrder(
          getAntOrderType<Field, FieldFilter>(
            fieldFilter,
            nameof(fieldContents[0].name),
          ),
        )
        .AddChild(
          CreateColumn()
            .Title(
              RenderStringFilter(
                fieldFilter["name"]["contain"],
                handleChangeFilter("name", "contain" as any, StringFilter),
                translate("menus.filter.name"),
              ),
            )
            .DataIndex(nameof(fieldContents[0].name)),
        ),

      CreateColumn()
        .Title(() => <>{translate("menu.field.isDeleted")}</>)
        .Key(nameof(fieldContents[0].isDeleted)) //Key
        .DataIndex(nameof(fieldContents[0].isDeleted))
        .Sorter(true)
        .SortOrder(
          getAntOrderType<Field, FieldFilter>(
            fieldFilter,
            nameof(fieldContents[0].isDeleted),
          ),
        )
        .AddChild(
          CreateColumn()
            .Title(<></>)
            .DataIndex(nameof(fieldContents[0].isDeleted)),
        ),

      CreateColumn()
        .Title(() => <>{translate("menu.field.fieldType")}</>)
        .Key(nameof(fieldContents[0].fieldType))
        .DataIndex(nameof(fieldContents[0].fieldType))
        .Sorter(true)
        .SortOrder(
          getAntOrderType<Field, FieldFilter>(
            fieldFilter,
            nameof(fieldContents[0].fieldType),
          ),
        )
        .AddChild(
          CreateColumn()
            .Title(
              RenderIdFilter(
                fieldFilter["fieldTypeId"]["equal"],
                handleChangeFilter("fieldTypeId", "equal" as any, IdFilter),
                FieldTypeFilter,
                menuRepository.singleListFieldType,
              ),
            )
            .Key(nameof(fieldContents[0].fieldType))
            .DataIndex(nameof(fieldContents[0].fieldType)),
        ),
    );
  }, [
    fieldFilter,
    fieldContents,
    RenderStringFilter,
    RenderIdFilter,
    handleChangeFilter,
    translate,
    RenderActionColumn,
  ]);

  return {
    fieldFilter,
    fieldList: list,
    loadFieldList: loadingList,
    fieldTotal: total,
    handleAddField: handleAddContent,
    handleFieldTableChange: handleTableChange,
    handleFieldPagination: handlePagination,
    fieldRowSelection: rowSelection,
    canBulkDeleteField: canBulkDelete,
    handleResetFieldFilter: handleResetFilter,
    handleLocalBulkDeleteField: handleLocalBulkDelete,
    fieldRef: ref,
    handleClickField: handleClick,
    handleImportField: handleImportContentList,
    handleExportField: handleContentExport,
    handleExportTemplateField: handleContentExportTemplate,
    fieldContents,
    setFieldContents,
    fieldContentColumns,
  };
}
