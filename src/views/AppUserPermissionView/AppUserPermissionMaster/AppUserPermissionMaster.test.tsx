import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import AppUserPermissionMaster from './AppUserPermissionMaster';

describe('AppUserPermissionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <AppUserPermissionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
