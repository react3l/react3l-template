import _ from "lodash";
import { Moment } from "moment";
import {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  Dispatch,
  useMemo,
  SetStateAction,
} from "react";
import {
  DateFilter,
  GuidFilter,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "react3l-advanced-filters";
import { ModelFilter } from "react3l/core";
import { forkJoin, Observable, of } from "rxjs";
import { finalize, map, skip, take, tap } from "rxjs/operators";
import nameof from "ts-nameof.macro";
// import subcriptionCancellation from "./SubscriptionService";
import { commonService } from "react3l/services/common-service";
import { DEFAULT_TAKE } from "react3l/config";
import Model from "core/models/Model";

type KeyType = string | number;

export enum ListTypeEnum {
  OverridedList, // for normal pageable list
  StackedList, // for infinity-load list
}

export interface StateOfList<T extends Model> {
  list?: T[];
  total?: number;
  loadingList?: boolean;
  isLoadList?: boolean;
  hasMoreData?: boolean;
}

export interface ActionOfList<T extends Model> {
  type: string;
  payload?: StateOfList<T>;
}

export const SET_LIST: string = "FETCH_LIST";
export const FETCH_INIT: string = "FETCH_INIT";
export const FETCH_END: string = "FETCH_END";

function listReducer<T>(
  state: StateOfList<T>,
  action: ActionOfList<T>,
): StateOfList<T> {
  switch (action.type) {
    case SET_LIST: {
      const { list, total } = action.payload;
      return {
        ...state,
        list,
        total,
      };
    }
    case FETCH_INIT: {
      return {
        ...state,
        loadingList: true,
        isLoadList: false,
      };
    }
    case FETCH_END: {
      return {
        ...state,
        loadingList: false,
        isLoadList: false,
      };
    }
  }
}

/* services to calculate data from other data, we may call them consequence service */
class ListService {
  /**
   *
   * define reusable effect when do fetching api
   * @param: dispatch: Dispatch<ActionOfList<T>>
   * @return: { handleFetchInit,handleFetchEnd }
   *
   * */
  useFetchEffect<T extends Model>(
    dispatch: Dispatch<ActionOfList<T>>,
  ): {
    handleFetchInit: () => void;
    handleFetchEnd: () => void;
  } {
    const handleFetchInit = () => {
      dispatch({ type: FETCH_INIT });
    };
    const handleFetchEnd = () => {
      dispatch({
        type: FETCH_END,
      });
    };
    return { handleFetchInit, handleFetchEnd };
  }

  /**
   *
   * calculate custom filter skip, take, etc. based on business
   * @param: defaultLoad: boolean
   * @return: { listFilter }
   *
   * */
  useListFilter<TFilter extends ModelFilter>(modelFilter: TFilter): TFilter {
    return useMemo(() => {
      return { ...modelFilter, skip: 0, take: DEFAULT_TAKE };
    }, [modelFilter]);
  }

  /**
   *
   * consequence list, total by filtering api
   * @param: filter: TFilter
   * @param: setFilter: (filter: TFilter) => void
   * @param: getList(filter: TFilter) => Observable<T[]>
   * @param: getTotal(filter: TFilter) => Observable<number>
   * @param: deleteItem?: (t: T) => Observable<T>
   * @param: bulkDeleteItems?: (t: number[] | string[]) => Observable<void>,
   * @param: selectedKeys?: KeyType[],
   * @param: setSelectedRowKeys?: Dispatch<SetStateAction<KeyType[]>>,
   * @param: onUpdateListSuccess?: (item?: T) => void,
   * @param: isLoadControl?: boolean,
   * @return: { list, total, loadingList, handleDelete, handleBulkDelete }
   *
   * */
  useList<T extends Model, TFilter extends ModelFilter>(
    filter: TFilter,
    setFilter: (filter: TFilter) => void,
    getList: (filter: TFilter) => Observable<T[]>,
    getTotal: (filter: TFilter) => Observable<number>,
    deleteItem?: (t: T) => Observable<T>,
    bulkDeleteItems?: (t: KeyType[]) => Observable<void>,
    selectedKeys?: KeyType[],
    setSelectedRowKeys?: Dispatch<SetStateAction<KeyType[]>>,
    onUpdateListSuccess?: (item?: T) => void,
    isLoadControl?: boolean, // optional control for modal preLoading
  ): {
    list: T[];
    total: number;
    loadingList: boolean;
    handleDelete: (item: T) => void;
    handleBulkDelete: (items: KeyType[]) => void;
  } {
    //  auto complete subscription until isCancelled == true (unMounted component)
    // const { isCancelled, cancelSubcription } = subcriptionCancellation();
    const [subscription] = commonService.useSubscription();
    const [{ list, total, loadingList, isLoadList }, dispatch] = useReducer<
      Reducer<StateOfList<T>, ActionOfList<T>>
    >(listReducer, {
      list: [],
      total: 0,
      loadingList: false,
      isLoadList: true,
    });

    const shouldLoad = useMemo(
      () => (typeof isLoadControl !== "undefined" ? isLoadControl : isLoadList), // decide list is self-controlled or controlled loading
      [isLoadControl, isLoadList],
    );

    const defaultFilter = this.useListFilter(filter);

    const { handleFetchInit, handleFetchEnd } = this.useFetchEffect(dispatch);

    const handleLoadList = useCallback(() => {
      subscription.add(
        forkJoin([getList(filter), getTotal(filter)])
          .pipe(
            tap(handleFetchInit),
            // takeUntil(isCancelled),
            take(1),
            finalize(handleFetchEnd),
          )
          .subscribe((results: [T[], number]) => {
            dispatch({
              type: SET_LIST,
              payload: {
                list: results[0],
                total: results[1],
              },
            });
          }),
      );
    }, [
      filter,
      getList,
      getTotal,
      handleFetchEnd,
      handleFetchInit,
      subscription,
    ]);

    const handleDelete = useCallback(
      (item: T) => {
        if (typeof deleteItem === "function") {
          subscription.add(
            deleteItem(item)
              .pipe(
                tap(handleFetchInit),
                //   takeUntil(isCancelled),
                finalize(handleFetchEnd),
              )
              .subscribe((item: T) => {
                if (typeof onUpdateListSuccess === "function") {
                  onUpdateListSuccess(item); // sideEffect when update list successfully
                }
                setSelectedRowKeys(
                  (selectedKeys as number[]).filter((id) => id !== item.id), // filter selectedRowKeys
                );
                setFilter(defaultFilter); // update filter to default skip, take
                handleLoadList(); // reload updated List
              }),
          );
        }
      },
      [
        deleteItem,
        subscription,
        handleFetchInit,
        handleFetchEnd,
        onUpdateListSuccess,
        setSelectedRowKeys,
        selectedKeys,
        setFilter,
        defaultFilter,
        handleLoadList,
      ],
    );

    const handleBulkDelete = useCallback(
      (keys: number[]) => {
        if (typeof bulkDeleteItems === "function") {
          subscription.add(
            bulkDeleteItems(keys)
              .pipe(
                tap(handleFetchInit),
                //   takeUntil(isCancelled),
                finalize(handleFetchEnd),
              )
              .subscribe(() => {
                if (typeof onUpdateListSuccess === "function") {
                  onUpdateListSuccess(); // sideEffect when update list successfully
                }
                setSelectedRowKeys([]); // empty selectedRowKeys for disabling button
                setFilter(defaultFilter); // update filter to default skip, take
                handleLoadList(); // reload updated List
              }),
          );
        }
      },
      [
        bulkDeleteItems,
        defaultFilter,
        handleFetchEnd,
        handleFetchInit,
        handleLoadList,
        onUpdateListSuccess,
        setFilter,
        setSelectedRowKeys,
        subscription,
      ],
    );

    useEffect(() => {
      if (shouldLoad) {
        // trigger loadList only isLoadList == true
        handleLoadList();
      }
      //   return () => {
      //     cancelSubcription();
      //   };
    }, [handleLoadList, shouldLoad]);

    return { list, total, loadingList, handleDelete, handleBulkDelete };
  }

  /**
   *
   * consequence list, total by filtering local List
   * @param: filter: TFilter
   * @param: source: T[]
   * @return: { list, total, loadingList, handleAdd }
   *
   * */
  useLocalList<T extends Model, TFilter extends ModelFilter>(
    modelFilter: TFilter,
    source: T[], // source item always content key
  ) {
    //  auto complete subscription until isCancelled == true (unMounted component)
    const [subscription] = commonService.useSubscription();
    // const { isCancelled, cancelSubcription } = subcriptionCancellation();
    const [{ list, total, loadingList }, dispatch] = useReducer<
      Reducer<StateOfList<T>, ActionOfList<T>>
    >(listReducer, {
      list: source,
      total: source?.length ? source?.length : 0,
      loadingList: false,
      isLoadList: true,
    });

    const { handleFetchInit, handleFetchEnd } = this.useFetchEffect(dispatch);

    // sortData by sortType and sortOrder
    const sortData: (item: T[]) => T[] = useCallback(
      (list: T[]) => {
        return _.orderBy(list, modelFilter.orderBy, modelFilter.orderType);
      },
      [modelFilter.orderBy, modelFilter.orderType],
    );

    // filter data based on filter properties and sort data
    const doFilter: (list: T[]) => T[] = useCallback(
      (list: T[]) => {
        return sortData(filterList(list, modelFilter));
      },
      [modelFilter, sortData],
    );

    useEffect(() => {
      subscription.add(
        of(source)
          .pipe(
            tap(handleFetchInit),
            map(doFilter), // sort and filtering data
            // takeUntil(isCancelled),
            skip(modelFilter.skip ? modelFilter.skip : 0), // skip
            take(modelFilter.take ? modelFilter.take : DEFAULT_TAKE), // take
            finalize(handleFetchEnd),
          )
          .subscribe((results: T[]) => {
            dispatch({
              type: SET_LIST,
              payload: {
                list: results,
                total: results?.length ? results?.length : 0,
              },
            });
          }),
      );
      //   return () => {
      //     cancelSubcription();
      //   };
    }, [
      doFilter,
      handleFetchEnd,
      handleFetchInit,
      modelFilter.skip,
      modelFilter.take,
      sortData,
      source,
      subscription,
    ]);

    return { list, total, loadingList };
  }
}

function filterList<T extends Model, TFilter extends ModelFilter>(
  list: T[],
  search: TFilter,
) {
  if (typeof search === "object" && search !== null) {
    Object.entries<
      StringFilter | DateFilter | NumberFilter | IdFilter | GuidFilter
    >(search as any).forEach(([key, value]) => {
      if (value instanceof StringFilter) {
        Object.entries(value).forEach(([filterKey, filterValue]) => {
          // filter by StringFilter
          if (typeof filterValue === "string" && filterValue !== "") {
            filterValue = filterValue.toLowerCase();
            switch (filterKey) {
              case nameof(value.startWith):
                list = list.filter((t: T) => {
                  return t[key]
                    .toString()
                    .toLowerCase()
                    ?.startsWith(filterValue);
                });
                break;

              case nameof(value.endWith):
                list = list.filter((t: T) => {
                  return t[key]
                    .toString()
                    .toLowerCase()
                    ?.endsWith(filterValue);
                });
                break;

              case nameof(value.contain):
                list = list.filter((t: T) => {
                  return (
                    t[key]
                      .toString()
                      .toLowerCase()
                      ?.indexOf(filterValue) >= 0
                  );
                });
                break;

              default:
                // Do nothing
                break;
            }
          }
          // filter by NumberFilter
          if (value instanceof NumberFilter) {
            Object.entries(value).forEach(([filterKey, filterValue]) => {
              if (filterKey === nameof(value.range)) {
                list = list.filter((t: T) => {
                  const v: number = t[key] as number;
                  if (typeof v === "number") {
                    let result: boolean = true;
                    if (filterValue instanceof Array) {
                      if (typeof filterValue[0] === "number") {
                        result = result && v >= filterValue[0];
                      }
                      if (typeof filterValue[1] === "number") {
                        result = result && v <= filterValue[1];
                      }
                    }
                    return result;
                  }
                  return true;
                });
              } else {
                if (
                  typeof filterValue === "number" &&
                  !Number.isNaN(filterValue)
                ) {
                  switch (filterKey) {
                    case nameof(value.equal):
                      list = list.filter((t: T) => {
                        const v: number = t[key] as number;
                        if (
                          typeof v === "number" &&
                          typeof filterValue === "number"
                        ) {
                          return v === filterValue;
                        }
                        return true;
                      });
                      break;

                    case nameof(value.notEqual):
                      list = list.filter((t: T) => {
                        const v: number = t[key] as number;
                        if (
                          typeof v === "number" &&
                          typeof filterValue === "number"
                        ) {
                          return v !== filterValue;
                        }
                        return true;
                      });
                      break;

                    case nameof(value.less):
                      list = list.filter((t: T) => {
                        const v: number = t[key] as number;
                        if (
                          typeof v === "number" &&
                          typeof filterValue === "number"
                        ) {
                          return v < filterValue;
                        }
                        return true;
                      });
                      break;

                    case nameof(value.greater):
                      list = list.filter((t: T) => {
                        const v: number = t[key] as number;
                        if (
                          typeof v === "number" &&
                          typeof filterValue === "number"
                        ) {
                          return v > filterValue;
                        }
                        return true;
                      });
                      break;

                    case nameof(value.lessEqual):
                      list = list.filter((t: T) => {
                        const v: number = t[key] as number;
                        if (
                          typeof v === "number" &&
                          typeof filterValue === "number"
                        ) {
                          return v <= filterValue;
                        }
                        return true;
                      });
                      break;

                    case nameof(value.greaterEqual):
                      list = list.filter((t: T) => {
                        const v: number = t[key] as number;
                        if (
                          typeof v === "number" &&
                          typeof filterValue === "number"
                        ) {
                          return v >= filterValue;
                        }
                        return true;
                      });
                      break;

                    default:
                      // Do nothing
                      break;
                  }
                }
              }
            });
          }
          // filter by DateFilter
          if (value instanceof DateFilter) {
            Object.entries(value).forEach(([filterKey, filterValue]) => {
              if (filterKey === nameof(value.range)) {
                list = list.filter((t: T) => {
                  const v: number = (t[key] as Moment)?.toDate().getTime();
                  if (typeof v === "number") {
                    const [minValue, maxValue] = (filterValue ?? []) as [
                      Moment,
                      Moment,
                    ];
                    let result: boolean = true;
                    if (minValue !== null && typeof minValue === "object") {
                      const minTimeValue: number = minValue.toDate().getTime();
                      result = result && minTimeValue <= v;
                    }
                    if (maxValue !== null && typeof maxValue === "object") {
                      const maxTimeValue: number = maxValue.toDate().getTime();
                      result = result && maxTimeValue >= v;
                    }
                    return result;
                  }
                  return true;
                });
              } else {
                switch (filterKey) {
                  case nameof(value.equal):
                    list = list.filter((t: T) => {
                      const v: number = (t[key] as Moment)?.toDate().getTime();
                      if (
                        typeof v === "number" &&
                        typeof filterValue === "object" &&
                        filterValue !== null
                      ) {
                        const comparisonValue: number = (filterValue as Moment)
                          ?.toDate()
                          .getTime();
                        if (typeof comparisonValue === "number") {
                          return v === comparisonValue;
                        }
                        return true;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.notEqual):
                    list = list.filter((t: T) => {
                      const v: number = (t[key] as Moment)?.toDate().getTime();
                      if (
                        typeof v === "number" &&
                        typeof filterValue === "object" &&
                        filterValue !== null
                      ) {
                        const comparisonValue: number = (filterValue as Moment)
                          ?.toDate()
                          .getTime();
                        if (typeof comparisonValue === "number") {
                          return v !== comparisonValue;
                        }
                        return true;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.less):
                    list = list.filter((t: T) => {
                      const v: number = (t[key] as Moment)?.toDate().getTime();
                      if (
                        typeof v === "number" &&
                        typeof filterValue === "object" &&
                        filterValue !== null
                      ) {
                        const comparisonValue: number = (filterValue as Moment)
                          ?.toDate()
                          .getTime();
                        if (typeof comparisonValue === "number") {
                          return v < comparisonValue;
                        }
                        return true;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.greater):
                    list = list.filter((t: T) => {
                      const v: number = (t[key] as Moment)?.toDate().getTime();
                      if (
                        typeof v === "number" &&
                        typeof filterValue === "object" &&
                        filterValue !== null
                      ) {
                        const comparisonValue: number = (filterValue as Moment)
                          ?.toDate()
                          .getTime();
                        if (typeof comparisonValue === "number") {
                          return v > comparisonValue;
                        }
                        return true;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.lessEqual):
                    list = list.filter((t: T) => {
                      const v: number = (t[key] as Moment)?.toDate().getTime();
                      if (
                        typeof v === "number" &&
                        typeof filterValue === "object" &&
                        filterValue !== null
                      ) {
                        const comparisonValue: number = (filterValue as Moment)
                          ?.toDate()
                          .getTime();
                        if (typeof comparisonValue === "number") {
                          return v <= comparisonValue;
                        }
                        return true;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.greaterEqual):
                    list = list.filter((t: T) => {
                      const v: number = (t[key] as Moment)?.toDate().getTime();
                      if (
                        typeof v === "number" &&
                        typeof filterValue === "object" &&
                        filterValue !== null
                      ) {
                        const comparisonValue: number = (filterValue as Moment)
                          ?.toDate()
                          .getTime();
                        if (typeof comparisonValue === "number") {
                          return v >= comparisonValue;
                        }
                        return true;
                      }
                      return true;
                    });
                    break;

                  default:
                    // Do nothing
                    break;
                }
              }
            });
          }
          // filter by IdFilter
          if (value instanceof IdFilter || value instanceof GuidFilter) {
            Object.entries(value).forEach(([filterKey, filterValue]) => {
              if (
                (typeof filterValue === "string" && filterValue !== "") ||
                (typeof filterValue === "number" && !Number.isNaN(filterValue))
              ) {
                switch (filterKey) {
                  case nameof(value.equal):
                    list = list.filter((t: T) => {
                      const v: number = t[key] as number;
                      if (
                        (typeof v === "number" || typeof value === "string") &&
                        (typeof filterValue === "number" ||
                          typeof filterValue === "string")
                      ) {
                        return v === +filterValue;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.notEqual):
                    list = list.filter((t: T) => {
                      const v: number = t[key] as number;
                      if (
                        (typeof v === "number" || typeof value === "string") &&
                        (typeof filterValue === "number" ||
                          typeof filterValue === "string")
                      ) {
                        return v !== filterValue;
                      }
                      return true;
                    });
                    break;

                  case nameof(value.in):
                    list = list.filter((t: T) => {
                      const v: number = t[key] as number;
                      if (
                        (typeof v === "number" || typeof value === "string") &&
                        (filterValue as any) instanceof Array
                      ) {
                        return (filterValue as any).includes(v);
                      }
                      return true;
                    });
                    break;

                  case nameof(value.notIn):
                    list = list.filter((t: T) => {
                      const v: number = t[key] as number;
                      if (
                        (typeof v === "number" || typeof value === "string") &&
                        (filterValue as any) instanceof Array
                      ) {
                        return !(filterValue as any).includes(v);
                      }
                      return true;
                    });
                    break;

                  default:
                    // Do nothing
                    break;
                }
              }
            });
          }
        });
      }
    });
  }
  return list;
}

export default new ListService();
