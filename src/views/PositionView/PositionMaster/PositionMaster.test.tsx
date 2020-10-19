import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PositionMaster from './PositionMaster';

describe('PositionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PositionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
