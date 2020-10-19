import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';

export class Organization extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public parentId?: number;

    public path?: string;

    public level?: number;

    public statusId?: number;

    public phone?: string;

    public email?: string;

    public address?: string;




    public rowId?: number;

    public used?: boolean;


    public parent?: Organization;

    public status?: Status;


}
