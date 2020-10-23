import { Repository } from "@react3l/react3l/core";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LOGIN_ROUTE } from "config/route-consts";
import * as Cookie from "js-cookie";
import { AppUser } from "models/AppUser";
import { map } from "rxjs/operators";

class AuthenticationService extends Repository {
  constructor() {
    super(httpConfig);
  }

  public checkAuth() {
    return this.httpObservable
      .post("rpc/portal/profile/get")
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public login(appUser: AppUser) {
    return this.httpObservable
      .post("rpc/portal/account/login", appUser)
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public async logout() {
    Cookie.remove("Token");
    window.location.href = LOGIN_ROUTE;
  }
}

const httpConfig: AxiosRequestConfig = {
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export default new AuthenticationService();
