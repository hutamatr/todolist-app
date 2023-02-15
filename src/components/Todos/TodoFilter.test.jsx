import { render, screen } from 'test-utils';

import TodoFilter from './TodoFilter';

describe('Todo Filter Component', () => {
  test('render correctly', () => {
    render(
      <TodoFilter todoStatus={true} totalInProgress={10} totalTodoDone={10} />
    );

    const inProgressButtonElement = screen.getByRole('button', {
      name: /in progress/i,
    });
    const doneButtonElement = screen.getByRole('button', { name: /done/i });

    expect(inProgressButtonElement).toBeInTheDocument();
    expect(inProgressButtonElement).not.toBeDisabled();
    expect(inProgressButtonElement).toHaveTextContent('10');

    expect(doneButtonElement).toBeInTheDocument();
    expect(doneButtonElement).toBeDisabled();
    expect(doneButtonElement).toHaveTextContent('10');
  });
});
