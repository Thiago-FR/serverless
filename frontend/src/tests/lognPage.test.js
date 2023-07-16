import { act, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import LoginPage from '../pages/LoginPage'

describe('Test render LoginPage', () => {
  it('Render LoginPage Component', () => {
    renderWithRouter(
        <LoginPage />
    )
    const btn = screen.getByRole('button', { name: 'ENTRAR'});
    expect(btn).toBeInTheDocument();
  });

  it('Login LoginPage', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue("Error"),
    });

    const { user } = renderWithRouter(
        <LoginPage />
    )

    const inputEmailError = screen.getByTestId('input-email');
    expect(inputEmailError).toBeInTheDocument();
    expect(inputEmailError).not.toHaveClass('is-invalid');

    const btn = screen.getByRole('button', { name: 'ENTRAR'});
    
    await act(async () => {
        expect(btn).toBeInTheDocument();

        await user.click(btn);
    })
    
    expect(inputEmailError).toHaveClass('is-invalid')
  });
});