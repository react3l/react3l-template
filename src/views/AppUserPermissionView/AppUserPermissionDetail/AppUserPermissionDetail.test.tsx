import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import AppUserPermissionDetail from './AppUserPermissionDetail';

describe('AppUserPermissionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <AppUserPermissionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
