import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import DistrictMaster from './DistrictMaster';

describe('DistrictMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <DistrictMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
