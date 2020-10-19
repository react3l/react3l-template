import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PermissionMaster from './PermissionMaster';

describe('PermissionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PermissionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
