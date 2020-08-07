import {Commune} from 'models/Commune';
import {Province} from 'models/Province';
import {Model, RegisteredModel} from 'react3l/core';
import {AdministrativeType} from 'models/AdministrativeType';

@RegisteredModel()
export class District extends Model {
  public id?: number;

  public name?: string;

  public code?: string;

  public englishName?: string;

  public administrativeType?: AdministrativeType;

  public administrativeTypeId?: number;

  public provinceId?: number;

  public province?: Province;

  public communes?: Commune[];
}
