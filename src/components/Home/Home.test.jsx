import { render, screen } from 'test-utils';

import Home from './Home';

describe('Home Component', () => {
  test('render username correctly', () => {
    render(<Home username={'hutamatr'} />);

    const usernameElement = screen.getByRole('heading', {
      name: /hello, hutamatr/i,
    });
    const textElement = screen.getByText(/what do you want to do today?/i);

    expect(usernameElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  test('render initial total todos correctly', () => {
    render(<Home />);

    const totalTodosElement = screen.getByRole('heading', { level: 2 });

    expect(totalTodosElement).toHaveTextContent(/you have 0 list todo/i);
  });

  test('render image correctly', () => {
    render(<Home />);

    const totalTodosImageElement = screen.getByAltText(/todo/i);
    const categoryImageElement = screen.getByAltText(/category/i);
    const doneImageElement = screen.getByAltText(/done/i);
    const inProgressImageElement = screen.getByAltText(/in progress/i);

    expect(totalTodosImageElement).toBeInTheDocument();
    expect(categoryImageElement).toBeInTheDocument();
    expect(doneImageElement).toBeInTheDocument();
    expect(inProgressImageElement).toBeInTheDocument();
  });
});
