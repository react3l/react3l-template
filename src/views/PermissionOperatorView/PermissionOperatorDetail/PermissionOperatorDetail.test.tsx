import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PermissionOperatorDetail from './PermissionOperatorDetail';

describe('PermissionOperatorDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PermissionOperatorDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
