import { Repository } from "react3l/core";
import { httpConfig } from "config/http";
import { url } from "react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { API_PRICELIST_PREFIX } from "config/api-consts";
import { Observable } from "rxjs";
import { PriceList, PriceListFilter } from "models/PriceList";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";

export class PriceListRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PRICELIST_PREFIX);
  }

  public list = (filter: PriceListFilter): Observable<PriceList[]> => {
    return this.httpObservable
      .post<PriceList[]>("list", filter)
      .pipe(map((response: AxiosResponse<PriceList[]>) => response.data));
  };

  public count = (filter: PriceListFilter): Observable<number> => {
    return this.httpObservable
      .post<number>("total", filter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public delete = (priceList: PriceList): Observable<PriceList> => {
    return this.httpObservable
      .post<PriceList>("delete", priceList)
      .pipe(map((response: AxiosResponse<PriceList>) => response.data));
  };

  public bulkDelete = (idList: number[]): Observable<void> => {
    return this.httpObservable
      .post<void>("bulk-delete", idList)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };
}

export const priceListRepository: PriceListRepository = new PriceListRepository();
