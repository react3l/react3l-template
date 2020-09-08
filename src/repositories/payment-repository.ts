import { PaymentFilter } from "models/PaymenFilter";
import { Repository } from "@react3l/react3l/core";
import { httpConfig } from "config/http";
import { url } from "@react3l/react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { API_PAYMENT_REQUEST_PREFIX } from "config/api-consts";
import { Observable, of } from "rxjs";
import { Payment } from "models/Payment";
import { map, delay } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { dataPayment } from "views/App/PaymentRequestView/PaymentRequestMasterView/data";

export class PaymentRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PAYMENT_REQUEST_PREFIX);
  }

  public list = (PaymentFilter: PaymentFilter): Observable<Payment[]> => {
    var dataClone = [...dataPayment];
    return of(dataClone).pipe(delay(1500));
    // return this.httpObservable.get<Payment[]>('/', {
    //   params: PaymentFilter,
    // })
    //   .pipe(
    //     map((response: AxiosResponse<Payment[]>) => response.data),
    //   );
  };

  public count = (PaymentFilter: PaymentFilter): Observable<number> => {
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
