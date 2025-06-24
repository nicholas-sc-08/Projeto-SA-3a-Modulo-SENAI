const { removerImagem } = require('./ManipulacaoImagem');

describe('Função removerImagem', () => {
  test('remove a imagem no índice correto', () => {
    const imagens = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
    const resultado = removerImagem({ imagens, index: 1 });

    expect(resultado.novasImagens).toEqual(['img1.jpg', 'img3.jpg']);
    expect(resultado.novaImagemPrincipal).toBe('img1.jpg');
  });

  test('atualiza imagem principal se a removida for a principal', () => {
    const imagens = ['imgPrincipal.jpg', 'outra.jpg'];
    const resultado = removerImagem({ imagens, index: 0 });

    expect(resultado.novasImagens).toEqual(['outra.jpg']);
    expect(resultado.novaImagemPrincipal).toBe('outra.jpg');
  });

  test('retorna null como imagem principal se nenhuma imagem restar', () => {
    const imagens = ['única.jpg'];
    const resultado = removerImagem({ imagens, index: 0 });

    expect(resultado.novasImagens).toEqual([]);
    expect(resultado.novaImagemPrincipal).toBeNull();
  });

  test('não altera o array original', () => {
    const imagens = ['a.jpg', 'b.jpg'];
    removerImagem({ imagens, index: 1 });
    expect(imagens).toEqual(['a.jpg', 'b.jpg']); // garante que array original não foi modificado
  });
});
