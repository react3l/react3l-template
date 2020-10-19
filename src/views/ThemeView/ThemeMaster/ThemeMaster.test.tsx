import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ThemeMaster from './ThemeMaster';

describe('ThemeMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ThemeMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
