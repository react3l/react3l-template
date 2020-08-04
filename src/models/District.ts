import {Model, RegisteredModel} from 'react3l/core';
import {AdministrativeType} from 'models/AdministrativeType';

@RegisteredModel()
export class District extends Model {
  public id?: number;

  public name?: string;

  public administrativeType?: AdministrativeType;

  public administrativeTypeId?: number;
}
