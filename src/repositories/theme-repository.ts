import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_THEME_PREFIX } from "config/api-consts";
import { Theme, ThemeFilter } from 'models/Theme';

export class ThemeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_THEME_PREFIX);
    }

    public count = (themeFilter?: ThemeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), themeFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (themeFilter?: ThemeFilter): Observable<Theme[]> => {
        return this.httpObservable.post<Theme[]>(kebabCase(nameof(this.list)), themeFilter)
            .pipe(map((response: AxiosResponse<Theme[]>) => response.data));
    };

    public get = (id: number | string): Observable<Theme> => {
        return this.httpObservable.post<Theme>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Theme>) => response.data));
    };

    public create = (theme: Theme): Observable<Theme> => {
        return this.httpObservable.post<Theme>(kebabCase(nameof(this.create)), theme)
            .pipe(map((response: AxiosResponse<Theme>) => response.data));
    };

    public update = (theme: Theme): Observable<Theme> => {
        return this.httpObservable.post<Theme>(kebabCase(nameof(this.update)), theme)
            .pipe(map((response: AxiosResponse<Theme>) => response.data));
    };

    public delete = (theme: Theme): Observable<Theme> => {
        return this.httpObservable.post<Theme>(kebabCase(nameof(this.delete)), theme)
            .pipe(map((response: AxiosResponse<Theme>) => response.data));
    };

    public save = (theme: Theme): Observable<Theme> => {
        return theme.id ? this.update(theme) : this.create(theme);
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

export const themeRepository = new ThemeRepository();
