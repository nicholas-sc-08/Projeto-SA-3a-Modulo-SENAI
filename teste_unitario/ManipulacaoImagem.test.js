// Importa a função removerImagem do módulo ManipulacaoImagem.js
const { removerImagem } = require('./ManipulacaoImagem');

// Define o escopo do teste para a função removerImagem
describe('Função removerImagem', () => {

  // Teste 1: Verifica se a imagem no índice correto é removida
  test('remove a imagem no índice correto', () => {
    // Array de imagens de entrada
    const imagens = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

    // Chama a função passando o array e o índice da imagem a ser removida
    const resultado = removerImagem({ imagens, index: 1 });

    // Espera que a nova lista de imagens exclua a imagem no índice 1
    expect(resultado.novasImagens).toEqual(['img1.jpg', 'img3.jpg']);

    // Espera que a imagem principal continue sendo a primeira da lista
    expect(resultado.novaImagemPrincipal).toBe('img1.jpg');
  });

  // Teste 2: Verifica se a imagem principal é atualizada corretamente quando ela é removida
  test('atualiza imagem principal se a removida for a principal', () => {
    const imagens = ['imgPrincipal.jpg', 'outra.jpg'];

    // Remove a imagem no índice 0, que é a principal
    const resultado = removerImagem({ imagens, index: 0 });

    // Espera que a nova lista tenha apenas a imagem restante
    expect(resultado.novasImagens).toEqual(['outra.jpg']);

    // Espera que a nova imagem principal seja a próxima da lista (index 0 agora)
    expect(resultado.novaImagemPrincipal).toBe('outra.jpg');
  });

  // Teste 3: Verifica o comportamento quando a única imagem é removida
  test('retorna null como imagem principal se nenhuma imagem restar', () => {
    const imagens = ['única.jpg'];

    // Remove a única imagem do array
    const resultado = removerImagem({ imagens, index: 0 });

    // Espera que o array resultante esteja vazio
    expect(resultado.novasImagens).toEqual([]);

    // Espera que a imagem principal seja nula (nenhuma disponível)
    expect(resultado.novaImagemPrincipal).toBeNull();
  });

  // Teste 4: Garante que o array original não seja alterado (imutabilidade)
  test('não altera o array original', () => {
    const imagens = ['a.jpg', 'b.jpg'];

    // Chama a função (mas ignora o retorno aqui, só importa o efeito colateral)
    removerImagem({ imagens, index: 1 });

    // Verifica que o array original permanece igual (sem modificações diretas)
    expect(imagens).toEqual(['a.jpg', 'b.jpg']);
  });
});
