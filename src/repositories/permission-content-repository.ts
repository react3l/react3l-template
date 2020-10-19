import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PERMISSION_CONTENT_PREFIX } from "config/api-consts";
import { PermissionContent, PermissionContentFilter } from 'models/PermissionContent';
import { Field, FieldFilter } from 'models/Field';
import { Permission, PermissionFilter } from 'models/Permission';
import { PermissionOperator, PermissionOperatorFilter } from 'models/PermissionOperator';

export class PermissionContentRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PERMISSION_CONTENT_PREFIX);
    }

    public count = (permissionContentFilter?: PermissionContentFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), permissionContentFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (permissionContentFilter?: PermissionContentFilter): Observable<PermissionContent[]> => {
        return this.httpObservable.post<PermissionContent[]>(kebabCase(nameof(this.list)), permissionContentFilter)
            .pipe(map((response: AxiosResponse<PermissionContent[]>) => response.data));
    };

    public get = (id: number | string): Observable<PermissionContent> => {
        return this.httpObservable.post<PermissionContent>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PermissionContent>) => response.data));
    };

    public create = (permissionContent: PermissionContent): Observable<PermissionContent> => {
        return this.httpObservable.post<PermissionContent>(kebabCase(nameof(this.create)), permissionContent)
            .pipe(map((response: AxiosResponse<PermissionContent>) => response.data));
    };

    public update = (permissionContent: PermissionContent): Observable<PermissionContent> => {
        return this.httpObservable.post<PermissionContent>(kebabCase(nameof(this.update)), permissionContent)
            .pipe(map((response: AxiosResponse<PermissionContent>) => response.data));
    };

    public delete = (permissionContent: PermissionContent): Observable<PermissionContent> => {
        return this.httpObservable.post<PermissionContent>(kebabCase(nameof(this.delete)), permissionContent)
            .pipe(map((response: AxiosResponse<PermissionContent>) => response.data));
    };

    public save = (permissionContent: PermissionContent): Observable<PermissionContent> => {
        return permissionContent.id ? this.update(permissionContent) : this.create(permissionContent);
    };

    public singleListField = (fieldFilter: FieldFilter): Observable<Field[]> => {
        return this.httpObservable.post<Field[]>(kebabCase(nameof(this.singleListField)), fieldFilter)
            .pipe(map((response: AxiosResponse<Field[]>) => response.data));
    };
    public singleListPermission = (permissionFilter: PermissionFilter): Observable<Permission[]> => {
        return this.httpObservable.post<Permission[]>(kebabCase(nameof(this.singleListPermission)), permissionFilter)
            .pipe(map((response: AxiosResponse<Permission[]>) => response.data));
    };
    public singleListPermissionOperator = (permissionOperatorFilter: PermissionOperatorFilter): Observable<PermissionOperator[]> => {
        return this.httpObservable.post<PermissionOperator[]>(kebabCase(nameof(this.singleListPermissionOperator)), permissionOperatorFilter)
            .pipe(map((response: AxiosResponse<PermissionOperator[]>) => response.data));
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

export const permissionContentRepository = new PermissionContentRepository();
