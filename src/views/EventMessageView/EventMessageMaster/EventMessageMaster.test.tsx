import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import EventMessageMaster from './EventMessageMaster';

describe('EventMessageMaster', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <EventMessageMaster/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
