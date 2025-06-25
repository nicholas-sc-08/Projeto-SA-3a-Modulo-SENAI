/**
 * Remove a imagem no índice indicado e atualiza a imagem principal
 * @param {string[]} imagens Lista de imagens
 * @param {number} index Índice da imagem a remover
 * @returns {{ novasImagens: string[], novaImagemPrincipal: string | null }}
 */
function removerImagem({ imagens, index }) {
  const novasImagens = imagens.filter((_, i) => i !== index);
  const novaImagemPrincipal = novasImagens.length > 0 ? novasImagens[0] : null;

  return {
    novasImagens,
    novaImagemPrincipal,
  };
}

module.exports = { removerImagem };
