import { District } from "models/District";
import { Province } from "models/Province";
import { Moment } from "moment";
import { Model, RegisteredModel } from "@react3l/react3l/core";

@RegisteredModel()
export class User extends Model {
  public id?: number;

  public email?: string;

  public birthday?: Moment;

  public firstName?: string;

  public lastName?: string;

  public provinceId?: number;

  public province?: Province;

  public districtId?: number;

  public district?: District;
}
