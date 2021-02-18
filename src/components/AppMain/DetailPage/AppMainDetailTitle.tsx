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
        model
    } = props;

    return <>
        <div className='page__header d-flex align-items-center'>
            <div className='page__title mr-1'>
                {translate("expenses.detail.title")}
            </div>
            {   isDetail ? 
                (
                    <div className='page__id'>{`- # ${model.id}`}</div>
                ) : 
                (
                    translate("general.actions.create")
                )
            }
        </div>
    </>;
}