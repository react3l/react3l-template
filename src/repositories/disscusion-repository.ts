import { Repository } from "@react3l/react3l/core";
import { httpConfig } from "config/http";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { API_DISSCUSION_PREFIX } from "config/api-consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import {FileModel, Message as Disscusion, MessageFilter as DisscusionFilter} from "components/Utility/ChatBox/ChatBox.model";
import nameof from "ts-nameof.macro";


export class DisscusionRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_DISSCUSION_PREFIX);
  }

  public list = (disscusionFilter: DisscusionFilter): Observable<Disscusion[]> => {
    return this.httpObservable
      .post<Disscusion[]>(kebabCase(nameof(this.list)), disscusionFilter)
      .pipe(map((response: AxiosResponse<Disscusion[]>) => response.data));
  };

  public count = (disscusionFilter: DisscusionFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), disscusionFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public get = (id: number): Observable<Disscusion> => {
    return this.httpObservable
      .post<Disscusion>(`/${id}`, {})
      .pipe(map((response: AxiosResponse<Disscusion>) => response.data));
  };

  public create = (disscusion: Disscusion): Observable<Disscusion> => {
    return this.httpObservable
      .post<Disscusion>(kebabCase(nameof(this.create)), disscusion)
      .pipe(map((response: AxiosResponse<Disscusion>) => response.data));
  };

  public delete = (disscusion: Disscusion): Observable<boolean> => {
    return this.httpObservable
      .post<boolean>(kebabCase(nameof(this.delete)), disscusion)
      .pipe(map((response: AxiosResponse<boolean>) => response.data));
  };

  public import = (file: File): Observable<FileModel> => {
    const formData: FormData = new FormData();
    formData.append(nameof(file), file);
    return this.httpObservable
      .post<FileModel>(kebabCase(nameof(this.import)), formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(map((response: AxiosResponse<FileModel>) => response.data));
  };
}

export const disscusionRepository: DisscusionRepository = new DisscusionRepository();
