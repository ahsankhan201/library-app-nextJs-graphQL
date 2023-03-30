import React from 'react';

import DataDisplay from '../';

describe('DataDisplay', () => {
  const mockData = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  it('displays data from API when API call is successful', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/data').reply(200, mockData);

    const wrapper = mount(<DataDisplay />);
    await wrapper.instance().fetchData();

    expect(wrapper.state('data')).toEqual(mockData);
  });

  it('displays error message when API call fails', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/data').reply(500);

    const wrapper = mount(<DataDisplay />);
    await wrapper.instance().fetchData();

    expect(wrapper.state('error')).toBeTruthy();
  });
});
