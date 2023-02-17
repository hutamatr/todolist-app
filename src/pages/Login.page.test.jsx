import { render, screen } from 'test-utils';

import Login from './Login.page';

describe('Login Page Component', () => {
  test('render correctly', () => {
    render(<Login />);

    const headingElement = screen.getByRole('heading', { level: 1 });

    expect(headingElement).toBeInTheDocument();
  });
});
