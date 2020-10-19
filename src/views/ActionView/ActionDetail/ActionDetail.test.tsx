import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ActionDetail from './ActionDetail';

describe('ActionDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <ActionDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
