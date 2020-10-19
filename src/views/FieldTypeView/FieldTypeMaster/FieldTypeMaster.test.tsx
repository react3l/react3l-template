import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import FieldTypeMaster from './FieldTypeMaster';

describe('FieldTypeMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <FieldTypeMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
