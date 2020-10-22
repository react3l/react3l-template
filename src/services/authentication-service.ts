import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
// import { GlobalState } from 'core/config';
import * as Cookie from "js-cookie";
import { LOGIN_ROUTE } from "config/route-consts";
// import { AppUser } from 'models/AppUser';
// import { setGlobal } from 'reactn';
class AuthenticationService {
  protected http: AxiosInstance;

  constructor() {
    this.http = createHttpService();
  }

  // public checkAuth() {
  //   return this.http
  //     .post('rpc/portal/profile/get')
  //     .then((response: AxiosResponse<AppUser>) => response.data);
  // }
  // public login(appUser: AppUser) {
  //   return this.http
  //     .post('rpc/portal/account/login', appUser)
  //     .then((response: AxiosResponse<AppUser>) => response.data);
  // }

  public async logout() {
    Cookie.remove("Token");
    // await setGlobal<GlobalState>({
    //   user: null,
    // });
    window.location.href = LOGIN_ROUTE;
  }
}

const createHttpService = () => {
  const instance: AxiosInstance = axios.create(httpConfig);
  return instance;
};

const httpConfig: AxiosRequestConfig = {
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export default new AuthenticationService();
