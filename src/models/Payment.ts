import {Model, RegisteredModel} from 'react3l/core';
import { Moment } from 'moment';
import { Province } from './Province';


@RegisteredModel()
export class Payment extends Model {
    public id?: number;

    public name?: string;

    public code?: string;

    public date?: Moment;

    public province?: Province;

    public provinceId?: number;

    public paymentDate?: Moment;

    public paymentNumber: number;
}