import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import MenuDetail from './MenuDetail';

describe('MenuDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <MenuDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
