import { Model } from '@react3l/react3l/core';

export class Provider extends Model
{
    public id?: number;

    public name?: string;

    public googleRedirectUri?: string;

    public aDIP?: string;

    public aDUsername?: string;

    public aDPassword?: string;

    public googleClient?: string;

    public googleClientSecret?: string;

    public microsoftClient?: string;

    public microsoftClientSecret?: string;

    public microsoftRedirectUri?: string;

}
