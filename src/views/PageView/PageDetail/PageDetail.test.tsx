import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import PageDetail from './PageDetail';

describe('PageDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <PageDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
