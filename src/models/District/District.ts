import { Model } from '@react3l/react3l/core';
import { Province } from 'models/Province';
import { Status } from 'models/Status';

export class District extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public priority?: number;

    public provinceId?: number;

    public statusId?: number;




    public rowId?: number;

    public used?: boolean;


    public province?: Province;

    public status?: Status;

}
