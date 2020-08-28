import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import PaymentRequestMasterView from 'views/App/PaymentRequestView/PaymentRequestMasterView/PaymentRequestMasterView';

describe('PaymentRequestMasterView', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <PaymentRequestMasterView />
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
