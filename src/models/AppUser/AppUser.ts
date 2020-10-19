import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Organization } from 'models/Organization';
import { Position } from 'models/Position';
import { Province } from 'models/Province';
import { Sex } from 'models/Sex';
import { Status } from 'models/Status';
import { AppUserRoleMapping } from 'models/AppUserRoleMapping';

export class AppUser extends Model
{
    public id?: number;

    public username?: string;

    public password?: string;

    public otpCode?: string;

    public otpExpired?: Moment;

    public displayName?: string;

    public address?: string;

    public email?: string;

    public phone?: string;

    public provinceId?: number;

    public positionId?: number;

    public department?: string;

    public organizationId?: number;

    public sexId?: number;

    public statusId?: number;




    public avatar?: string;

    public birthday?: Moment;

    public rowId?: number;

    public used?: boolean;

    public longitude?: number;

    public latitude?: number;


    public organization?: Organization;

    public position?: Position;

    public province?: Province;

    public sex?: Sex;

    public status?: Status;

    public appUserRoleMappings?: AppUserRoleMapping[];

}
