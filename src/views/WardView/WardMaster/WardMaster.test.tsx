import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import WardMaster from './WardMaster';

describe('WardMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <WardMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
