import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROVINCE_PREFIX } from "config/api-consts";
import { Province, ProvinceFilter } from 'models/Province';
import { Status, StatusFilter } from 'models/Status';

export class ProvinceRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROVINCE_PREFIX);
    }

    public count = (provinceFilter?: ProvinceFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), provinceFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (provinceFilter?: ProvinceFilter): Observable<Province[]> => {
        return this.httpObservable.post<Province[]>(kebabCase(nameof(this.list)), provinceFilter)
            .pipe(map((response: AxiosResponse<Province[]>) => response.data));
    };

    public get = (id: number | string): Observable<Province> => {
        return this.httpObservable.post<Province>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Province>) => response.data));
    };

    public create = (province: Province): Observable<Province> => {
        return this.httpObservable.post<Province>(kebabCase(nameof(this.create)), province)
            .pipe(map((response: AxiosResponse<Province>) => response.data));
    };

    public update = (province: Province): Observable<Province> => {
        return this.httpObservable.post<Province>(kebabCase(nameof(this.update)), province)
            .pipe(map((response: AxiosResponse<Province>) => response.data));
    };

    public delete = (province: Province): Observable<Province> => {
        return this.httpObservable.post<Province>(kebabCase(nameof(this.delete)), province)
            .pipe(map((response: AxiosResponse<Province>) => response.data));
    };

    public save = (province: Province): Observable<Province> => {
        return province.id ? this.update(province) : this.create(province);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
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

export const provinceRepository = new ProvinceRepository();
