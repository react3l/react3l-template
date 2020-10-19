import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_SITE_PREFIX } from "config/api-consts";
import { Site, SiteFilter } from 'models/Site';

export class SiteRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_SITE_PREFIX);
    }

    public count = (siteFilter?: SiteFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), siteFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (siteFilter?: SiteFilter): Observable<Site[]> => {
        return this.httpObservable.post<Site[]>(kebabCase(nameof(this.list)), siteFilter)
            .pipe(map((response: AxiosResponse<Site[]>) => response.data));
    };

    public get = (id: number | string): Observable<Site> => {
        return this.httpObservable.post<Site>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Site>) => response.data));
    };

    public create = (site: Site): Observable<Site> => {
        return this.httpObservable.post<Site>(kebabCase(nameof(this.create)), site)
            .pipe(map((response: AxiosResponse<Site>) => response.data));
    };

    public update = (site: Site): Observable<Site> => {
        return this.httpObservable.post<Site>(kebabCase(nameof(this.update)), site)
            .pipe(map((response: AxiosResponse<Site>) => response.data));
    };

    public delete = (site: Site): Observable<Site> => {
        return this.httpObservable.post<Site>(kebabCase(nameof(this.delete)), site)
            .pipe(map((response: AxiosResponse<Site>) => response.data));
    };

    public save = (site: Site): Observable<Site> => {
        return site.id ? this.update(site) : this.create(site);
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

export const siteRepository = new SiteRepository();
