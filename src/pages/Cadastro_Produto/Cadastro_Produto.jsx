import React, { useState } from "react";
import "./Cadastro_Produto.css";
import HeaderBrecho from "../../components/HeaderBrecho";

function Cadastro_Produto() {
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("G");
  const [imagens, setImagens] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("Nome do Produto");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("");
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoPreco, setEditandoPreco] = useState(false);

  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => quantidade > 1 && setQuantidade(quantidade - 1);

  const selecionarTamanho = (tamanho) => setTamanhoSelecionado(tamanho);

  const adicionarImagem = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagens([...imagens, imageUrl]);
      if (!imagemPrincipal) setImagemPrincipal(imageUrl);
    }
  };

  const selecionarImagemPrincipal = (imagem) => setImagemPrincipal(imagem);

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
    e.target.style.height = 'auto'; // Reseta a altura
    e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta para a altura do conteúdo
  };

  return (
    <div>
      <HeaderBrecho />
      <h2 className="titulo">Cadastro Produto</h2>
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
              <img className="AddImage" src="./img/ImagemAdd.svg" alt="Adicionar" />
            </label>
          )}
        </div>

        <div className={`imagem-principal ${imagemPrincipal ? "has-image" : ""}`}>
          {imagemPrincipal ? (
            <img src={imagemPrincipal} alt="Imagem Principal" />
          ) : (
            <label className="botao-adicionar-imagem">
              <input type="file" onChange={adicionarImagem} hidden />
              <img src="./img/ImagemAdd.svg" alt="Adicionar Imagem" className="AddImage" />
            </label>
          )}
        </div>

        <div className="detalhes-produto">
          {editandoNome ? (
            <input
              type="text"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              onBlur={() => setEditandoNome(false)}
              autoFocus
              className="inpt-edit"
            />
          ) : (
            <span className="nome-produto" onClick={() => setEditandoNome(true)}>{nomeProduto}</span>
          )}

          <p className="avaliacao">4.5/5 ⭐⭐⭐⭐⭐</p>

          {editandoPreco ? (
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              onBlur={() => setEditandoPreco(false)}
              autoFocus
              className="inpt-edit"
            />
          ) : (
            <span className="preco-produto" onClick={() => setEditandoPreco(true)}>R$ {preco || " Preço"}</span>
          )}

          {/* Adicionando a Descrição e Sessão de Cores dentro de Detalhes */}
          <div className="input-group-descricao">
            <label>DESCRIÇÃO</label>
            <textarea 
              placeholder="Descrição do produto"
              value={descricao}
              onChange={handleDescricaoChange} // Alterado para usar o método que ajusta a altura
            ></textarea>
            <hr />
          </div>
          <div className="input-group">
            <label>Escolha a Cor</label>
            <div className="cores">
              {["#FF5733", "#33FF57", "#3357FF", "#F1C40F"].map((cor) => (
                <button
                  key={cor}
                  style={{ backgroundColor: cor }}
                  className={`cor ${corSelecionada === cor ? "selecionada" : ""}`}
                  onClick={() => setCorSelecionada(cor)}
                />
              ))}
            </div>
            <hr />
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
          <div className="input-group">
            <label>Marca do produto</label>
            <input type="text" placeholder="Buscar marcas" />
          </div>
          <div className="input-group">
            <label>Estado do produto</label>
            <input type="text" placeholder="Ex: Manchas, Tecido velho, etc" />
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
    </div>
  );
}

export default Cadastro_Produto;
  