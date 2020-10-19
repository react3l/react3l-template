import { Model } from '@react3l/react3l/core';
import { Field } from 'models/Field';
import { Permission } from 'models/Permission';

export class PermissionFieldMapping extends Model
{
    public permissionId?: number;

    public fieldId?: number;

    public value?: string;


    public field?: Field;

    public permission?: Permission;
}
