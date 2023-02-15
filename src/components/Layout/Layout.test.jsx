import { render, screen } from 'test-utils';

import Layout from './Layout';

describe('Layout Component', () => {
  test('render correctly', () => {
    render(<Layout />);

    const headerElement = screen.getByRole('banner');
    const mainElement = screen.getByRole('main');

    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
});
