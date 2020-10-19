import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import OrganizationMaster from './OrganizationMaster';

describe('OrganizationMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <OrganizationMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
