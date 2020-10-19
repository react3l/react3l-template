import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ProviderMaster from './ProviderMaster';

describe('ProviderMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ProviderMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
