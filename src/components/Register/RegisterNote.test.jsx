import { render, screen } from 'test-utils';

import RegisterNote from './RegisterNote';

describe('Register Note Component', () => {
  test('render correctly', () => {
    render(<RegisterNote placeholder="Username" />);

    const placeholderElement = screen.getByText(
      '* Alphabet, numeric, underscore, hyphens only (4-24).',
      { exact: true }
    );

    expect(placeholderElement).toBeInTheDocument();
  });
});
