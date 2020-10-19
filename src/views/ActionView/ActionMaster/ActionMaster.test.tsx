import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ActionMaster from './ActionMaster';

describe('ActionMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ActionMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
