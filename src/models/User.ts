import {Moment} from 'moment';
import {Model, RegisteredModel} from 'react3l/core';

@RegisteredModel()
export class User extends Model {
  public id?: number;

  public email?: string;

  public birthday?: Moment;
}
