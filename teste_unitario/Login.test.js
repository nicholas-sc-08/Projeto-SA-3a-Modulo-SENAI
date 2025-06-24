import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { GlobalContext } from '../../contexts/GlobalContext';
import { MemoryRouter } from 'react-router-dom';

describe('Componente Login', () => {
  const mockNavigate = jest.fn();

  const contextMock = {
    array_clientes: [
      { email: 'joao@gmail.com', senha: '123', sacola: [] }
    ],
    array_brechos: [],
    set_array_clientes: jest.fn(),
    set_array_brechos: jest.fn(),
    set_usuario_logado: jest.fn(),
    set_erro_pagina: jest.fn(),
    sacola: [],
    set_sacola: jest.fn(),
    usuario_logado: null,
    erro_pagina: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve mostrar erro se os campos estiverem vazios', async () => {
    render(
      <GlobalContext.Provider value={contextMock}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    const botaoLogin = screen.getByRole('button', { name: /fazer login/i });
    fireEvent.click(botaoLogin);

    const mensagemErro = await screen.findByText('Favor preencher todos os campos!');
    expect(mensagemErro).toBeInTheDocument();
  });

  it('deve mostrar erro se o email for inválido', async () => {
    render(
      <GlobalContext.Provider value={contextMock}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/ex: exemplo@gmail.com/i), {
      target: { value: 'joaogmail.com' }
    });

    fireEvent.change(screen.getByPlaceholderText(/senha pessoal/i), {
      target: { value: '123' }
    });

    const botaoLogin = screen.getByRole('button', { name: /fazer login/i });
    fireEvent.click(botaoLogin);

    const mensagemErro = await screen.findByText('O email deve conter "@"');
    expect(mensagemErro).toBeInTheDocument();
  });

  it('deve logar se os dados estiverem corretos', async () => {
    const mockSetUsuarioLogado = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <GlobalContext.Provider value={{ ...contextMock, set_usuario_logado: mockSetUsuarioLogado }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/ex: exemplo@gmail.com/i), {
      target: { value: 'joao@gmail.com' }
    });

    fireEvent.change(screen.getByPlaceholderText(/senha pessoal/i), {
      target: { value: '123' }
    });

    const botaoLogin = screen.getByRole('button', { name: /fazer login/i });
    fireEvent.click(botaoLogin);

    await waitFor(() => {
      expect(mockSetUsuarioLogado).toHaveBeenCalledWith(expect.objectContaining({
        email: 'joao@gmail.com'
      }));
    });
  });
});
