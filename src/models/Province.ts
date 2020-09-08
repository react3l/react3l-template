import { Model, RegisteredModel } from "@react3l/react3l/core";
import { AdministrativeType } from "models/AdministrativeType";
import { District } from "models/District";

@RegisteredModel()
export class Province extends Model {
  public id?: number;

  public name?: string;

  public code?: string;

  public englishName?: string;

  public administrativeType?: AdministrativeType;

  public administrativeTypeId?: number;

  public districts?: District[];
}
