import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import PaymentRequestDetailView from 'views/App/PaymentRequestView/PaymentRequestDetailView/PaymentRequestDetailView';

describe('ProvinceDetailView', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <PaymentRequestDetailView />
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
