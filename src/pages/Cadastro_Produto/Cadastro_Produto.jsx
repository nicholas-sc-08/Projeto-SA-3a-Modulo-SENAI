import React, { useState } from "react";
import "./Cadastro_Produto.css";

function Cadastro_Produto() {
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("G");
  const [imagens, setImagens] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);

  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => quantidade > 1 && setQuantidade(quantidade - 1);

  const selecionarTamanho = (tamanho) => setTamanhoSelecionado(tamanho);

  const adicionarImagem = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (!imagemPrincipal) {
        setImagemPrincipal(imageUrl);
      } else if (imagens.length < 3) {
        setImagens([...imagens, imageUrl]);
      }
    }
  };

  const selecionarImagemPrincipal = (imagem) => setImagemPrincipal(imagem);

  return (
    <div className="container-cadastro-produto">
      <div className="galeria">
        {imagens.map((imagem, index) => (
          <div key={index} className="miniatura" onClick={() => selecionarImagemPrincipal(imagem)}>
            <img src={imagem} alt={`Imagem ${index}`} />
          </div>
        ))}
        {imagens.length < 3 && (
          <label className="miniatura">
            <input type="file" onChange={adicionarImagem} hidden />
            <img src="./img/ImagemAdd.svg" alt="Adicionar" />
          </label>
        )}
      </div>

      <div className="imagem-principal">
        {imagemPrincipal ? (
          <img src={imagemPrincipal} alt="Imagem Principal" />
        ) : (
          <label className="botao-adicionar-imagem">
            <input type="file" onChange={adicionarImagem} hidden />
            <img src="./img/ImagemAdd.svg" alt="Adicionar Imagem" />
          </label>
        )}
      </div>

      <div className="detalhes-produto">
        <h2 className="nome-produto">Nome do produto</h2>
        <p className="avaliacao">4.5/5 ⭐⭐⭐⭐⭐</p>
        <h3 className="preco">Preço</h3>
        <p className="descricao">DESCRIÇÃO</p>

        <p>Seleção de Cores</p>
        <div className="cores">
          <div className="cor cor-vermelha"></div>
          <div className="cor cor-azul"></div>
          <div className="cor cor-verde"></div>
        </div>

        <p>Escolha o Tamanho</p>
        <div className="tamanhos">
          {["PP", "P", "M", "G", "GG"].map((tamanho) => (
            <button
              key={tamanho}
              className={`tamanho ${tamanhoSelecionado === tamanho ? "selecionado" : ""}`}
              onClick={() => selecionarTamanho(tamanho)}
            >
              {tamanho}
            </button>
          ))}
        </div>

        <div className="quantidade">
          <button className="botao-quantidade" onClick={diminuirQuantidade}>-</button>
          <span>{quantidade}</span>
          <button className="botao-quantidade" onClick={aumentarQuantidade}>+</button>
        </div>
      </div>

      <div className="formulario">
        <h3>Detalhes do Produto</h3>
        <div className="input-group">
          <label>Marca do produto</label>
          <input type="text" placeholder="Buscar marcas" />
        </div>
        <div className="input-group">
          <label>Estado do produto</label>
          <input type="text" placeholder="Ex: Manchas, Tecido velho, etc" />
        </div>
        <div className="input-group">
          <label>Descrição</label>
          <textarea placeholder=""></textarea>
        </div>
        <div className="input-group">
          <label>Categoria</label>
          <input type="text" placeholder="Categoria" />
        </div>
        <div className="input-group">
          <label>Materiais e composição</label>
          <input type="text" placeholder="" />
        </div>

        <button className="botao-cadastrar">Cadastrar Produto</button>
      </div>
    </div>
  );
}

export default Cadastro_Produto;
