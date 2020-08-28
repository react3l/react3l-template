import React, { Reducer } from 'react';
import { ModelFilter } from 'react3l/core/model-filter';
import { Filter } from 'react3l-advanced-filters/Filter';
import { AdvanceFilterAction, advanceFilterReducer } from './AdvanceFilterService';
import { useHistory } from 'react-router';
import { commonWebService } from './CommonWebService';
import moment from 'moment';

const qs = require('qs');

export const queryStringService = {
    useQueryString<TFilter extends ModelFilter>(
        ClassFilter: new () => TFilter,
    ): [
        TFilter,
        (action: AdvanceFilterAction<TFilter, Filter>) => void
    ] {
        const history = useHistory();

        const buildFilter = React.useCallback(() => {
            const modelFilter = new ClassFilter();
            const queryFilter: TFilter = qs.parse(history.location.search.substring(1));
            if (!commonWebService.isEmpty(queryFilter)) {
                for(let prop in queryFilter) {
                    if (modelFilter.hasOwnProperty(prop)) {
                        if(typeof queryFilter[prop] === 'object' && queryFilter[prop].constructor === Object) {
                            for (let subProp in queryFilter[prop]) {
                                if (modelFilter[prop].hasOwnProperty(subProp)){
                                    modelFilter[prop][subProp] = typeof modelFilter[prop][subProp] === 'number' ? Number(queryFilter[prop][subProp]) : queryFilter[prop][subProp];
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

        const [filter] = React.useState<TFilter>(buildFilter());

        const [modelFilter, dispatch] = React.useReducer<Reducer<TFilter, AdvanceFilterAction<TFilter, Filter>>>(advanceFilterReducer, filter);

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
        
        React.useEffect(() => {
            const queryFilter = buildQuery(modelFilter);
            history.push({
                pathname: history.location.pathname,
                search: queryFilter,
            });

            return function cleanup() {

            };
        }, [modelFilter , buildQuery, history]);

        return [filter, dispatch];
    },
};
