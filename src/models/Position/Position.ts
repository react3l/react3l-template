import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';

export class Position extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public statusId?: number;

    public rowId?: number;




    public used?: boolean;


    public status?: Status;

}
