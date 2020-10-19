import { Model } from '@react3l/react3l/core';
import { Menu } from 'models/Menu';

export class Action extends Model
{
    public id?: number;

    public name?: string;

    public menuId?: number;

    public isDeleted?: boolean;


    public menu?: Menu;


}
