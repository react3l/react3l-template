import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_FIELD_TYPE_PREFIX } from "config/api-consts";
import { FieldType, FieldTypeFilter } from 'models/FieldType';

export class FieldTypeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_FIELD_TYPE_PREFIX);
    }

    public count = (fieldTypeFilter?: FieldTypeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), fieldTypeFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (fieldTypeFilter?: FieldTypeFilter): Observable<FieldType[]> => {
        return this.httpObservable.post<FieldType[]>(kebabCase(nameof(this.list)), fieldTypeFilter)
            .pipe(map((response: AxiosResponse<FieldType[]>) => response.data));
    };

    public get = (id: number | string): Observable<FieldType> => {
        return this.httpObservable.post<FieldType>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<FieldType>) => response.data));
    };

    public create = (fieldType: FieldType): Observable<FieldType> => {
        return this.httpObservable.post<FieldType>(kebabCase(nameof(this.create)), fieldType)
            .pipe(map((response: AxiosResponse<FieldType>) => response.data));
    };

    public update = (fieldType: FieldType): Observable<FieldType> => {
        return this.httpObservable.post<FieldType>(kebabCase(nameof(this.update)), fieldType)
            .pipe(map((response: AxiosResponse<FieldType>) => response.data));
    };

    public delete = (fieldType: FieldType): Observable<FieldType> => {
        return this.httpObservable.post<FieldType>(kebabCase(nameof(this.delete)), fieldType)
            .pipe(map((response: AxiosResponse<FieldType>) => response.data));
    };

    public save = (fieldType: FieldType): Observable<FieldType> => {
        return fieldType.id ? this.update(fieldType) : this.create(fieldType);
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

export const fieldTypeRepository = new FieldTypeRepository();
