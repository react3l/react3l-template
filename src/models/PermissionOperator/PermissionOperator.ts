import { Model } from '@react3l/react3l/core';
import { FieldType } from 'models/FieldType';

export class PermissionOperator extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public fieldTypeId?: number;


    public fieldType?: FieldType;

}
