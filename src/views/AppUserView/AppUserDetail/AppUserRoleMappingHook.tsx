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
import { AppUser } from 'models/AppUser';
import { AppUserRoleMapping, AppUserRoleMappingFilter } from 'models/AppUserRoleMapping'
import { appUserRepository } from "repositories/app-user-repository";
import { Role, RoleFilter } from 'models/Role';
/* end individual import */

export function useAppUserRoleMappingTable (
    model: AppUser,
    setModel: (data: AppUser) => void,
) {
    const [translate] = useTranslation();
    const {
        content: appUserRoleMappingContents,
        setContent: setAppUserRoleMappingContents,
    } = detailService.useContentList(
        model,
        setModel,
        nameof(model.appUserRoleMapping),
    );
    const {
        RenderIdFilter,
        RenderActionColumn,
    } = componentFactoryService;

    const [
        appUserRoleMappingFilter,
        dispatchAppUserRoleMappingFilter,
    ] = React.useReducer<React.Reducer<AppUserRoleMappingFilter,AdvanceFilterAction<AppUserRoleMappingFilter>>>(advanceFilterReducer, new AppUserRoleMappingFilter());

    const {
        loadList,
        setLoadList,
        handleSearch,
        handleChangeFilter,
        handleResetFilter,
        handleUpdateNewFilter,
    } = advanceFilterService.useChangeAdvanceFilter<AppUserRoleMappingFilter>
        (
            appUserRoleMappingFilter,
            dispatchAppUserRoleMappingFilter,
            AppUserRoleMappingFilter,
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
        AppUserRoleMapping,
        Role
,
        AppUserRoleMappingFilter
        >(
            appUserRoleMappingContents,
            setAppUserRoleMappingContents,
            appUserRoleMappingContentMapper,
            AppUserRoleMapping,
            appUserRoleMappingFilter,
            handleUpdateNewFilter,
            handleSearch,
            loadList,
            setLoadList,
        );

    const appUserRoleMappingContentColumns = React.useMemo(() => {
        return CreateTableColumns(
        CreateColumn()
        .Title(() => <>{translate("general.columns.index")}</>)
        .AddChild(
        CreateColumn()
        .Key("index")
        .Width(120)
        .Render(masterTableIndex<AppUserRoleMapping,AppUserRoleMappingFilter>
            (appUserRoleMappingFilter),
            ),
            ),
            
            
            
            
            CreateColumn()
            .Title(() => <>{translate("appUser.appUserRoleMapping.role")}</>)
            .Key(nameof(appUserRoleMappingContents[0].role))
            .DataIndex(nameof(appUserRoleMappingContents[0].role))
            .Sorter(true)
            .SortOrder(getAntOrderType<AppUserRoleMapping, AppUserRoleMappingFilter>
                (
                appUserRoleMappingFilter,
                nameof(appUserRoleMappingContents[0].role),),
                )
                .AddChild(
                CreateColumn()
                .Title(
                RenderIdFilter(
                appUserRoleMappingFilter["roleId"]["equal"],
                handleChangeFilter("roleId", "equal" as any, IdFilter),
                RoleFilter,
                appUserRepository.singleListRole,
                ),
                )
                .Key(nameof(appUserRoleMappingContents[0].role))
                .DataIndex(nameof(appUserRoleMappingContents[0].role)),
                ),
                );
                }, [
                appUserRoleMappingFilter,
                appUserRoleMappingContents,
                RenderIdFilter,
                handleChangeFilter,
                translate,
                RenderActionColumn,
                ]);

    return {
        appUserRoleMappingFilter,
        appUserRoleMappingList: list,
        loadAppUserRoleMappingList: loadingList,
        appUserRoleMappingTotal: total,
        handleAddAppUserRoleMapping: handleAddContent,
        handleAppUserRoleMappingTableChange: handleTableChange,
        handleAppUserRoleMappingPagination: handlePagination,
        appUserRoleMappingRowSelection: rowSelection,
        canBulkDeleteAppUserRoleMapping: canBulkDelete,
        handleResetAppUserRoleMappingFilter: handleResetFilter,
        handleLocalBulkDeleteAppUserRoleMapping: handleLocalBulkDelete,
        appUserRoleMappingRef: ref,
        handleClickAppUserRoleMapping: handleClick,
        handleImportAppUserRoleMapping: handleImportContentList,
        handleExportAppUserRoleMapping: handleContentExport,
        handleExportTemplateAppUserRoleMapping: handleContentExportTemplate,
        appUserRoleMappingContents,
        setAppUserRoleMappingContents,
        appUserRoleMappingContentColumns,
    }
};

export function useAppUserRoleMappingModal(source: AppUserRoleMapping) {

    const [translate] = useTranslation();
    const [roleFilter, dispatchRoleFilter] = React.useReducer<
    React.Reducer<RoleFilter, AdvanceFilterAction<RoleFilter>>>(advanceFilterReducer, new RoleFilter());

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
    } = advanceFilterService.useChangeAdvanceFilter<RoleFilter>(
        roleFilter,
        dispatchRoleFilter,
        RoleFilter,
        false,
    );

    const selectedRoleList = React.useMemo(
        () => (source.length > 0 ? source.map(mappingToMapper("role")) : []),
        [source],
    );

    const roleModalFilters = React.useMemo(
        () => [
            
            
            RenderStringFilter(
                roleFilter["code"]["contain"],
                handleChangeFilter("code", "contain" as any, StringFilter),
                translate("role.filter.code"),
            ),
            
            
            RenderStringFilter(
                roleFilter["name"]["contain"],
                handleChangeFilter("name", "contain" as any, StringFilter),
                translate("role.filter.name"),
            ),
            
            
            
            
            
            
            
        ],
    [handleChangeFilter, RenderStringFilter, roleFilter, translate]);

    const roleColumns = React.useMemo(
    () =>
      CreateTableColumns(
        CreateColumn()
          .Title(translate("general.columns.index"))
          .Key("index")
          .Render(masterTableIndex<Role, RoleFilter>(roleFilter)),
        
        
        CreateColumn()
          .Title(translate("appUser.role.code"))
          .Key("code")
          .DataIndex("code"),
        
        
        CreateColumn()
          .Title(translate("appUser.role.name"))
          .Key("name")
          .DataIndex("name"),
        
        
        
        CreateColumn()
          .Title(translate("appUser.role.used"))
          .Key("used")
          .DataIndex("used"),
        
        
        
        
      ),
    [roleFilter, translate],
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
    roleModalFilters,
    visibleRole: visible,
    handleOpenRoleModal: handleOpenModal,
    handleCloseRoleModal: handleCloseModal,
    handleSaveRoleModal: handleSaveModal,
    selectedRoleList,
    roleFilter,
    dispatchRoleFilter,
    roleColumns,
    loadRoleList: loadList,
    setLoadRoleList: setLoadList,
    handleSearchRole: handleSearch,
    handleUpdateNewRoleFilter: handleUpdateNewFilter,
    handleResetRoleFilter: handleResetFilter,
  };

};

export const appUserRoleMappingContentMapper = (model: AppUserRoleMapping | Role): AppUserRoleMapping => {
    if (model.hasOwnProperty("role")) {
        const { role } = model;
        return {
          ...model,
        roleappUserId: role?.appUserId,
        roleroleId: role?.roleId,
        roleappUser: role?.appUser,
        rolerole: role?.role,
        };
    }

    return appUserRoleMappingContentMapper({
        ...new AppUserRoleMapping(),
        role: model,
    });
}

