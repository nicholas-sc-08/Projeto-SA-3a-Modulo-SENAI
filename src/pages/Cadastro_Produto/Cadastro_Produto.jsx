// Importações de bibliotecas e componentes necessários para o funcionamento da página
import React, { useEffect, useState, useContext } from "react";
import "./Cadastro_Produto.css";
import Header from "../../components/Header";
import { GlobalContext } from "../../contexts/GlobalContext";
import api from "../../services/api";
import Chat from "../../components/chat/Chat";
import Chat_conversa from "../../components/chat/Chat_conversa";
import "../Produto/Produto.css";
import Footer from '../../components/Footer';

function Cadastro_Produto() {
  // Estados globais via Context API
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { array_estoques, set_array_estoques } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);
  

  // Tecidos sugeridos para autocomplete
  const tecidos_disponiveis = ["Algodão", "Poliéster", "Linho", "Seda", "Jeans", "Sarja", "Couro", "Malha", "Viscose", "Veludo", "Moletom", "Crepe", "Tricoline", "La", "Nylon", "Oxford", "Organza", "Chiffon", "Tule", "Elastano", "Lycra", "Canvas", "Suede", "Vinil", "Sintético", "Cânhamo", "Mesh", "Denim", "Jacquard", "Renda", "PVC", "EVA", "Neoprene"];

  // Estados locais do componente
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [imagens, setImagens] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [coresSelecionadas, setCoresSelecionadas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [inputCategoria, setInputCategoria] = useState("");
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoPreco, setEditandoPreco] = useState(false);
  const [listaMarcas, setListaMarcas] = useState([]);
  const [inputMarca, setInputMarca] = useState("");
  const [marcasFiltradas, setMarcasFiltradas] = useState([]);


  // Objeto com os dados principais do produto a ser cadastrado
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
    fk_id_brecho: usuario_logado?._id || "", // Prevê erro se usuário não estiver carregado
  });

  const [inputTecido, setInputTecido] = useState("");
  const [tecidosFiltrados, setTecidosFiltrados] = useState(tecidos_disponiveis);

  // Carrega categorias, produtos e informações do produto (caso esteja editando)
  useEffect(() => {
    buscar_produtos();
    buscar_categorias();
    buscar_marcas();

    if (informacoes_editar_produto?.nome) {
      setArray_cadastro_produto({
        nome: informacoes_editar_produto.nome,
        descricao: informacoes_editar_produto.descricao,
        preco: informacoes_editar_produto.preco,
        condicao: informacoes_editar_produto.condicao,
        cor: informacoes_editar_produto.cor,
        imagem: informacoes_editar_produto.imagem,
        marca: informacoes_editar_produto.marca,
        composicao: informacoes_editar_produto.composicao,
        fk_id_categoria: informacoes_editar_produto.fk_id_categoria,
        tamanho: informacoes_editar_produto.tamanho,
        quantidade: informacoes_editar_produto.quantidade || 1,
        fk_id_brecho: usuario_logado?._id || "",
      });
      setQuantidade(informacoes_editar_produto.quantidade || 1);
      setTamanhoSelecionado(informacoes_editar_produto.tamanho || "");
      setImagens(informacoes_editar_produto.imagem || []);
      setImagemPrincipal(informacoes_editar_produto.imagem?.[0] || null);
      setCoresSelecionadas(informacoes_editar_produto.cor || []);
    }
  }, []);

  // Filtra tecidos conforme digitação do usuário
  useEffect(() => {
    const resultado = tecidos_disponiveis.filter((tecido) =>
      tecido.toLowerCase().includes(inputTecido.toLowerCase())
    );
    setTecidosFiltrados(resultado);
  }, [inputTecido]);

  // Filtra categorias conforme digitação
  useEffect(() => {
    const resultado = categorias.filter((categoria) =>
      categoria.nome.toLowerCase().includes(inputCategoria.toLowerCase())
    );
    setCategoriasFiltradas(resultado);
  }, [inputCategoria, categorias]);

  // Atualiza quantidade do produto
  function aumentarQuantidade() {
    setQuantidade((q) => {
      const novaQuantidade = q + 1;
      setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: novaQuantidade });
      return novaQuantidade;
    });


     useEffect(() => {
  const resultado = listaMarcas.filter((marca) =>
    marca.nome.toLowerCase().includes(inputMarca.toLowerCase())
  );
  setMarcasFiltradas(resultado);
}, [inputMarca, listaMarcas]);


  }

  function diminuirQuantidade() {
    if (quantidade > 1) {
      setQuantidade((q) => {
        const novaQuantidade = q - 1;
        setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: novaQuantidade });
        return novaQuantidade;
      });
    }
  }

  // Define o tamanho do produto selecionado
  function selecionarTamanho(t) {
    setTamanhoSelecionado(t);
    setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: t });
  }

  // Adiciona imagem localmente e faz upload para Cloudinary
  async function adicionar_imagem(e) {
    const file = e.target.files[0];
    if (!file) return;

    const urlLocal = URL.createObjectURL(file);
    const novaListaTemporaria = [...imagens, urlLocal];
    setImagens(novaListaTemporaria);
    setArray_cadastro_produto({ ...array_cadastro_produto, imagem: novaListaTemporaria });
    if (!imagemPrincipal) setImagemPrincipal(urlLocal);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/SEU_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        const novaLista = novaListaTemporaria.map((img) => (img === urlLocal ? data.secure_url : img));
        setImagens(novaLista);
        setArray_cadastro_produto({ ...array_cadastro_produto, imagem: novaLista });

        if (imagemPrincipal === urlLocal) {
          setImagemPrincipal(data.secure_url);
        }

        URL.revokeObjectURL(urlLocal);
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  }

  // Remove imagem selecionada
  function removerImagem(index) {
    setImagens((prevImagens) => {
      const novasImagens = prevImagens.filter((_, i) => i !== index);
      setArray_cadastro_produto((prevProduto) => ({
        ...prevProduto,
        imagem: novasImagens,
      }));

      if (prevImagens[index] === imagemPrincipal) {
        setImagemPrincipal(novasImagens[0] || "");
      }

      return novasImagens;
    });
  }

  // Define imagem principal exibida
  function selecionarImagemPrincipal(imagem) {
    if (imagens.includes(imagem)) {
      setImagemPrincipal(imagem);
    }
  }

  // Seleção de cores usando EyeDropper
  async function selecionarCorEyeDropper() {
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
  }

  // Substitui cor existente usando EyeDropper
  async function substituirCor(index) {
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
  }

  // Limpa todas as cores selecionadas
  function removerCor() {
    setCoresSelecionadas([]);
    setArray_cadastro_produto({ ...array_cadastro_produto, cor: [] });
  }

  // Busca categorias disponíveis na API
  async function buscar_categorias() {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  }

  // Busca produtos existentes para atualizar listagem
  async function buscar_produtos() {
    try {
      const res = await api.get("/produtos");
      set_array_produtos(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  }


  async function buscar_marcas() {
  try {
    const res = await api.get("/marcas");
    setListaMarcas(res.data);
  } catch (error) {
    console.error("Erro ao buscar marcas", error);
  }
}


  // Envia os dados do produto para o backend via POST
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

  // Nome exibido do produto (fallback caso não digitado)
  const nomeExibido = array_cadastro_produto.nome?.trim() || "Nome do Produto";
  return (
    <div>
      <Header tipo="brecho" />
      <h2 className="titulo">Cadastro Produto</h2>
      <div className="container-cadastro-produto">
        <div className="galeria">
          {[0, 1, 2].map((_, index) => {
            const imagem = imagens[index];

            return imagem ? (
              <div key={index} className="miniatura" onClick={() => selecionarImagemPrincipal(imagem)}>
                <img src={imagem} alt={`Imagem ${index}`} />
                <button
                  type="button"
                  className="botao-remover-imagem"
                  onClick={(e) => {
                    e.stopPropagation(); // Para não disparar o onClick do pai que seleciona a imagem principal
                    removerImagem(index);
                  }}
                  aria-label={`Remover imagem ${index + 1}`}
                >
                  &times;
                </button>
              </div>
            ) : (
              <label key={index} className="miniatura">
                <input type="file" onChange={adicionar_imagem} hidden />
                <img className="AddImage" src="./img/ImagemAdd.svg" alt="Adicionar" />
              </label>
            );
          })}
        </div>

        <div className={`imagem-principal ${imagemPrincipal ? "has-image" : ""}`}>
          {imagemPrincipal ? (
            <img src={imagemPrincipal} alt="Imagem Principal" />
          ) : (
            <label className="botao-adicionar-imagem">
              <input type="file" onChange={adicionar_imagem} hidden />
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
            <span className="nome-produto" onClick={() => setEditandoNome(true)}>
              {nomeExibido}
            </span>
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
            <span className="preco-produto" onClick={() => setEditandoPreco(true)}>
              R$ {array_cadastro_produto.preco || "Preço"}
            </span>
          )}

          <div className="input-group-descricao">
            <textarea
              placeholder="Descrição do produto"
              value={array_cadastro_produto.descricao}
              onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, descricao: e.target.value })}
            ></textarea>


          </div>
          <hr />

          <div className="input-group-alinhados">


            <div className="input-tamanho">
              <label>Tamanho</label>
              <input
                type="text"
                className="tamanho"
                placeholder=""
                maxlength="2"
                value={array_cadastro_produto.tamanho}
                onChange={(e) => {
                  setTamanhoSelecionado(e.target.value); // opcional, se ainda quiser manter esse estado
                  setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: e.target.value });
                }}
              />
            </div>


            <div className="quantidade-container">
              <div className="quantidade-titulo">Quantidade</div>
              <div className="quantidade">
                <button className="botao-quantidade" onClick={diminuirQuantidade}>
                  <img src="./public/img/icons/seta-esquerda.png" alt="Diminuir" className="icone-quantidade" />
                </button>

                <div className="quantidade-numero">{quantidade}</div>

                <button className="botao-quantidade" onClick={aumentarQuantidade}>
                  <img src="./public/img/icons/seta-direita.png" alt="Aumentar" className="icone-quantidade" />
                </button>

              </div>

            </div>

            <div className="input-tecido" style={{ position: "relative" }}>
              <label className="titulo-tecido">Tecido</label>
              <input
                type="text"
                className="tecido"
                value={inputTecido}
                onChange={(e) => {
                  setInputTecido(e.target.value);
                  setArray_cadastro_produto({
                    ...array_cadastro_produto,
                    composicao: e.target.value,
                  });
                }}
                placeholder="Digite o tecido"
                autoComplete="off"
              />
              {inputTecido && tecidosFiltrados.length > 0 && (
                <ul className="lista-tecidos">
                  {tecidosFiltrados.map((tecido, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setInputTecido(tecido);
                        setArray_cadastro_produto({
                          ...array_cadastro_produto,
                          composicao: tecido,
                        });
                        setTecidosFiltrados([]);
                      }}
                    >
                      {tecido}
                    </li>
                  ))}
                </ul>
              )}
            </div>


            <div className="cores">
              <label>Seleção de Cores</label>
              <div className="divisao-cores">
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
                      title="Clique para substituir essa cor"
                    ></div>

                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <h2 className="titulo2">Detalhes do Produto</h2>
      <hr className="linha-titulo-2" />

      <div className="container-detalhes-produtos">
        <div className="formulario">


          <div className="input-group">
            <div style={{ position: "relative" }}>
              <label>Marca do produto</label>
              <input
                type="text"
                placeholder="Buscar marcas"
                className="input-group"
                value={inputMarca}
                onChange={(e) => {
                  setInputMarca(e.target.value);
                  setArray_cadastro_produto({
                    ...array_cadastro_produto,
                    marca: e.target.value,
                  });
                }}
                autoComplete="off"
              />
              {inputMarca && marcasFiltradas.length > 0 && (
                <ul className="lista-tecidos">
                  {marcasFiltradas.map((marca, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setInputMarca(marca);
                        setArray_cadastro_produto({
                          ...array_cadastro_produto,
                          marca: marca,
                        });
                        setMarcasFiltradas([]);
                      }}
                    >
                      {marca}
                    </li>
                  ))}
                </ul>
              )}
            </div>

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


        </div>

        <div className="formulario-direito">
          <div style={{ position: "relative" }}>
            <label className="input-categoria-label">Categoria</label>
            <input
              type="text"
              className="input-categoria"
              placeholder="Digite para buscar categoria"
              value={inputCategoria}
              onChange={(e) => {
                setInputCategoria(e.target.value);
                setArray_cadastro_produto({
                  ...array_cadastro_produto,
                  fk_id_categoria: "", // limpa o valor antigo
                });
              }}
              autoComplete="off"
            />
            {inputCategoria && categoriasFiltradas.length > 0 && (
              <ul className="lista-categorias">
                {categoriasFiltradas.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => {
                      setInputCategoria(cat.nome);
                      setArray_cadastro_produto({
                        ...array_cadastro_produto,
                        fk_id_categoria: cat._id,
                      });
                      setCategoriasFiltradas([]);
                    }}
                  >
                    {cat.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>


          <button onClick={cadastrar_produto} className="botao-cadastrar">
            Cadastrar Produto
          </button>
        </div>
      </div>


      <Footer />
    </div>


  );
}

export default Cadastro_Produto;
