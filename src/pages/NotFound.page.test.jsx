import { render, screen } from 'test-utils';

import NotFound from './NotFound.page';

describe('Not Found Component', () => {
  test('render correctly', () => {
    render(<NotFound />);

    const notFoundHeadingElement = screen.getByRole('heading', {
      name: /page not found!/i,
    });
    expect(notFoundHeadingElement).toBeInTheDocument();
  });
});
