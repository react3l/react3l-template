import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import SiteDetail from './SiteDetail';

describe('SiteDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <SiteDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
