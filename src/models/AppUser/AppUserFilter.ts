import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class AppUserFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public username?: StringFilter = new StringFilter();
  public password?: StringFilter = new StringFilter();
  public otpCode?: StringFilter = new StringFilter();
  public otpExpired?: DateFilter = new DateFilter();
  public displayName?: StringFilter = new StringFilter();
  public address?: StringFilter = new StringFilter();
  public email?: StringFilter = new StringFilter();
  public phone?: StringFilter = new StringFilter();
  public provinceId?: IdFilter = new IdFilter();
  public positionId?: IdFilter = new IdFilter();
  public department?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public sexId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
  public avatar?: StringFilter = new StringFilter();
  public birthday?: DateFilter = new DateFilter();
  public rowId?: IdFilter = new IdFilter();
  public longitude?: NumberFilter = new NumberFilter();
  public latitude?: NumberFilter = new NumberFilter();
}
