import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import MenuMaster from './MenuMaster';

describe('MenuMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <MenuMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
