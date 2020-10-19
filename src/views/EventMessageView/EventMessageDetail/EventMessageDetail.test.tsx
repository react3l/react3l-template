import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import EventMessageDetail from './EventMessageDetail';

describe('EventMessageDetail', () => {
  it('renders without crashing', async () => {
    const node: React.ReactElement<any> = (
      <MemoryRouter>
        <EventMessageDetail/>
      </MemoryRouter>
    );
    expect(node).toBeTruthy();
  });
});
