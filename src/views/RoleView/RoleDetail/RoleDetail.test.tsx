import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import RoleDetail from './RoleDetail';

describe('RoleDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <RoleDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
