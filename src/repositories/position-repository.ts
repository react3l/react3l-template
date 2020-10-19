import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_POSITION_PREFIX } from "config/api-consts";
import { Position, PositionFilter } from 'models/Position';
import { Status, StatusFilter } from 'models/Status';

export class PositionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_POSITION_PREFIX);
    }

    public count = (positionFilter?: PositionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), positionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (positionFilter?: PositionFilter): Observable<Position[]> => {
        return this.httpObservable.post<Position[]>(kebabCase(nameof(this.list)), positionFilter)
            .pipe(map((response: AxiosResponse<Position[]>) => response.data));
    };

    public get = (id: number | string): Observable<Position> => {
        return this.httpObservable.post<Position>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Position>) => response.data));
    };

    public create = (position: Position): Observable<Position> => {
        return this.httpObservable.post<Position>(kebabCase(nameof(this.create)), position)
            .pipe(map((response: AxiosResponse<Position>) => response.data));
    };

    public update = (position: Position): Observable<Position> => {
        return this.httpObservable.post<Position>(kebabCase(nameof(this.update)), position)
            .pipe(map((response: AxiosResponse<Position>) => response.data));
    };

    public delete = (position: Position): Observable<Position> => {
        return this.httpObservable.post<Position>(kebabCase(nameof(this.delete)), position)
            .pipe(map((response: AxiosResponse<Position>) => response.data));
    };

    public save = (position: Position): Observable<Position> => {
        return position.id ? this.update(position) : this.create(position);
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

export const positionRepository = new PositionRepository();
