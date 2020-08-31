import React, { Reducer, useRef } from 'react';
import { ModelFilter } from 'react3l/core/model-filter';
import { Filter } from 'react3l-advanced-filters/Filter';
import { AdvanceFilterAction, advanceFilterReducer } from './AdvanceFilterService';
import { useHistory } from 'react-router';
import { commonWebService } from './CommonWebService';
import moment from 'moment';

const qs = require('qs');

function isStringNumber (stringValue: string)  {
    var regex = new RegExp('^-?\\d*\\.?\\d*$');
    return stringValue.match(regex);
}

export const queryStringService = {
    useQueryString<TFilter extends ModelFilter>(
        ClassFilter: new () => TFilter,
    ): [
        TFilter,
        (action: AdvanceFilterAction<TFilter, Filter>) => void
    ] {
        const history = useHistory();

        const firstUpdate = useRef(true);

        const buildFilter = React.useMemo(() => {
            const modelFilter = new ClassFilter();
            const queryFilter: TFilter = qs.parse(history.location.search.substring(1));
            if (!commonWebService.isEmpty(queryFilter)) {
                for(let prop in queryFilter) {
                    if (modelFilter.hasOwnProperty(prop)) {
                        if(typeof queryFilter[prop] === 'object' && queryFilter[prop].constructor === Object) {
                            for (let subProp in queryFilter[prop]) {
                                if (queryFilter[prop][subProp]) {
                                    modelFilter[prop][subProp] = isStringNumber(queryFilter[prop][subProp]) ? Number(queryFilter[prop][subProp]) : queryFilter[prop][subProp];
                                } else {
                                    modelFilter[prop][subProp] = null;
                                }
                            }
                        } else {
                            modelFilter[prop] = queryFilter[prop];
                        }
                    } continue;
                }
                modelFilter['skip'] = Number(modelFilter['skip']);
                modelFilter['take'] = Number(modelFilter['take']);
            }
            return modelFilter;
        }, [ClassFilter, history]);

        const [modelFilter, dispatch] = React.useReducer<Reducer<TFilter, AdvanceFilterAction<TFilter, Filter>>>(advanceFilterReducer, buildFilter);

        const buildQuery = React.useCallback((modelFilter: ModelFilter): string => {
            const cloneModelFilter = {...modelFilter};
            for (let prop in cloneModelFilter) {
                if (typeof cloneModelFilter[prop] === 'object' && cloneModelFilter[prop].constructor === Object) {
                    for (let subProp in cloneModelFilter[prop]) {
                        if (moment.isMoment(cloneModelFilter[prop][subProp]))
                            cloneModelFilter[prop][subProp] = moment(cloneModelFilter[prop][subProp]).toISOString();
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

            return function cleanup() {

            };
        }, [modelFilter , buildQuery, history]);

        return [modelFilter, dispatch];
    },
};
