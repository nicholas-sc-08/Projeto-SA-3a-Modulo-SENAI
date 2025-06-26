import React from 'react';
import { render, screen } from '@testing-library/react';
import Sacola_geral from '../src/pages/Sacola/Sacola_geral.jsx';
import { GlobalContext } from '../src/contexts/GlobalContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../src/components/chat/Chat', () => () => <div>Mocked Chat</div>);
jest.mock('../src/components/chat/Chat_conversa', () => () => <div>Mocked Chat Conversa</div>);
jest.mock('../src/components/Pop_up_excluir_produto_sacola/Pop_up_excluir_produto_sacola', () => () => <div>Mocked Pop Up</div>);
jest.mock('../src/components/Header/Header', () => () => <header>Mocked Header</header>);
jest.mock('../src/components/Footer/Footer', () => () => <footer>Mocked Footer</footer>);

const renderComContexto = (sacolaMock) => {
  const mockContext = {
    tipo_de_header: 'padrao',
    set_tipo_de_header: jest.fn(),
    usuario_logado: { _id: '123', sacola: sacolaMock },
    set_usuario_logado: jest.fn(),
    sacola: sacolaMock,
    set_sacola: jest.fn(),
    conversa_aberta: false,
    set_conversa_aberta: jest.fn(),
    produto: {},
    set_produto: jest.fn(),
    sacola_aberta: false,
    set_sacola_aberta: jest.fn(),
  };

  return render(
    <GlobalContext.Provider value={mockContext}>
      <BrowserRouter>
        <Sacola_geral />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe('Sacola_geral - preço total', () => {
  it('deve exibir o preço total correto quando há produtos na sacola', () => {
    const produtosMock = [
      {
        _id: '1',
        nome: 'Produto 1',
        imagem: ['https://via.placeholder.com/150'],
        preco: 50,
        quantidade_selecionada: 2,
        quantidade: 5,
        tamanho: 'M',
        cor: ['Preto'],
      },
      {
        _id: '2',
        nome: 'Produto 2',
        imagem: ['https://via.placeholder.com/150'],
        preco: 25,
        quantidade_selecionada: 3,
        quantidade: 5,
        tamanho: 'G',
        cor: ['Branco'],
      },
    ];

    renderComContexto(produtosMock);

    const subtotal = screen.getByText('Subtotal').parentElement;
    expect(subtotal).toHaveTextContent('R$175,00');
    
    const total = screen.getByText('Total').parentElement;
    expect(total).toHaveTextContent('R$175,00');
  });

  it('deve exibir mensagem de sacola vazia quando não há produtos', () => {
    renderComContexto([]);

    expect(screen.getByText(/ainda não adicionou um item/i)).toBeInTheDocument();

    const subtotal = screen.getByText('Subtotal').parentElement;
    expect(subtotal).toHaveTextContent('R$0,00');

    const total = screen.getByText('Total').parentElement;
    expect(total).toHaveTextContent('R$0,00');
  });
});

// Preço total esperado = 50*2 + 25*3 = 100 + 75 = 175