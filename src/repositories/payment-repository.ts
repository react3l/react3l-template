import { Repository } from "@react3l/react3l/core";
import { url } from "@react3l/react3l/helpers";
import { AxiosResponse } from "axios";
import { API_PAYMENT_REQUEST_PREFIX } from "config/api-consts";
import { BASE_API_URL } from "config/consts";
import { httpConfig } from "config/http";
import { Payment } from "models/Payment";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { dataPayment } from "views/App/PaymentRequestView/PaymentRequestMasterView/data";

export class PaymentRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PAYMENT_REQUEST_PREFIX);
  }

  public list = (): Observable<Payment[]> => {
    var dataClone = [...dataPayment];
    return of(dataClone).pipe(delay(1500));
  };

  public count = (): Observable<number> => {
    return of(dataPayment.length).pipe(delay(1500));
    // return this.httpObservable.get<number>('/count', {
    //   params: PaymentFilter,
    // })
    //   .pipe(
    //     map((response: AxiosResponse<number>) => response.data),
    //   );
  };

  public batchDelete = (selectedRowKeys: number[]): Observable<void> => {
    return this.httpObservable
      .post<number[]>("/batch-delete", selectedRowKeys)
      .pipe(map((response: AxiosResponse) => response.data));
  };

  public get = (id: number): Observable<Payment> => {
    return this.httpObservable
      .get<Payment>(`/${id}`)
      .pipe(map((response: AxiosResponse<Payment>) => response.data));
  };
}

export const paymentRepository: PaymentRepository = new PaymentRepository();
