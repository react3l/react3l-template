import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_APP_USER_PERMISSION_PREFIX } from "config/api-consts";
import { AppUserPermission, AppUserPermissionFilter } from 'models/AppUserPermission';

export class AppUserPermissionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_APP_USER_PERMISSION_PREFIX);
    }

    public count = (appUserPermissionFilter?: AppUserPermissionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), appUserPermissionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (appUserPermissionFilter?: AppUserPermissionFilter): Observable<AppUserPermission[]> => {
        return this.httpObservable.post<AppUserPermission[]>(kebabCase(nameof(this.list)), appUserPermissionFilter)
            .pipe(map((response: AxiosResponse<AppUserPermission[]>) => response.data));
    };

    public get = (id: number | string): Observable<AppUserPermission> => {
        return this.httpObservable.post<AppUserPermission>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<AppUserPermission>) => response.data));
    };

    public create = (appUserPermission: AppUserPermission): Observable<AppUserPermission> => {
        return this.httpObservable.post<AppUserPermission>(kebabCase(nameof(this.create)), appUserPermission)
            .pipe(map((response: AxiosResponse<AppUserPermission>) => response.data));
    };

    public update = (appUserPermission: AppUserPermission): Observable<AppUserPermission> => {
        return this.httpObservable.post<AppUserPermission>(kebabCase(nameof(this.update)), appUserPermission)
            .pipe(map((response: AxiosResponse<AppUserPermission>) => response.data));
    };

    public delete = (appUserPermission: AppUserPermission): Observable<AppUserPermission> => {
        return this.httpObservable.post<AppUserPermission>(kebabCase(nameof(this.delete)), appUserPermission)
            .pipe(map((response: AxiosResponse<AppUserPermission>) => response.data));
    };

    public save = (appUserPermission: AppUserPermission): Observable<AppUserPermission> => {
        return appUserPermission.id ? this.update(appUserPermission) : this.create(appUserPermission);
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

export const appUserPermissionRepository = new AppUserPermissionRepository();
