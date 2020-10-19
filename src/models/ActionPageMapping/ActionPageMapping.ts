import { Model } from '@react3l/react3l/core';
import { Action } from 'models/Action';
import { Page } from 'models/Page';

export class ActionPageMapping extends Model
{
    public pageId?: number;

    public actionId?: number;


    public action?: Action;

    public page?: Page;
}
