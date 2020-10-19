import { Model } from '@react3l/react3l/core';
import { Field } from 'models/Field';
import { Permission } from 'models/Permission';
import { PermissionOperator } from 'models/PermissionOperator';

export class PermissionContent extends Model
{
    public id?: number;

    public permissionId?: number;

    public fieldId?: number;

    public permissionOperatorId?: number;

    public value?: string;


    public field?: Field;

    public permission?: Permission;

    public permissionOperator?: PermissionOperator;
}
