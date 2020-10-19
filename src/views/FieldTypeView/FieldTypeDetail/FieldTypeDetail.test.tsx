import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import FieldTypeDetail from './FieldTypeDetail';

describe('FieldTypeDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <FieldTypeDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
