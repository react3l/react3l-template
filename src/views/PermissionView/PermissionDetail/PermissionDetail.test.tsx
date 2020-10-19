import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PermissionDetail from './PermissionDetail';

describe('PermissionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PermissionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
