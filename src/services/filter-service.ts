import moment from "moment";
import queryString from "query-string";
import { useMemo, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { DEFAULT_TAKE, STANDARD_DATE_TIME_FORMAT } from "react3l/config";
import { ModelFilter } from "react3l/core";
import { isDateTimeValue } from "helpers/date-time";
import { unflatten, flatten } from "helpers/json";

class FilterServices<TFilter extends ModelFilter> {
  /**
   *
   *
   * CRUD for query, source: url query
   * @param: modelClass: new () => TFilter
   * @return: { filter, setFilter }
   *
   * */

  useUrlQuery(
    modelClass: new () => TFilter,
  ): {
    filter: TFilter;
    setFilter: (modelFilter: TFilter) => void;
  } {
    const history = useHistory();
    const { search, pathname } = useLocation();

    const filter = useMemo(() => {
      // initialize modelFilter instance
      const modelFilter = new modelClass();
      const parsedQuery = queryString.parse(search) as any;
      const params = unflatten(parsedQuery); // build filter model from parsedQuery string
      Object.entries(params).forEach(([key, value]) => {
        switch (key) {
          case nameof(modelFilter.skip):
            modelFilter.skip = parseInt(value as string, 10) || 0;
            break;

          case nameof(modelFilter.take):
            modelFilter.take = parseInt(value as string, 10) || DEFAULT_TAKE;
            break;

          case nameof(modelFilter.orderBy):
            modelFilter.orderBy = value as any;
            break;

          case nameof(modelFilter.orderType):
            modelFilter.orderType = value as any;
            break;

          default:
            if (
              modelFilter.hasOwnProperty(key) &&
              typeof modelFilter[key] === "object" &&
              modelFilter[key] !== null &&
              typeof value === "object" &&
              value !== null
            ) {
              Object.entries(value).forEach(([filterKey, filterValue]) => {
                if (isDateTimeValue(filterValue as any)) {
                  modelFilter[key][filterKey] = moment(
                    new Date(filterValue as string),
                  );
                } else {
                  modelFilter[key][filterKey] = filterValue;
                }
              });
            }
            break;
        }
      });
      return modelFilter;
    }, [modelClass, search]);

    const setFilter = useCallback(
      (modelFilter: TFilter) => {
        Object.entries(modelFilter).forEach(([filterKey, filterValue]) => {
          if (
            typeof modelFilter[filterKey] === "object" &&
            typeof modelFilter[filterKey] !== undefined
          ) {
            Object.entries(filterValue).forEach(([fk]) => {
              if (
                typeof filterValue[fk] === "object" &&
                typeof filterValue[fk] !== undefined
              ) {
                if (filterValue[fk]?._isAMomentObject) {
                  filterValue[fk] = filterValue[fk].format(
                    STANDARD_DATE_TIME_FORMAT,
                  );
                }
              }
            });
          }
        });
        history.replace({
          pathname,
          search: queryString.stringify(flatten(modelFilter)),
        });
      },
      [history, pathname],
    );

    return { filter, setFilter };
  }
}

const filterService = new FilterServices();

export default filterService;
