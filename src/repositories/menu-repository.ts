import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_MENU_PREFIX } from "config/api-consts";
import { Menu, MenuFilter } from 'models/Menu';
import { Field, FieldFilter } from 'models/Field';
import { FieldType, FieldTypeFilter } from 'models/FieldType';

export class MenuRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_MENU_PREFIX);
    }

    public count = (menuFilter?: MenuFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), menuFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (menuFilter?: MenuFilter): Observable<Menu[]> => {
        return this.httpObservable.post<Menu[]>(kebabCase(nameof(this.list)), menuFilter)
            .pipe(map((response: AxiosResponse<Menu[]>) => response.data));
    };

    public get = (id: number | string): Observable<Menu> => {
        return this.httpObservable.post<Menu>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Menu>) => response.data));
    };

    public create = (menu: Menu): Observable<Menu> => {
        return this.httpObservable.post<Menu>(kebabCase(nameof(this.create)), menu)
            .pipe(map((response: AxiosResponse<Menu>) => response.data));
    };

    public update = (menu: Menu): Observable<Menu> => {
        return this.httpObservable.post<Menu>(kebabCase(nameof(this.update)), menu)
            .pipe(map((response: AxiosResponse<Menu>) => response.data));
    };

    public delete = (menu: Menu): Observable<Menu> => {
        return this.httpObservable.post<Menu>(kebabCase(nameof(this.delete)), menu)
            .pipe(map((response: AxiosResponse<Menu>) => response.data));
    };

    public save = (menu: Menu): Observable<Menu> => {
        return menu.id ? this.update(menu) : this.create(menu);
    };

    public singleListField = (fieldFilter: FieldFilter): Observable<Field[]> => {
        return this.httpObservable.post<Field[]>(kebabCase(nameof(this.singleListField)), fieldFilter)
            .pipe(map((response: AxiosResponse<Field[]>) => response.data));
    };
    public singleListFieldType = (fieldTypeFilter: FieldTypeFilter): Observable<FieldType[]> => {
        return this.httpObservable.post<FieldType[]>(kebabCase(nameof(this.singleListFieldType)), fieldTypeFilter)
            .pipe(map((response: AxiosResponse<FieldType[]>) => response.data));
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

export const menuRepository = new MenuRepository();
