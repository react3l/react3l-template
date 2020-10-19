import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PAGE_PREFIX } from "config/api-consts";
import { Page, PageFilter } from 'models/Page';

export class PageRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PAGE_PREFIX);
    }

    public count = (pageFilter?: PageFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), pageFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (pageFilter?: PageFilter): Observable<Page[]> => {
        return this.httpObservable.post<Page[]>(kebabCase(nameof(this.list)), pageFilter)
            .pipe(map((response: AxiosResponse<Page[]>) => response.data));
    };

    public get = (id: number | string): Observable<Page> => {
        return this.httpObservable.post<Page>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Page>) => response.data));
    };

    public create = (page: Page): Observable<Page> => {
        return this.httpObservable.post<Page>(kebabCase(nameof(this.create)), page)
            .pipe(map((response: AxiosResponse<Page>) => response.data));
    };

    public update = (page: Page): Observable<Page> => {
        return this.httpObservable.post<Page>(kebabCase(nameof(this.update)), page)
            .pipe(map((response: AxiosResponse<Page>) => response.data));
    };

    public delete = (page: Page): Observable<Page> => {
        return this.httpObservable.post<Page>(kebabCase(nameof(this.delete)), page)
            .pipe(map((response: AxiosResponse<Page>) => response.data));
    };

    public save = (page: Page): Observable<Page> => {
        return page.id ? this.update(page) : this.create(page);
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

export const pageRepository = new PageRepository();
