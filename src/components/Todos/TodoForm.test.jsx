import { render, screen, userEventSetup } from 'test-utils';

import TodoForm from './TodoForm';

describe('Todo Form Component', () => {
  test('not show modal form on first render', () => {
    render(<TodoForm />);

    const headingElement = screen.queryByRole('heading', { level: 1 });
    expect(headingElement).not.toBeInTheDocument();
  });
});
