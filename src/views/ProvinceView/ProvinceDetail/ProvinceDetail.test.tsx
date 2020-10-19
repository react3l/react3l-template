import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ProvinceDetail from './ProvinceDetail';

describe('ProvinceDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ProvinceDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
