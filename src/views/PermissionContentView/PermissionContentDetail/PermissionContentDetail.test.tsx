import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PermissionContentDetail from './PermissionContentDetail';

describe('PermissionContentDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PermissionContentDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
