import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PermissionOperatorMaster from './PermissionOperatorMaster';

describe('PermissionOperatorMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PermissionOperatorMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
