import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ProviderDetail from './ProviderDetail';

describe('ProviderDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ProviderDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
