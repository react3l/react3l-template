import { Model } from '@react3l/react3l/core';
import { District } from 'models/District';
import { Status } from 'models/Status';

export class Ward extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public priority?: number;

    public districtId?: number;

    public statusId?: number;




    public rowId?: number;

    public used?: boolean;


    public district?: District;

    public status?: Status;
}
