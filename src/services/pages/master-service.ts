import { Model, ModelFilter } from "@react3l/react3l/core";
import { PRICE_LIST_DETAIL_ROUTE_PREFIX } from "config/route-consts";
import { useCallback, useState } from "react";
import { Observable } from "rxjs";
import { advanceFilterService } from "services/AdvanceFilterService";
import { queryStringService } from "services/QueryStringService";
import { routerService } from "services/RouterService";
import tableService from "services/tbl-service";

export class MasterService {
  /**
   *
   * retrieve list from server, call api get list, total and supply method for modify list on server
   * @return: { content, setContent }
   *
   * */
  useMaster<T extends Model, TFilter extends ModelFilter>(
    modelFilterClass: new () => TFilter,
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    deleteItem?: (t: T) => Observable<T>,
    bulkDeleteItems?: (t: KeyType[]) => Observable<void>,
    onUpdateListSuccess?: (item?: T) => void,
  ) {
    //   service to navigating create or detail
    const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(
      PRICE_LIST_DETAIL_ROUTE_PREFIX, // should replace to pricelist detail route base on rbac
    );
    // toggle search state
    const [toggle, setToggle] = useState<boolean>(false);

    // toggle search method, expose this
    const handleToggleSearch = useCallback(() => {
      const toggleTmp = !toggle;
      setToggle(toggleTmp);
    }, [toggle, setToggle]);

    const [filter, dispatch] = queryStringService.useQueryString<TFilter>(
      modelFilterClass,
    );

    const {
      loadList,
      setLoadList,
      handleSearch,
      handleChangeFilter,
      handleUpdateNewFilter,
      handleResetFilter,
    } = advanceFilterService.useChangeAdvanceFilter<TFilter>(
      filter,
      dispatch,
      modelFilterClass,
    );

    const {
      list,
      total,
      loadingList,
      pagination, // actually need if we use ant table default pagination
      handleTableChange, // expose table sorter
      handlePagination, // expose table pagination
      handleServerDelete,
      handleServerBulkDelete,
      rowSelection,
      canBulkDelete,
    } = tableService.useTable<T, TFilter>(
      filter,
      handleUpdateNewFilter,
      loadList,
      setLoadList,
      handleSearch,
      getList,
      getTotal,
      deleteItem,
      bulkDeleteItems,
      onUpdateListSuccess,
    );

    return {
      list,
      total,
      loadingList,
      filter,
      toggle,
      dispatch,
      handleChangeFilter,
      handleResetFilter,
      handleGoCreate,
      handleGoDetail,
      handleToggleSearch,
      handleTableChange,
      handlePagination,
      handleServerDelete,
      handleServerBulkDelete,
      rowSelection,
      canBulkDelete,
      handleSearch,
      pagination, // optional using
    };
  }
}
const masterService = new MasterService();
export default masterService;
