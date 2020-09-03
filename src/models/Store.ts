import Model from "core/models/Model";

export class Store extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public parentStoreId?: number;

  public organizationId?: number;

  public storeTypeId?: number;

  public storeGroupingId?: number;

  public telephone?: string;

  public provinceId?: number;

  public districtId?: number;

  public wardId?: number;

  public address?: string;

  public deliveryAddress?: string;

  public latitude?: number;

  public longitude?: number;

  public deliveryLatitude?: number;

  public deliveryLongitude?: number;

  public ownerName?: string;

  public ownerPhone?: string;

  public ownerEmail?: string;

  public statusId?: number = 1;

  public storeScoutingId?: number;
  public taxCode?: string;
}
