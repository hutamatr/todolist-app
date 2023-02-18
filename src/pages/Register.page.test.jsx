import { render, screen, userEventSetup } from 'test-utils';

import Register from './Register.page';

describe('Register Page Component', () => {
  test('render correctly', () => {
    render(<Register />);

    const signUpHeadingElement = screen.getByRole('heading', { level: 1 });
    const usernameInputElement = screen.getByPlaceholderText('Username');
    const emailInputElement = screen.getByPlaceholderText('Email');
    const passwordInputElement = screen.getByPlaceholderText('Password');
    const confirmPasswordInputElement =
      screen.getByPlaceholderText('Confirm Password');

    expect(signUpHeadingElement).toBeInTheDocument();
    expect(usernameInputElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(confirmPasswordInputElement).toBeInTheDocument();
  });

  test('input register form correctly & register successfully', async () => {
    const { user } = userEventSetup(<Register />);

    const usernameInputElement = screen.getByPlaceholderText('Username');
    const emailInputElement = screen.getByPlaceholderText('Email');
    const passwordInputElement = screen.getByPlaceholderText('Password');
    const confirmPasswordInputElement =
      screen.getByPlaceholderText('Confirm Password');
    const registerButtonElement = screen.getByRole('button', {
      name: /create account/i,
    });

    await user.type(usernameInputElement, 'testing');
    await user.type(emailInputElement, 'testing@gmail.com');
    await user.type(passwordInputElement, 'Testing123');
    await user.type(confirmPasswordInputElement, 'Testing123');

    expect(usernameInputElement).toHaveValue('testing');
    expect(emailInputElement).toHaveValue('testing@gmail.com');
    expect(passwordInputElement).toHaveValue('Testing123');
    expect(confirmPasswordInputElement).toHaveValue('Testing123');

    await user.click(registerButtonElement);

    const toastText = await screen.findByText(/register successfully/i);
    expect(toastText).toBeInTheDocument();
  });
});
