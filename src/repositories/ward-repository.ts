import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WARD_PREFIX } from "config/api-consts";
import { Ward, WardFilter } from 'models/Ward';
import { District, DistrictFilter } from 'models/District';
import { Status, StatusFilter } from 'models/Status';

export class WardRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WARD_PREFIX);
    }

    public count = (wardFilter?: WardFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), wardFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (wardFilter?: WardFilter): Observable<Ward[]> => {
        return this.httpObservable.post<Ward[]>(kebabCase(nameof(this.list)), wardFilter)
            .pipe(map((response: AxiosResponse<Ward[]>) => response.data));
    };

    public get = (id: number | string): Observable<Ward> => {
        return this.httpObservable.post<Ward>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Ward>) => response.data));
    };

    public create = (ward: Ward): Observable<Ward> => {
        return this.httpObservable.post<Ward>(kebabCase(nameof(this.create)), ward)
            .pipe(map((response: AxiosResponse<Ward>) => response.data));
    };

    public update = (ward: Ward): Observable<Ward> => {
        return this.httpObservable.post<Ward>(kebabCase(nameof(this.update)), ward)
            .pipe(map((response: AxiosResponse<Ward>) => response.data));
    };

    public delete = (ward: Ward): Observable<Ward> => {
        return this.httpObservable.post<Ward>(kebabCase(nameof(this.delete)), ward)
            .pipe(map((response: AxiosResponse<Ward>) => response.data));
    };

    public save = (ward: Ward): Observable<Ward> => {
        return ward.id ? this.update(ward) : this.create(ward);
    };

    public singleListDistrict = (districtFilter: DistrictFilter): Observable<District[]> => {
        return this.httpObservable.post<District[]>(kebabCase(nameof(this.singleListDistrict)), districtFilter)
            .pipe(map((response: AxiosResponse<District[]>) => response.data));
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

export const wardRepository = new WardRepository();
