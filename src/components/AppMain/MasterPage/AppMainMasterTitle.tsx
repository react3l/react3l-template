import { TFunction } from 'i18next';
import React from 'react';
import { ReactNode } from 'react';
import { UseMaster } from 'services/pages/master-service';

export interface AppMainMasterTitle extends UseMaster {
    translate?: TFunction,
    children?: ReactNode
}

export function AppMainMasterTitle(props: AppMainMasterTitle) {

    const {
        translate,
        handleGoCreate,
        children
    } = props;
    
    return <>
        <div className='page__header d-flex align-items-center justify-content-between'>
            <div className='page__title'>
                {children}
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