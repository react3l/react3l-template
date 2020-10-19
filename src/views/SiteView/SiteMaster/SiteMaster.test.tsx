import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import SiteMaster from './SiteMaster';

describe('SiteMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <SiteMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
