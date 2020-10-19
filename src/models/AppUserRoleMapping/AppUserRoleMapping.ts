import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Role } from 'models/Role';

export class AppUserRoleMapping extends Model
{
    public appUserId?: number;

    public roleId?: number;


    public appUser?: AppUser;

    public role?: Role;
}
