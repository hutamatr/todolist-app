import { render, screen } from 'test-utils';

import HomePage from './Home.page';

describe('Home Page Component', () => {
  test('render correctly', async () => {
    render(<HomePage />);

    const usernameElement = await screen.findByRole('heading', {
      name: /hello, hutama/i,
    });
    const textElement = screen.getByText(/what do you want to do today?/i);

    expect(usernameElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
