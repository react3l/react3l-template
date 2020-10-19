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
import { IdFilter, StringFilter, NumberFilter, DateFilter } from "@react3l/advanced-filters";
/* end general import */

/* begin individual import */
import { Permission } from 'models/Permission';
import { PermissionFieldMapping, PermissionFieldMappingFilter } from 'models/PermissionFieldMapping'
import { permissionRepository } from "repositories/permission-repository";
import { Field, FieldFilter } from 'models/Field';
/* end individual import */

export function usePermissionFieldMappingTable (
    model: Permission,
    setModel: (data: Permission) => void,
) {
    const [translate] = useTranslation();
    const {
        content: permissionFieldMappingContents,
        setContent: setPermissionFieldMappingContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.permissionFieldMapping),
    );
    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        permissionFieldMappingFilter,
        dispatchPermissionFieldMappingFilter,
    ] = React.useReducer<React.Reducer<PermissionFieldMappingFilter,AdvanceFilterAction<PermissionFieldMappingFilter>>>(advanceFilterReducer, new PermissionFieldMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PermissionFieldMappingFilter>
        (
            permissionFieldMappingFilter,
            dispatchPermissionFieldMappingFilter,
            PermissionFieldMappingFilter,
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
        } = useContentTable<
        PermissionFieldMapping,
        Field
,
        PermissionFieldMappingFilter
        >(
            permissionFieldMappingContents,
            setPermissionFieldMappingContents,
            permissionFieldMappingContentMapper,
            PermissionFieldMapping,
            permissionFieldMappingFilter,
            handleUpdateNewFilter,
            handleSearch,
            loadList,
            setLoadList,
        );

    const permissionFieldMappingContentColumns = React.useMemo(() => {
        return CreateTableColumns(
        CreateColumn()
        .Title(() => <>{translate("general.columns.index")}</>)
        .AddChild(
        CreateColumn()
        .Key("index")
        .Width(120)
        .Render(masterTableIndex<PermissionFieldMapping,PermissionFieldMappingFilter>
            (permissionFieldMappingFilter),
            ),
            ),
            
            
            
            CreateColumn()
            .Title(() => <>{translate("permission.permissionFieldMapping.value")}</>)
            .Key(nameof(permissionFieldMappingContents[0].value)) //Key
            .DataIndex(nameof(permissionFieldMappingContents[0].value))
            .Sorter(true)
            .SortOrder(
                getAntOrderType<
                    PermissionFieldMapping,
                    PermissionFieldMappingFilter
                >(
                    permissionFieldMappingFilter,
                    nameof(permissionFieldMappingContents[0].value),
                ),
            )
            .AddChild(
                CreateColumn()
                .Title(
                    RenderStringFilter(
                    permissionFieldMappingFilter["value"]["contain"],
                    handleChangeFilter(
                    "value",
                    "contain" as any,
                    StringFilter,
                    ),
                    translate("permissions.filter.value"),
                    ),
                )
                .DataIndex(nameof(permissionFieldMappingContents[0].value)),
            ),
            
            
            CreateColumn()
            .Title(() => <>{translate("permission.permissionFieldMapping.field")}</>)
            .Key(nameof(permissionFieldMappingContents[0].field))
            .DataIndex(nameof(permissionFieldMappingContents[0].field))
            .Sorter(true)
            .SortOrder(getAntOrderType<PermissionFieldMapping, PermissionFieldMappingFilter>
                (
                permissionFieldMappingFilter,
                nameof(permissionFieldMappingContents[0].field),),
                )
                .AddChild(
                CreateColumn()
                .Title(
                RenderIdFilter(
                permissionFieldMappingFilter["fieldId"]["equal"],
                handleChangeFilter("fieldId", "equal" as any, IdFilter),
                FieldFilter,
                permissionRepository.singleListField,
                ),
                )
                .Key(nameof(permissionFieldMappingContents[0].field))
                .DataIndex(nameof(permissionFieldMappingContents[0].field)),
                ),
            
                );
                }, [
                permissionFieldMappingFilter,
                permissionFieldMappingContents,
                RenderStringFilter,
                RenderIdFilter,
                handleChangeFilter,
                translate,
                RenderActionColumn,
                ]);

    return {
        permissionFieldMappingFilter,
        permissionFieldMappingList: list,
        loadPermissionFieldMappingList: loadingList,
        permissionFieldMappingTotal: total,
        handleAddPermissionFieldMapping: handleAddContent,
        handlePermissionFieldMappingTableChange: handleTableChange,
        handlePermissionFieldMappingPagination: handlePagination,
        permissionFieldMappingRowSelection: rowSelection,
        canBulkDeletePermissionFieldMapping: canBulkDelete,
        handleResetPermissionFieldMappingFilter: handleResetFilter,
        handleLocalBulkDeletePermissionFieldMapping: handleLocalBulkDelete,
        permissionFieldMappingRef: ref,
        handleClickPermissionFieldMapping: handleClick,
        handleImportPermissionFieldMapping: handleImportContentList,
        handleExportPermissionFieldMapping: handleContentExport,
        handleExportTemplatePermissionFieldMapping: handleContentExportTemplate,
        permissionFieldMappingContents,
        setPermissionFieldMappingContents,
        permissionFieldMappingContentColumns,
    }
};

export function usePermissionFieldMappingModal(source: PermissionFieldMapping) {

    const [translate] = useTranslation();
    const [fieldFilter, dispatchFieldFilter] = React.useReducer<
    React.Reducer<FieldFilter, AdvanceFilterAction<FieldFilter>>>(advanceFilterReducer, new FieldFilter());

    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleUpdateNewFilter,
        handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<FieldFilter>(
        fieldFilter,
        dispatchFieldFilter,
        FieldFilter,
        false,
    );

    const selectedFieldList = React.useMemo(
        () => (source.length > 0 ? source.map(mappingToMapper("field")) : []),
        [source],
    );

    const fieldModalFilters = React.useMemo(
        () => [
            
            
            RenderStringFilter(
                fieldFilter["name"]["contain"],
                handleChangeFilter("name", "contain" as any, StringFilter),
                translate("field.filter.name"),
            ),
            
            
            
            
            
            
            
            
            
        ],
    [handleChangeFilter, RenderStringFilter, fieldFilter, translate]);

    const fieldColumns = React.useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(translate("general.columns.index"))
          .Key("index")
          .Render(masterTableIndex<Field, FieldFilter>(fieldFilter)),
        
        
        CreateColumn()
          .Title(translate("permission.field.name"))
          .Key("name")
          .DataIndex("name"),
        
        
        
        
        CreateColumn()
          .Title(translate("permission.field.isDeleted"))
          .Key("isDeleted")
          .DataIndex("isDeleted"),
        
        
        
        
        
      ),
    [fieldFilter, translate],
  );

    const {
        visible,
        loadControl,
        handleEndControl,
        handleOpenModal,
        handleCloseModal,
        handleSaveModal,
    } = tableService.useContenModal(handleSearch);

    React.useEffect(() => {
        if (loadControl) {
          handleSearch();
          handleEndControl();
        }
    }, [handleSearch, loadControl, handleEndControl]);

  return {
    fieldModalFilters,
    visibleField: visible,
    handleOpenFieldModal: handleOpenModal,
    handleCloseFieldModal: handleCloseModal,
    handleSaveFieldModal: handleSaveModal,
    selectedFieldList,
    fieldFilter,
    dispatchFieldFilter,
    fieldColumns,
    loadFieldList: loadList,
    setLoadFieldList: setLoadList,
    handleSearchField: handleSearch,
    handleUpdateNewFieldFilter: handleUpdateNewFilter,
    handleResetFieldFilter: handleResetFilter,
  };

};

export const permissionFieldMappingContentMapper = (model: PermissionFieldMapping | Field): PermissionFieldMapping => {
    if (model.hasOwnProperty("field")) {
        const { field } = model;
        return {
          ...model,
        fieldpermissionId: field?.permissionId,
        fieldfieldId: field?.fieldId,
        fieldvalue: field?.value,
        fieldfield: field?.field,
        fieldpermission: field?.permission,
        };
    }

    return permissionFieldMappingContentMapper({
        ...new PermissionFieldMapping(),
        field: model,
    });
}

