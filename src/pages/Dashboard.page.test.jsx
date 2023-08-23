import { render, screen } from 'test-utils';

import Dashboard from './Dashboard.page';

describe('Dashboard Page Component', () => {
  test('render correctly', () => {
    render(<Dashboard />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    const createTodosElement = screen.getByTestId(/create-todo/i);

    expect(headingElement).toBeInTheDocument();
    expect(createTodosElement).toBeInTheDocument();
  });

  test('render list todo correctly', async () => {
    render(<Dashboard />);

    const listTodoElement = await screen.findAllByRole('listitem');

    expect(listTodoElement).toHaveLength(26);
  });

  test('render total todo done & in progress correctly', async () => {
    render(<Dashboard />);

    const buttonDoneElement = await screen.findByTestId('button-done');
    const buttonInProgressElement =
      await screen.findByTestId('button-inprogress');

    expect(buttonInProgressElement).toHaveTextContent('180');
    expect(buttonDoneElement).toHaveTextContent('8');
  });
});
