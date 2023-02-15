import { render, screen, userEventSetup } from 'test-utils';

import FormInput from './FormInput';

describe('Form Input Component', () => {
  test('render correctly', () => {
    render(<FormInput />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
  });

  test('render input value correctly', async () => {
    const onChange = jest.fn();

    const { user } = userEventSetup(<FormInput onChange={onChange} />);

    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, 'test-input');

    expect(inputElement).toHaveValue('test-input');
  });
});
