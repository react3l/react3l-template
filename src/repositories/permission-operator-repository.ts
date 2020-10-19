import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PERMISSION_OPERATOR_PREFIX } from "config/api-consts";
import { PermissionOperator, PermissionOperatorFilter } from 'models/PermissionOperator';
import { FieldType, FieldTypeFilter } from 'models/FieldType';

export class PermissionOperatorRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PERMISSION_OPERATOR_PREFIX);
    }

    public count = (permissionOperatorFilter?: PermissionOperatorFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), permissionOperatorFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (permissionOperatorFilter?: PermissionOperatorFilter): Observable<PermissionOperator[]> => {
        return this.httpObservable.post<PermissionOperator[]>(kebabCase(nameof(this.list)), permissionOperatorFilter)
            .pipe(map((response: AxiosResponse<PermissionOperator[]>) => response.data));
    };

    public get = (id: number | string): Observable<PermissionOperator> => {
        return this.httpObservable.post<PermissionOperator>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PermissionOperator>) => response.data));
    };

    public create = (permissionOperator: PermissionOperator): Observable<PermissionOperator> => {
        return this.httpObservable.post<PermissionOperator>(kebabCase(nameof(this.create)), permissionOperator)
            .pipe(map((response: AxiosResponse<PermissionOperator>) => response.data));
    };

    public update = (permissionOperator: PermissionOperator): Observable<PermissionOperator> => {
        return this.httpObservable.post<PermissionOperator>(kebabCase(nameof(this.update)), permissionOperator)
            .pipe(map((response: AxiosResponse<PermissionOperator>) => response.data));
    };

    public delete = (permissionOperator: PermissionOperator): Observable<PermissionOperator> => {
        return this.httpObservable.post<PermissionOperator>(kebabCase(nameof(this.delete)), permissionOperator)
            .pipe(map((response: AxiosResponse<PermissionOperator>) => response.data));
    };

    public save = (permissionOperator: PermissionOperator): Observable<PermissionOperator> => {
        return permissionOperator.id ? this.update(permissionOperator) : this.create(permissionOperator);
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

export const permissionOperatorRepository = new PermissionOperatorRepository();
