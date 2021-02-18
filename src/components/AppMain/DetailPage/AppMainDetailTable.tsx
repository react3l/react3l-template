import { Row } from 'antd';
import React, { ReactNode } from 'react';

interface AppMainDetailTable {
    children: ReactNode
}

export function AppMainDetailTable(props: AppMainDetailTable) {
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