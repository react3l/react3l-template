import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import AppUserMaster from './AppUserMaster';

describe('AppUserMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <AppUserMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
