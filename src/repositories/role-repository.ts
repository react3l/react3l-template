import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ROLE_PREFIX } from "config/api-consts";
import { Role, RoleFilter } from 'models/Role';
import { Status, StatusFilter } from 'models/Status';
import { Permission, PermissionFilter } from 'models/Permission';
import { Menu, MenuFilter } from 'models/Menu';

export class RoleRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ROLE_PREFIX);
    }

    public count = (roleFilter?: RoleFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), roleFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (roleFilter?: RoleFilter): Observable<Role[]> => {
        return this.httpObservable.post<Role[]>(kebabCase(nameof(this.list)), roleFilter)
            .pipe(map((response: AxiosResponse<Role[]>) => response.data));
    };

    public get = (id: number | string): Observable<Role> => {
        return this.httpObservable.post<Role>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public create = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.create)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public update = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.update)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public delete = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.delete)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public save = (role: Role): Observable<Role> => {
        return role.id ? this.update(role) : this.create(role);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListPermission = (permissionFilter: PermissionFilter): Observable<Permission[]> => {
        return this.httpObservable.post<Permission[]>(kebabCase(nameof(this.singleListPermission)), permissionFilter)
            .pipe(map((response: AxiosResponse<Permission[]>) => response.data));
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

export const roleRepository = new RoleRepository();
