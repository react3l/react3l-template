import {StringFilter} from 'react3l-advanced-filters/StringFilter';
import {ModelFilter} from 'react3l/core';
import {IdFilter} from 'react3l-advanced-filters/IdFilter';
import { DateFilter } from 'react3l-advanced-filters/DateFilter';
import { NumberFilter } from 'react3l-advanced-filters/NumberFilter';
import { Payment } from './Payment';

export class PaymentFilter extends ModelFilter<Payment> {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public proviceId?: IdFilter = new IdFilter();

  public paymentDate?: DateFilter = new DateFilter();

  public date?: DateFilter = new DateFilter();

  public paymentNumber: NumberFilter = new NumberFilter();
}