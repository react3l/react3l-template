import { Repository } from "@react3l/react3l/core";
import { httpConfig } from "config/http";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { User } from "models/User";
import { UserFilter } from "models/UserFilter";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { API_USER_PREFIX } from "config/api-consts";

export class UserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_USER_PREFIX);
  }

  public list = (userFilter: UserFilter): Observable<User[]> => {
    return this.httpObservable
      .post<User[]>(kebabCase(nameof(this.list)), userFilter)
      .pipe(map((response: AxiosResponse<User[]>) => response.data));
  };
}

export const userRepository: UserRepository = new UserRepository();
