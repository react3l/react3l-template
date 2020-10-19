import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PERMISSION_PREFIX } from "config/api-consts";
import { Permission, PermissionFilter } from 'models/Permission';
import { Menu, MenuFilter } from 'models/Menu';
import { Role, RoleFilter } from 'models/Role';
import { PermissionFieldMapping, PermissionFieldMappingFilter } from 'models/PermissionFieldMapping';
import { Field, FieldFilter } from 'models/Field';

export class PermissionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PERMISSION_PREFIX);
    }

    public count = (permissionFilter?: PermissionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), permissionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (permissionFilter?: PermissionFilter): Observable<Permission[]> => {
        return this.httpObservable.post<Permission[]>(kebabCase(nameof(this.list)), permissionFilter)
            .pipe(map((response: AxiosResponse<Permission[]>) => response.data));
    };

    public get = (id: number | string): Observable<Permission> => {
        return this.httpObservable.post<Permission>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public create = (permission: Permission): Observable<Permission> => {
        return this.httpObservable.post<Permission>(kebabCase(nameof(this.create)), permission)
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public update = (permission: Permission): Observable<Permission> => {
        return this.httpObservable.post<Permission>(kebabCase(nameof(this.update)), permission)
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public delete = (permission: Permission): Observable<Permission> => {
        return this.httpObservable.post<Permission>(kebabCase(nameof(this.delete)), permission)
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public save = (permission: Permission): Observable<Permission> => {
        return permission.id ? this.update(permission) : this.create(permission);
    };

    public singleListMenu = (menuFilter: MenuFilter): Observable<Menu[]> => {
        return this.httpObservable.post<Menu[]>(kebabCase(nameof(this.singleListMenu)), menuFilter)
            .pipe(map((response: AxiosResponse<Menu[]>) => response.data));
    };
    public singleListRole = (roleFilter: RoleFilter): Observable<Role[]> => {
        return this.httpObservable.post<Role[]>(kebabCase(nameof(this.singleListRole)), roleFilter)
            .pipe(map((response: AxiosResponse<Role[]>) => response.data));
    };
    public singleListPermissionFieldMapping = (permissionFieldMappingFilter: PermissionFieldMappingFilter): Observable<PermissionFieldMapping[]> => {
        return this.httpObservable.post<PermissionFieldMapping[]>(kebabCase(nameof(this.singleListPermissionFieldMapping)), permissionFieldMappingFilter)
            .pipe(map((response: AxiosResponse<PermissionFieldMapping[]>) => response.data));
    };
    public singleListField = (fieldFilter: FieldFilter): Observable<Field[]> => {
        return this.httpObservable.post<Field[]>(kebabCase(nameof(this.singleListField)), fieldFilter)
            .pipe(map((response: AxiosResponse<Field[]>) => response.data));
    };
    
    public countField = (fieldFilter: FieldFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countField)), fieldFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };
    public listField = (fieldFilter: FieldFilter): Observable<Field[]> => {
        return this.httpObservable.post<Field[]>(kebabCase(nameof(this.listField)), fieldFilter)
            .pipe(map((response: AxiosResponse<Field[]>) => response.data));
    };
    public importField = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file);
            return this.httpObservable.post<void>(kebabCase(nameof(this.importField)), formData)
                .pipe(map((response: AxiosResponse<void>) => response.data));
    };
    public exportField = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportField)), filter, {
          responseType: 'arraybuffer',
        });
    };
    public exportTemplateField = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportTemplateField)), {}, {
          responseType: 'arraybuffer',
        });
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

export const permissionRepository = new PermissionRepository();
