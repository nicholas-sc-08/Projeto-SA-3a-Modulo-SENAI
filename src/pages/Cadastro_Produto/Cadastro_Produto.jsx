import React, { useEffect, useState, useContext } from "react";
import "./Cadastro_Produto.css";
import HeaderBrecho from "../../components/HeaderBrecho";
import axios from "axios";
import { GlobalContext } from "../../contexts/GlobalContext";

function Cadastro_Produto() {
  const { array_estoques, set_array_estoques } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [imagens, setImagens] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [coresSelecionadas, setCoresSelecionadas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoPreco, setEditandoPreco] = useState(false);

  const [array_cadastro_produto, setArray_cadastro_produto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    condicao: "",
    cor: [],
    imagem: [],
    marca: "",
    composicao: "",
    fk_id_categoria: "",
    tamanho: "",
    quantidade: 1,
  });

  const aumentarQuantidade = () => setQuantidade((q) => {
    setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: q + 1 });
    return q + 1;
  });

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade((q) => {
        setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: q - 1 });
        return q - 1;
      });
    }
  };

  const selecionarTamanho = (t) => {
    setTamanhoSelecionado(t);
    setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: t });
  };

  const adicionarImagem = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagens([...imagens, imageUrl]);
      if (!imagemPrincipal) setImagemPrincipal(imageUrl);
    }
  };

  const selecionarImagemPrincipal = (imagem) => setImagemPrincipal(imagem);

  const selecionarCorEyeDropper = async () => {
    if (window.EyeDropper) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (coresSelecionadas.length < 3) {
          const novasCores = [...coresSelecionadas, result.sRGBHex];
          setCoresSelecionadas(novasCores);
          setArray_cadastro_produto({ ...array_cadastro_produto, cor: novasCores });
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

  const substituirCor = async (index) => {
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open();
    if (result) {
      const newCores = [...coresSelecionadas];
      newCores[index] = result.sRGBHex;
      setCoresSelecionadas(newCores);
      setArray_cadastro_produto({ ...array_cadastro_produto, cor: newCores });
    }
  };

  const nomeExibido = array_cadastro_produto.nome?.trim() || "Nome do Produto";

  async function buscar_categorias() {
    try {
      const res = await axios.get("http://localhost:3000/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  }

  async function buscar_produtos() {
    try {
      const res = await axios.get("http://localhost:3000/produtos");
      set_array_produtos(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  }

  async function cadastrar_produto() {
    try {
      await axios.post("http://localhost:3000/produtos", array_cadastro_produto);
      buscar_produtos();
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
      alert("Erro ao cadastrar produto");
    }
  }

  useEffect(() => {
    buscar_produtos();
    buscar_categorias();
  }, []);

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
              value={array_cadastro_produto.nome}
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, nome: e.target.value })}
              onBlur={() => setEditandoNome(false)}
              autoFocus
              className="inpt-edit"
            />
          ) : (
            <span className="nome-produto" onClick={() => setEditandoNome(true)}>{nomeExibido}</span>
          )}

          {editandoPreco ? (
            <input
              type="number"
              value={array_cadastro_produto.preco}
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, preco: e.target.value })}
              onBlur={() => setEditandoPreco(false)}
              autoFocus
              className="inpt-edit-preco"
            />
          ) : (
            <span className="preco-produto" onClick={() => setEditandoPreco(true)}>R$ {array_cadastro_produto.preco || "Preço"}</span>
          )}

          <div className="input-group-descricao">
            <label>Descrição</label>
            <textarea
              placeholder="Descrição do produto"
              value={array_cadastro_produto.descricao}
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, descricao: e.target.value })}
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
                    onClick={() => substituirCor(index)}
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
          <hr />

          <div className="quantidade">
            <button className="botao-quantidade" onClick={diminuirQuantidade}><img src="./img/menos.svg" alt="-" /></button>
            <span className="quantidade-numero">{quantidade}</span>
            <button className="botao-quantidade" onClick={aumentarQuantidade}><img src="./img/mais.svg" alt="+" /></button>
          </div>
        </div>
      </div>

      <h2 className="titulo2">Detalhes do Produto</h2>
      <hr className="linha-titulo-2" />

      <div className="container-detalhes-produtos">
        <div className="formulario">
          <div className="input-group">
            <label>Marca do produto</label>
            <input
              type="text"
              placeholder="Buscar marcas"
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, marca: e.target.value })}
              value={array_cadastro_produto.marca}
            />
          </div>

          <div className="input-group">
            <label>Estado do produto</label>
            <select
              value={array_cadastro_produto.condicao}
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, condicao: e.target.value })}
            >
              <option value="">Selecione o estado</option>
              {["Novo", "Semi-Novo", "Usado", "Velho"].map((estado, index) => (
                <option key={index} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Materiais e composição</label>
            <input
              type="text"
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, composicao: e.target.value })}
              value={array_cadastro_produto.composicao}
            />
          </div>
        </div>

        <div className="formulario-direito">
          <div className="input-group-direita">
            <label>Categoria</label>
            <select
              value={array_cadastro_produto.fk_id_categoria}
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, fk_id_categoria: e.target.value })}
              className="categoria-select"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </option>
              ))}
            </select>
            <button onClick={cadastrar_produto} className="botao-cadastrar">Cadastrar Produto</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro_Produto;
