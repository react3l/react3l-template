import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PageMaster from './PageMaster';

describe('PageMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PageMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
