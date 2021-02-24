import { Model } from '@react3l/react3l/core';
import { TFunction } from 'i18next';
import React, { ReactNode } from 'react';

interface AppMainDetailTitle {
    children?: ReactNode,
    translate?: TFunction,
    isDetail?: boolean,
    model?: Model
}

export function AppMainDetailTitle(props: AppMainDetailTitle) {
    const {
        translate,
        isDetail,
        model,
        children
    } = props;

    return <>
        <div className='page__header d-flex align-items-center'>
            {   isDetail ? 
                (
                    <div className='page__title mr-1'>
                        {children}
                    </div>
                ) : 
                (
                    translate("general.actions.create")
                )
            }
        </div>
    </>;
}