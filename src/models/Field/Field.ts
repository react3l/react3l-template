import { Model } from '@react3l/react3l/core';
import { FieldType } from 'models/FieldType';
import { Menu } from 'models/Menu';

export class Field extends Model
{
    public id?: number;

    public name?: string;

    public fieldTypeId?: number;

    public menuId?: number;

    public isDeleted?: boolean;


    public fieldType?: FieldType;

    public menu?: Menu;


}
