import { Filter } from "@react3l/advanced-filters/Filter";
import { ModelFilter } from "@react3l/react3l/core/model-filter";
import moment from "moment";
import React, { Reducer, useRef } from "react";
import { useHistory } from "react-router";
import nameof from "ts-nameof.macro";
import {
  AdvanceFilterAction,
  advanceFilterReducer
} from "./advance-filter-service";
import { commonWebService } from "./common-web-service";

const qs = require("qs");

function isStringNumber(stringValue: string) {
  var regex = new RegExp("^-?\\d*\\.?\\d*$");
  return stringValue.match(regex);
}

export const queryStringService = {
  useQueryString<TFilter extends ModelFilter>(
    ClassFilter: new () => TFilter,
  ): [TFilter, (action: AdvanceFilterAction<TFilter, Filter>) => void] {
    const history = useHistory();

    const firstUpdate = useRef(true);

    const buildFilter = React.useMemo(() => {
      const modelFilter = new ClassFilter();

      const queryFilter: TFilter = qs.parse(
        history.location.search.substring(1),
      );
    
      if (!commonWebService.isEmpty(queryFilter)) {
        Object.entries(queryFilter).forEach(
          ([key, value]: [keyof TFilter, any]) => {
            switch (key) {
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
                  if (value[prop] && isStringNumber(value[prop]))
                    value[prop] = Number(value[prop]);
                }
                modelFilter[key] = { ...value };
                break;
            }
          },
        );
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
          cloneModelFilter[prop] instanceof Object
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

    return [modelFilter, dispatch];
  },
};
