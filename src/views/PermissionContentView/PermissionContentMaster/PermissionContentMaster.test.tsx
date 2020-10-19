import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PermissionContentMaster from './PermissionContentMaster';

describe('PermissionContentMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PermissionContentMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
