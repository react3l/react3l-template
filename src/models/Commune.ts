import { AdministrativeType } from "models/AdministrativeType";
import { District } from "models/District";
import { Model, RegisteredModel } from "@react3l/react3l/core";

@RegisteredModel()
export class Commune extends Model {
  public id?: number;

  public name?: string;

  public code?: string;

  public englishName?: string;

  public administrativeType?: AdministrativeType;

  public administrativeTypeId?: number;

  public districtId?: number;

  public district?: District;
}
