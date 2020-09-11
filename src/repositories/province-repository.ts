import { Repository } from "@react3l/react3l/core";
import { httpConfig } from "config/http";
import { url } from "@react3l/react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { API_PROVINCE_PREFIX } from "config/api-consts";
import { Observable } from "rxjs";
import { Province } from "models/Province";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { ProvinceFilter } from "models/ProvinceFilter";

export class ProvinceRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PROVINCE_PREFIX);
  }

  public list = (provinceFilter: ProvinceFilter): Observable<Province[]> => {
    return this.httpObservable
      .get<Province[]>("/", {
        params: provinceFilter,
      })
      .pipe(map((response: AxiosResponse<Province[]>) => response.data));
  };

  public count = (provinceFilter: ProvinceFilter): Observable<number> => {
    return this.httpObservable
      .get<number>("/count", {
        params: provinceFilter,
      })
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public batchDelete = (selectedRowKeys: number[]): Observable<void> => {
    return this.httpObservable
      .post<number[]>("/batch-delete", selectedRowKeys)
      .pipe(map((response: AxiosResponse) => response.data));
  };

  public get = (id: number): Observable<Province> => {
    return this.httpObservable
      .get<Province>(`/${id}`)
      .pipe(map((response: AxiosResponse<Province>) => response.data));
  };
}

export const provinceRepository: ProvinceRepository = new ProvinceRepository();
