import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_EVENT_MESSAGE_PREFIX } from "config/api-consts";
import { EventMessage, EventMessageFilter } from 'models/EventMessage';

export class EventMessageRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_EVENT_MESSAGE_PREFIX);
    }

    public count = (eventMessageFilter?: EventMessageFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), eventMessageFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (eventMessageFilter?: EventMessageFilter): Observable<EventMessage[]> => {
        return this.httpObservable.post<EventMessage[]>(kebabCase(nameof(this.list)), eventMessageFilter)
            .pipe(map((response: AxiosResponse<EventMessage[]>) => response.data));
    };

    public get = (id: number | string): Observable<EventMessage> => {
        return this.httpObservable.post<EventMessage>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<EventMessage>) => response.data));
    };

    public create = (eventMessage: EventMessage): Observable<EventMessage> => {
        return this.httpObservable.post<EventMessage>(kebabCase(nameof(this.create)), eventMessage)
            .pipe(map((response: AxiosResponse<EventMessage>) => response.data));
    };

    public update = (eventMessage: EventMessage): Observable<EventMessage> => {
        return this.httpObservable.post<EventMessage>(kebabCase(nameof(this.update)), eventMessage)
            .pipe(map((response: AxiosResponse<EventMessage>) => response.data));
    };

    public delete = (eventMessage: EventMessage): Observable<EventMessage> => {
        return this.httpObservable.post<EventMessage>(kebabCase(nameof(this.delete)), eventMessage)
            .pipe(map((response: AxiosResponse<EventMessage>) => response.data));
    };

    public save = (eventMessage: EventMessage): Observable<EventMessage> => {
        return eventMessage.id ? this.update(eventMessage) : this.create(eventMessage);
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

export const eventMessageRepository = new EventMessageRepository();
