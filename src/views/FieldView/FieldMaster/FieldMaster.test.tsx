import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import FieldMaster from './FieldMaster';

describe('FieldMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <FieldMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
