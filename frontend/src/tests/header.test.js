import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { authMock } from './mocks/fetchApi.mock';

import Header from '../components/Header'

describe('Test render Header Component', () => {
  it('Render Header Component', () => {
    renderWithRouter(
        <Header nome={authMock.nome} />
    )

    const nameText = screen.getByText(authMock.nome);
    expect(nameText).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: 'SAIR'});
    expect(btn).toBeInTheDocument();
  });
});