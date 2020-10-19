import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';

export class EventMessage extends Model
{
    public id?: number;

    public time?: Moment;

    public rowId?: number;

    public entityName?: string;

    public content?: string;

}
