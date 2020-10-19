import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PositionDetail from './PositionDetail';

describe('PositionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PositionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
