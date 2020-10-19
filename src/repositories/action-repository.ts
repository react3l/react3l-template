import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ACTION_PREFIX } from "config/api-consts";
import { Action, ActionFilter } from 'models/Action';
import { Menu, MenuFilter } from 'models/Menu';

export class ActionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ACTION_PREFIX);
    }

    public count = (actionFilter?: ActionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), actionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (actionFilter?: ActionFilter): Observable<Action[]> => {
        return this.httpObservable.post<Action[]>(kebabCase(nameof(this.list)), actionFilter)
            .pipe(map((response: AxiosResponse<Action[]>) => response.data));
    };

    public get = (id: number | string): Observable<Action> => {
        return this.httpObservable.post<Action>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Action>) => response.data));
    };

    public create = (action: Action): Observable<Action> => {
        return this.httpObservable.post<Action>(kebabCase(nameof(this.create)), action)
            .pipe(map((response: AxiosResponse<Action>) => response.data));
    };

    public update = (action: Action): Observable<Action> => {
        return this.httpObservable.post<Action>(kebabCase(nameof(this.update)), action)
            .pipe(map((response: AxiosResponse<Action>) => response.data));
    };

    public delete = (action: Action): Observable<Action> => {
        return this.httpObservable.post<Action>(kebabCase(nameof(this.delete)), action)
            .pipe(map((response: AxiosResponse<Action>) => response.data));
    };

    public save = (action: Action): Observable<Action> => {
        return action.id ? this.update(action) : this.create(action);
    };

    public singleListMenu = (menuFilter: MenuFilter): Observable<Menu[]> => {
        return this.httpObservable.post<Menu[]>(kebabCase(nameof(this.singleListMenu)), menuFilter)
            .pipe(map((response: AxiosResponse<Menu[]>) => response.data));
    };
    

    public bulkDelete = (idList: number[] | string[]): Observable<void> => {
        return this.httpObservable.post(kebabCase(nameof(this.bulkDelete)), idList)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public import = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file);
        return this.httpObservable.post<void>(kebabCase(nameof(this.import)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public export = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export', filter, {
          responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const actionRepository = new ActionRepository();
