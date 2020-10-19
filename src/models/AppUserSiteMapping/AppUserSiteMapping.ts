import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Site } from 'models/Site';

export class AppUserSiteMapping extends Model
{
    public appUserId?: number;

    public siteId?: number;

    public enabled?: boolean;


    public appUser?: AppUser;

    public site?: Site;
}
