import React, { useEffect, useState, useContext } from "react";
import "./Cadastro_Produto.css";
import Header from "../../components/Header";
import { GlobalContext } from "../../contexts/GlobalContext";
import api from "../../services/api";

function Cadastro_Produto() {
  const { array_estoques, set_array_estoques } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);

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

  useEffect(() => {
    buscar_produtos();
    buscar_categorias();

    if (informacoes_editar_produto != null && informacoes_editar_produto.nome !== "") {
      setArray_cadastro_produto({
        nome: informacoes_editar_produto.nome || "",
        descricao: informacoes_editar_produto.descricao || "",
        preco: informacoes_editar_produto.preco || "",
        condicao: informacoes_editar_produto.condicao || "",
        cor: informacoes_editar_produto.cor || [],
        imagem: informacoes_editar_produto.imagem || [],
        marca: informacoes_editar_produto.marca || "",
        composicao: informacoes_editar_produto.composicao || "",
        fk_id_categoria: informacoes_editar_produto.fk_id_categoria || "",
        tamanho: informacoes_editar_produto.tamanho || "",
        quantidade: informacoes_editar_produto.quantidade || 1,
      });
      setQuantidade(informacoes_editar_produto.quantidade || 1);
      setTamanhoSelecionado(informacoes_editar_produto.tamanho || "");
      setImagens(informacoes_editar_produto.imagem || []);
      setImagemPrincipal(informacoes_editar_produto.imagem?.[0] || null);
      setCoresSelecionadas(informacoes_editar_produto.cor || []);
    }
  }, []);

  const aumentarQuantidade = () =>
    setQuantidade((q) => {
      const novaQuantidade = q + 1;
      setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: novaQuantidade });
      return novaQuantidade;
    });

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade((q) => {
        const novaQuantidade = q - 1;
        setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: novaQuantidade });
        return novaQuantidade;
      });
    }
  };

  const selecionarTamanho = (t) => {
    setTamanhoSelecionado(t);
    setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: t });
  };

  const adicionarImagem = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("imagem", file);
      try {
        const response = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imageUrl = response.data.url;
        const novasImagens = [...imagens, imageUrl];
        setImagens(novasImagens);
        setArray_cadastro_produto({ ...array_cadastro_produto, imagem: novasImagens });
        if (!imagemPrincipal) setImagemPrincipal(imageUrl);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem", error);
        alert("Erro ao enviar a imagem");
      }
    }
  };

  const removerImagem = (index) => {
    const novasImagens = imagens.filter((_, i) => i !== index);
    setImagens(novasImagens);
    setArray_cadastro_produto({ ...array_cadastro_produto, imagem: novasImagens });
    if (imagemPrincipal === imagens[index]) {
      setImagemPrincipal(novasImagens[0] || null);
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
          alert("Você já selecionou o número máximo de cores (3).")
        }
      } catch (error) {
        console.error("Erro ao selecionar cor", error);
      }
    } else {
      alert("Seu navegador não suporta a EyeDropper API");
    }
  };

  const substituirCor = async (index) => {
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      const novasCores = [...coresSelecionadas];
      novasCores[index] = result.sRGBHex;
      setCoresSelecionadas(novasCores);
      setArray_cadastro_produto({ ...array_cadastro_produto, cor: novasCores });
    } catch (error) {
      console.error("Erro ao substituir cor", error);
    }
  };

  const removerCor = () => {
    setCoresSelecionadas([]);
    setArray_cadastro_produto({ ...array_cadastro_produto, cor: [] });
  };

  async function buscar_categorias() {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  }

  async function buscar_produtos() {
    try {
      const res = await api.get("/produtos");
      set_array_produtos(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  }

  async function cadastrar_produto() {
    try {
      await api.post("/produtos", array_cadastro_produto);
      buscar_produtos();
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
      alert("Erro ao cadastrar produto");
    }
  }

  const nomeExibido = array_cadastro_produto.nome?.trim() || "Nome do Produto";

  return (
    <div>
      <Header tipo='brecho' />
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
          className="input"
          value={array_cadastro_produto.fk_id_categoria}
          onChange={(e) =>
          setArray_cadastro_produto({
          ...array_cadastro_produto,
          fk_id_categoria: e.target.value,
          })
        }
          >
        <option value="">Selecione uma categoria</option>
        {Array.isArray(categorias) &&
        categorias.map((categoria) => (
        <option key={categoria._id} value={categoria._id}>
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

