import { render, screen, userEventSetup } from 'test-utils';

import Login from './Login.page';

describe('Login Page Component', () => {
  test('render correctly', () => {
    render(<Login />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const dontHaveAccountElement = screen.getByText(/don't have an account?/i);

    expect(headingElement).toBeInTheDocument();
    expect(dontHaveAccountElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  test('login correctly', async () => {
    const { user } = userEventSetup(<Login />);

    const emailInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const loginButtonElement = screen.getByRole('button', {
      name: /sign in/i,
    });

    await user.type(emailInputElement, 'testing@gmail.com');
    await user.type(passwordInputElement, 'Testing123');

    await user.click(loginButtonElement);

    const toastText = await screen.findByText(/login successfully/i);

    expect(toastText).toBeInTheDocument();
  });
});
