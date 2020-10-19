import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import RoleMaster from './RoleMaster';

describe('RoleMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <RoleMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
