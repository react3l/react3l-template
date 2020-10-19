import { Model } from '@react3l/react3l/core';
import { Action } from 'models/Action';
import { Permission } from 'models/Permission';

export class PermissionActionMapping extends Model
{
    public permissionId?: number;

    public actionId?: number;


    public action?: Action;

    public permission?: Permission;
}
