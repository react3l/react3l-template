import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_DISTRICT_PREFIX } from "config/api-consts";
import { District, DistrictFilter } from 'models/District';
import { Province, ProvinceFilter } from 'models/Province';
import { Status, StatusFilter } from 'models/Status';

export class DistrictRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_DISTRICT_PREFIX);
    }

    public count = (districtFilter?: DistrictFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), districtFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (districtFilter?: DistrictFilter): Observable<District[]> => {
        return this.httpObservable.post<District[]>(kebabCase(nameof(this.list)), districtFilter)
            .pipe(map((response: AxiosResponse<District[]>) => response.data));
    };

    public get = (id: number | string): Observable<District> => {
        return this.httpObservable.post<District>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<District>) => response.data));
    };

    public create = (district: District): Observable<District> => {
        return this.httpObservable.post<District>(kebabCase(nameof(this.create)), district)
            .pipe(map((response: AxiosResponse<District>) => response.data));
    };

    public update = (district: District): Observable<District> => {
        return this.httpObservable.post<District>(kebabCase(nameof(this.update)), district)
            .pipe(map((response: AxiosResponse<District>) => response.data));
    };

    public delete = (district: District): Observable<District> => {
        return this.httpObservable.post<District>(kebabCase(nameof(this.delete)), district)
            .pipe(map((response: AxiosResponse<District>) => response.data));
    };

    public save = (district: District): Observable<District> => {
        return district.id ? this.update(district) : this.create(district);
    };

    public singleListProvince = (provinceFilter: ProvinceFilter): Observable<Province[]> => {
        return this.httpObservable.post<Province[]>(kebabCase(nameof(this.singleListProvince)), provinceFilter)
            .pipe(map((response: AxiosResponse<Province[]>) => response.data));
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

export const districtRepository = new DistrictRepository();
