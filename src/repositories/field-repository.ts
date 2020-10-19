import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_FIELD_PREFIX } from "config/api-consts";
import { Field, FieldFilter } from 'models/Field';
import { FieldType, FieldTypeFilter } from 'models/FieldType';
import { Menu, MenuFilter } from 'models/Menu';

export class FieldRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_FIELD_PREFIX);
    }

    public count = (fieldFilter?: FieldFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), fieldFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (fieldFilter?: FieldFilter): Observable<Field[]> => {
        return this.httpObservable.post<Field[]>(kebabCase(nameof(this.list)), fieldFilter)
            .pipe(map((response: AxiosResponse<Field[]>) => response.data));
    };

    public get = (id: number | string): Observable<Field> => {
        return this.httpObservable.post<Field>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Field>) => response.data));
    };

    public create = (field: Field): Observable<Field> => {
        return this.httpObservable.post<Field>(kebabCase(nameof(this.create)), field)
            .pipe(map((response: AxiosResponse<Field>) => response.data));
    };

    public update = (field: Field): Observable<Field> => {
        return this.httpObservable.post<Field>(kebabCase(nameof(this.update)), field)
            .pipe(map((response: AxiosResponse<Field>) => response.data));
    };

    public delete = (field: Field): Observable<Field> => {
        return this.httpObservable.post<Field>(kebabCase(nameof(this.delete)), field)
            .pipe(map((response: AxiosResponse<Field>) => response.data));
    };

    public save = (field: Field): Observable<Field> => {
        return field.id ? this.update(field) : this.create(field);
    };

    public singleListFieldType = (fieldTypeFilter: FieldTypeFilter): Observable<FieldType[]> => {
        return this.httpObservable.post<FieldType[]>(kebabCase(nameof(this.singleListFieldType)), fieldTypeFilter)
            .pipe(map((response: AxiosResponse<FieldType[]>) => response.data));
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

export const fieldRepository = new FieldRepository();
