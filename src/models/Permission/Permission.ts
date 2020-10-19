import { Model } from '@react3l/react3l/core';
import { Menu } from 'models/Menu';
import { Role } from 'models/Role';
import { PermissionFieldMapping } from 'models/PermissionFieldMapping';

export class Permission extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public roleId?: number;

    public menuId?: number;

    public statusId?: number;


    public menu?: Menu;

    public role?: Role;



    public permissionFieldMappings?: PermissionFieldMapping[];
}
