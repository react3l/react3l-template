import { Model } from '@react3l/react3l/core';
import { Field } from 'models/Field';

export class Menu extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public path?: string;

    public isDeleted?: boolean;



    public fields?: Field[];

}
