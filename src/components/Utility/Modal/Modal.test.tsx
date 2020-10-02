import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

describe('Modal', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter></MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
