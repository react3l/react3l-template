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
import { Role } from 'models/Role';
import { Permission, PermissionFilter } from 'models/Permission'
import { roleRepository } from "repositories/role-repository";
import { Menu, MenuFilter } from 'models/Menu';
/* end individual import */

export function usePermissionTable (
    model: Role,
    setModel: (data: Role) => void,
) {
    const [translate] = useTranslation();
    const {
        content: permissionContents,
        setContent: setPermissionContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.permission),
    );
    const {
        RenderStringFilter,
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        permissionFilter,
        dispatchPermissionFilter,
    ] = React.useReducer<React.Reducer<PermissionFilter,AdvanceFilterAction<PermissionFilter>>>(advanceFilterReducer, new PermissionFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<PermissionFilter>
        (
            permissionFilter,
            dispatchPermissionFilter,
            PermissionFilter,
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
        Permission,
        any
        ,
        PermissionFilter
        >(
            permissionContents,
            setPermissionContents,
            undefined,
            Permission,
            permissionFilter,
            handleUpdateNewFilter,
            handleSearch,
            loadList,
            setLoadList,
        );

    const permissionContentColumns = React.useMemo(() => {
        return CreateTableColumns(
        CreateColumn()
        .Title(() => <>{translate("general.columns.index")}</>)
        .AddChild(
        CreateColumn()
        .Key("index")
        .Width(120)
        .Render(masterTableIndex<Permission,PermissionFilter>
            (permissionFilter),
            ),
            ),
            
            
            CreateColumn()
            .Title(() => <>{translate("role.permission.code")}</>)
            .Key(nameof(permissionContents[0].code)) //Key
            .DataIndex(nameof(permissionContents[0].code))
            .Sorter(true)
            .SortOrder(
                getAntOrderType<
                    Permission,
                    PermissionFilter
                >(
                    permissionFilter,
                    nameof(permissionContents[0].code),
                ),
            )
            .AddChild(
                CreateColumn()
                .Title(
                    RenderStringFilter(
                    permissionFilter["code"]["contain"],
                    handleChangeFilter(
                    "code",
                    "contain" as any,
                    StringFilter,
                    ),
                    translate("roles.filter.code"),
                    ),
                )
                .DataIndex(nameof(permissionContents[0].code)),
            ),
            
            
            CreateColumn()
            .Title(() => <>{translate("role.permission.name")}</>)
            .Key(nameof(permissionContents[0].name)) //Key
            .DataIndex(nameof(permissionContents[0].name))
            .Sorter(true)
            .SortOrder(
                getAntOrderType<
                    Permission,
                    PermissionFilter
                >(
                    permissionFilter,
                    nameof(permissionContents[0].name),
                ),
            )
            .AddChild(
                CreateColumn()
                .Title(
                    RenderStringFilter(
                    permissionFilter["name"]["contain"],
                    handleChangeFilter(
                    "name",
                    "contain" as any,
                    StringFilter,
                    ),
                    translate("roles.filter.name"),
                    ),
                )
                .DataIndex(nameof(permissionContents[0].name)),
            ),
            
            
            
            
            
            CreateColumn()
            .Title(() => <>{translate("role.permission.menu")}</>)
            .Key(nameof(permissionContents[0].menu))
            .DataIndex(nameof(permissionContents[0].menu))
            .Sorter(true)
            .SortOrder(getAntOrderType<Permission, PermissionFilter>
                (
                permissionFilter,
                nameof(permissionContents[0].menu),),
                )
                .AddChild(
                CreateColumn()
                .Title(
                RenderIdFilter(
                permissionFilter["menuId"]["equal"],
                handleChangeFilter("menuId", "equal" as any, IdFilter),
                MenuFilter,
                roleRepository.singleListMenu,
                ),
                )
                .Key(nameof(permissionContents[0].menu))
                .DataIndex(nameof(permissionContents[0].menu)),
                ),
            
            
            
            
                );
                }, [
                permissionFilter,
                permissionContents,
                RenderStringFilter,
                RenderIdFilter,
                handleChangeFilter,
                translate,
                RenderActionColumn,
                ]);

    return {
        permissionFilter,
        permissionList: list,
        loadPermissionList: loadingList,
        permissionTotal: total,
        handleAddPermission: handleAddContent,
        handlePermissionTableChange: handleTableChange,
        handlePermissionPagination: handlePagination,
        permissionRowSelection: rowSelection,
        canBulkDeletePermission: canBulkDelete,
        handleResetPermissionFilter: handleResetFilter,
        handleLocalBulkDeletePermission: handleLocalBulkDelete,
        permissionRef: ref,
        handleClickPermission: handleClick,
        handleImportPermission: handleImportContentList,
        handleExportPermission: handleContentExport,
        handleExportTemplatePermission: handleContentExportTemplate,
        permissionContents,
        setPermissionContents,
        permissionContentColumns,
    }
};


