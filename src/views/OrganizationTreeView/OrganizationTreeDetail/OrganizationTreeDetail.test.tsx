import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import OrganizationDetail from './OrganizationDetail';

describe('OrganizationDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <OrganizationDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
