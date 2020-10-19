import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import AppUserDetail from './AppUserDetail';

describe('AppUserDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <AppUserDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
