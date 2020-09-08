import { AxiosResponse } from "axios";
import { API_ADMINISTRATIVE_TYPE_PREFIX } from "config/api-consts";
import { BASE_API_URL } from "config/consts";
import { httpConfig } from "config/http";
import { AdministrativeType } from "models/AdministrativeType";
import { Repository } from "@react3l/react3l/core";
import { url } from "@react3l/react3l/helpers";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class AdministrativeTypeRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_ADMINISTRATIVE_TYPE_PREFIX);
  }

  public list = (): Observable<AdministrativeType[]> => {
    return this.httpObservable
      .get<AdministrativeType[]>("/")
      .pipe(
        map((response: AxiosResponse<AdministrativeType[]>) => response.data),
      );
  };
}

export const administrativeTypeRepository: AdministrativeTypeRepository = new AdministrativeTypeRepository();
