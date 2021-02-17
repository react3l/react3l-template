import { TFunction } from 'i18next';
import React from 'react';
import { UseMaster } from 'services/pages/master-service';

export interface AppMainTitle extends UseMaster {
    translate?: TFunction
}

export function AppMainTitle(props: AppMainTitle) {

    const {
        translate,
        handleGoCreate
    } = props;
    
    return <>
        <div className='page__header d-flex align-items-center justify-content-between'>
            <div className='page__title'>
                {translate("appUsers.master.title")}
            </div>
            <div className='page__actions d-flex align-items-center'>
                <button className='btn btn-sm component__btn-primary ml-3 grow-animate-1'
                        onClick={ handleGoCreate }>
                    {translate("general.actions.create")}
                </button>
            </div>
        </div>
    </>;
}