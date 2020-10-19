import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PROVIDER_PREFIX } from "config/api-consts";
import { Provider, ProviderFilter } from 'models/Provider';

export class ProviderRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PROVIDER_PREFIX);
    }

    public count = (providerFilter?: ProviderFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), providerFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (providerFilter?: ProviderFilter): Observable<Provider[]> => {
        return this.httpObservable.post<Provider[]>(kebabCase(nameof(this.list)), providerFilter)
            .pipe(map((response: AxiosResponse<Provider[]>) => response.data));
    };

    public get = (id: number | string): Observable<Provider> => {
        return this.httpObservable.post<Provider>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Provider>) => response.data));
    };

    public create = (provider: Provider): Observable<Provider> => {
        return this.httpObservable.post<Provider>(kebabCase(nameof(this.create)), provider)
            .pipe(map((response: AxiosResponse<Provider>) => response.data));
    };

    public update = (provider: Provider): Observable<Provider> => {
        return this.httpObservable.post<Provider>(kebabCase(nameof(this.update)), provider)
            .pipe(map((response: AxiosResponse<Provider>) => response.data));
    };

    public delete = (provider: Provider): Observable<Provider> => {
        return this.httpObservable.post<Provider>(kebabCase(nameof(this.delete)), provider)
            .pipe(map((response: AxiosResponse<Provider>) => response.data));
    };

    public save = (provider: Provider): Observable<Provider> => {
        return provider.id ? this.update(provider) : this.create(provider);
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

export const providerRepository = new ProviderRepository();
