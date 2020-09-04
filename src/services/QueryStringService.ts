import React, { Reducer, useRef } from "react";
import { ModelFilter } from "react3l/core/model-filter";
import { Filter } from "react3l-advanced-filters/Filter";
import {
  AdvanceFilterAction,
  advanceFilterReducer,
  ActionFilterEnum,
} from "./AdvanceFilterService";
import { useHistory } from "react-router";
import { commonWebService } from "./CommonWebService";
import moment from "moment";
import { TablePaginationConfig } from "antd/lib/table";
import { Key, SorterResult } from "antd/lib/table/interface";
import { Model } from "react3l/core";
import { tableService } from "./TableService";
import { StringFilter } from "react3l-advanced-filters/StringFilter";
import { NumberFilter } from "react3l-advanced-filters/NumberFilter";
import { DateFilter } from "react3l-advanced-filters/DateFilter";
import { IdFilter } from "react3l-advanced-filters/IdFilter";
import { useCallback } from "reactn";
import nameof from 'ts-nameof.macro';

const qs = require("qs");

function isStringNumber(stringValue: string) {
  var regex = new RegExp("^-?\\d*\\.?\\d*$");
  return stringValue.match(regex);
}

export const queryStringService = {
  useQueryString<T extends Model, TFilter extends ModelFilter>(
    ClassFilter: new () => TFilter,
  ): [
    TFilter,
    (data: TFilter) => void,
    (action: AdvanceFilterAction<TFilter, Filter>) => void,
    (
      fieldName: keyof TFilter,
      fieldType: keyof StringFilter | NumberFilter | DateFilter | IdFilter,
    ) => (value: string | number) => void,
    (
      newPagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<T>,
    ) => void,
    (skip: number, take: number) => void,
    () => void,
  ] {
    const history = useHistory();

    const firstUpdate = useRef(true);

    const buildFilter = React.useMemo(() => {
      const modelFilter = new ClassFilter();

      const queryFilter: TFilter = qs.parse(
        history.location.search.substring(1),
      );

      if (!commonWebService.isEmpty(queryFilter)) {
        Object.entries(queryFilter).forEach(([key, value]: [keyof TFilter, any]) => {
          switch(key) {
            case nameof(ModelFilter.prototype.orderBy):
              modelFilter.orderBy = value;
              break;
            case nameof(ModelFilter.prototype.orderType):
              modelFilter.orderType = value;
              break;
            case nameof(ModelFilter.prototype.skip):
              modelFilter.skip = Number(value);
              break;
            case nameof(ModelFilter.prototype.take):
              modelFilter.take = Number(value);
              break;
            default:
              for (let prop in value) {
                if (isStringNumber(value[prop]))
                  value[prop] = Number(value[prop]);
              }
              modelFilter[key] = {...value};
              break;
          }
        });
        for (let prop in queryFilter) {
          if (modelFilter.hasOwnProperty(prop)) {
            if (
              typeof queryFilter[prop] === "object" &&
              queryFilter[prop].constructor === Object
            ) {
              for (let subProp in queryFilter[prop]) {
                if (queryFilter[prop][subProp]) {
                  modelFilter[prop][subProp] = isStringNumber(
                    queryFilter[prop][subProp],
                  )
                    ? Number(queryFilter[prop][subProp])
                    : queryFilter[prop][subProp];
                } else {
                  modelFilter[prop][subProp] = null;
                }
              }
            } else {
              modelFilter[prop] = queryFilter[prop];
            }
          } continue;
        }
        modelFilter["skip"] = Number(modelFilter["skip"]);
        modelFilter["take"] = Number(modelFilter["take"]);
      }
      return modelFilter;
    }, [ClassFilter, history.location.search]);

    const [modelFilter, dispatch] = React.useReducer<
      Reducer<TFilter, AdvanceFilterAction<TFilter, Filter>>
    >(advanceFilterReducer, buildFilter);

    const buildQuery = React.useCallback((modelFilter: ModelFilter): string => {
      const cloneModelFilter = { ...modelFilter };
      for (let prop in cloneModelFilter) {
        if (
          cloneModelFilter[prop] &&
          typeof cloneModelFilter[prop] === "object" &&
          cloneModelFilter[prop].constructor === Object
        ) {
          for (let subProp in cloneModelFilter[prop]) {
            if (moment.isMoment(cloneModelFilter[prop][subProp]))
              cloneModelFilter[prop][subProp] = moment(
                cloneModelFilter[prop][subProp],
              ).toISOString();
          }
        }
      }
      return qs.stringify(cloneModelFilter);
    }, []);

    const handleChangeFilter = React.useCallback(
      (fieldName: string, fieldType: keyof Filter) => (value: any) => {
        dispatch({
          type: ActionFilterEnum.ChangeOneField,
          fieldName: fieldName,
          fieldType: fieldType,
          fieldValue: value,
        });
      },
      [dispatch],
    );

    const handleChangeOrder = React.useCallback(
      (
        newPagination: TablePaginationConfig,
        filters: Record<string, Key[] | null>,
        sorter: SorterResult<T>,
      ) => {
        if (
          sorter.field !== modelFilter.orderBy ||
          sorter.order !==
            tableService.getAntOrderType(modelFilter, sorter.field)
        ) {
          dispatch({
            type: ActionFilterEnum.ChangeOrderType,
            orderBy: sorter.field,
            orderType: tableService.getOrderType(sorter.order),
          });
          return;
        }
      },
      [dispatch, modelFilter],
    );

    const handlePagination = React.useCallback(
      (skip: number, take: number) => {
        dispatch({
          type: ActionFilterEnum.ChangeSkipTake,
          skip,
          take,
        });
      },
      [dispatch],
    );

    const handleResetFilter = React.useCallback(() => {
      const newFilter = new ClassFilter();
      newFilter.skip = 0;
      newFilter.take = 10;

      dispatch({
        type: ActionFilterEnum.ChangeAllField,
        data: newFilter,
      });
    }, [dispatch, ClassFilter]);

    const handleUpdateNewFilter = useCallback((data: TFilter) => {
      dispatch({ type: ActionFilterEnum.ChangeAllField, data });
    }, []);

    React.useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      const queryFilter = buildQuery(modelFilter);
      history.push({
        pathname: history.location.pathname,
        search: queryFilter,
      });

      return function cleanup() {};
    }, [modelFilter, buildQuery, history]);

    return [
      modelFilter,
      handleUpdateNewFilter,
      dispatch,
      handleChangeFilter,
      handleChangeOrder,
      handlePagination,
      handleResetFilter,
    ];
  },
};
