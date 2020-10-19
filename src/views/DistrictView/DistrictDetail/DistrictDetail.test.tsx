import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import DistrictDetail from './DistrictDetail';

describe('DistrictDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <DistrictDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
