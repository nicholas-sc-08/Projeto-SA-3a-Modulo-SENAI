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
  const [coresSelecionadas, setCoresSelecionadas] = useState([]);
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
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const selecionarCorEyeDropper = async () => {
    if (window.EyeDropper) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (coresSelecionadas.length < 3) {
          setCoresSelecionadas([...coresSelecionadas, result.sRGBHex]); // Adiciona nova cor se houver espaço
        } else {
          alert("Você já selecionou o número máximo de cores (3).");
        }
      } catch (error) {
        console.error("Erro ao selecionar cor", error);
      }
    } else {
      alert("Seu navegador não suporta a EyeDropper API");
    }
  };

  const substituirCor = (index) => {
    // Substitui a cor na posição clicada
    selecionarCorEyeDropper().then(() => {
      const newCores = [...coresSelecionadas];
      newCores[index] = newCores[index]; // Mantém o valor da cor
      setCoresSelecionadas(newCores);
    });
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
              className="inpt-edit-preco"
            />
          ) : (
            <span className="preco-produto" onClick={() => setEditandoPreco(true)}>R$ {preco || " Preço"}</span>
          )}

          <div className="input-group-descricao">
            <label>Descrição</label>
            <textarea 
              placeholder="Descrição do produto"
              value={descricao}
              onChange={handleDescricaoChange}
            ></textarea>
            <hr />
          </div>

          <div className="input-group-descricao">
            <label>Seleção de Cores</label>
            <div className="cores">
              <button className="cor-seletor" onClick={selecionarCorEyeDropper}>
                <img className="rodaDeCores" src="./img/roda-de-cores.svg" alt="Selecionar Cor" />
              </button>
              <div className="cores-selecionadas">
                {coresSelecionadas.map((cor, index) => (
                  <div
                    key={index}
                    className="cor-selecionada"
                    style={{ backgroundColor: cor }}
                    onClick={() => substituirCor(index)} // Permite clicar para trocar a cor
                  ></div>
                ))}
              </div>
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
