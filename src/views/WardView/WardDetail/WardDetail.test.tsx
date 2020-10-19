import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import WardDetail from './WardDetail';

describe('WardDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <WardDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
