import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import FieldDetail from './FieldDetail';

describe('FieldDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <FieldDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
