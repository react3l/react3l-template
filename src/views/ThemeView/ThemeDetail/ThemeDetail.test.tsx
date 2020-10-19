import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ThemeDetail from './ThemeDetail';

describe('ThemeDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ThemeDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
