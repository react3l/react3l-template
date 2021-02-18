import { Row } from 'antd';
import React, { ReactNode } from 'react';

interface AppMainDetailForm {
    children: ReactNode;
}

export function AppMainDetailForm(props: AppMainDetailForm) {

    const {
        children
    } = props;

    return <>
        <div className='w-100 mt-3 page__detail-tabs'>
            <Row className='d-flex'>
                {children}
            </Row>
        </div>
    </>;
}