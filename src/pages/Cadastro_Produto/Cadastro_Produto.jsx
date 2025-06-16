// Importações de bibliotecas e componentes
import React, { useEffect, useState, useContext } from "react";
import "./Cadastro_Produto.css";
import Header from "../../components/Header";
import { GlobalContext } from "../../contexts/GlobalContext";
import api from "../../services/api";
import Chat from "../../components/chat/Chat";
import Chat_conversa from "../../components/chat/Chat_conversa";
import "../Produto/Produto.css";


function Cadastro_Produto() {

  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { conversa_aberta, set_converas_aberta } = useContext(GlobalContext);
  const { array_estoques, set_array_estoques } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);

  const tecidos_disponiveis = [
    "Algodão", "Poliéster", "Linho", "Seda", "Jeans", "Sarja", "Couro", "Malha", "Viscose", "Veludo",
    "Moletom", "Crepe", "Tricoline", "La", "Nylon", "Oxford", "Organza", "Chiffon", "Tule", "Elastano",
    "Lycra", "Canvas", "Suede", "Vinil", "Sintético", "Cânhamo", "Mesh", "Denim", "Jacquard", "Renda",
    "PVC", "EVA", "Neoprene"
  ];


  // Estado de quantidade do produto
  const [quantidade, setQuantidade] = useState(1);

  // Estado do tamanho selecionado
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

  // Estado de imagens (urls das imagens do produto)
  const [imagens, setImagens] = useState([]);

  // Estado da imagem principal (a que será exibida em destaque)
  const [imagemPrincipal, setImagemPrincipal] = useState(null);

  // Estado das cores selecionadas com EyeDropper
  const [coresSelecionadas, setCoresSelecionadas] = useState([]);

  // Lista de categorias disponíveis
  const [categorias, setCategorias] = useState([]);

  // Estados para controlar edição inline (nome e preço)
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoPreco, setEditandoPreco] = useState(false);

  // Estado principal que representa os dados do produto a ser cadastrado
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
    fk_id_brecho: usuario_logado._id, // brechó vinculado ao produto
  });

  const [inputTecido, setInputTecido] = useState("");
  const [tecidosFiltrados, setTecidosFiltrados] = useState(tecidos_disponiveis);


  // useEffect que roda quando o componente é carregado
  // Busca produtos e categorias + carrega dados caso esteja editando um produto
  useEffect(() => {
    buscar_produtos();
    buscar_categorias();

    // Se estiver em modo de edição, carrega as informações do produto que será editado
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
        fk_id_brecho: usuario_logado._id,
      });
      setQuantidade(informacoes_editar_produto.quantidade || 1);
      setTamanhoSelecionado(informacoes_editar_produto.tamanho || "");
      setImagens(informacoes_editar_produto.imagem || []);
      setImagemPrincipal(informacoes_editar_produto.imagem?.[0] || null);
      setCoresSelecionadas(informacoes_editar_produto.cor || []);
    }
  }, []);


  useEffect(() => {
    const resultado = tecidos_disponiveis.filter((tecido) =>
      tecido.toLowerCase().includes(inputTecido.toLowerCase())
    );
    setTecidosFiltrados(resultado);
  }, [inputTecido]);


  // Função para aumentar a quantidade
  const aumentarQuantidade = () =>
    setQuantidade((q) => {
      const novaQuantidade = q + 1;
      setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: novaQuantidade });
      return novaQuantidade;
    });

  // Função para diminuir a quantidade (mínimo = 1)
  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade((q) => {
        const novaQuantidade = q - 1;
        setArray_cadastro_produto({ ...array_cadastro_produto, quantidade: novaQuantidade });
        return novaQuantidade;
      });
    }
  };

  // Função que define o tamanho selecionado do produto
  const selecionarTamanho = (t) => {
    setTamanhoSelecionado(t);
    setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: t });
  };

  // Função que adiciona uma imagem (faz upload no Cloudinary)
  const adicionar_imagem = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Cria uma URL temporária para exibir a imagem imediatamente na tela
    const urlLocal = URL.createObjectURL(file);
    const novaListaTemporaria = [...imagens, urlLocal];
    setImagens(novaListaTemporaria);
    setArray_cadastro_produto({ ...array_cadastro_produto, imagem: novaListaTemporaria });
    if (!imagemPrincipal) setImagemPrincipal(urlLocal);

    // Upload no Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/fly-cloud-name/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        // Substitui a URL local temporária pela URL do Cloudinary
        const novaLista = novaListaTemporaria.map((img) => (img === urlLocal ? data.secure_url : img));
        setImagens(novaLista);
        setArray_cadastro_produto({ ...array_cadastro_produto, imagem: novaLista });

        // Atualiza imagem principal, se for o caso
        if (imagemPrincipal === urlLocal) {
          setImagemPrincipal(data.secure_url);
        }

        // Libera a URL temporária
        URL.revokeObjectURL(urlLocal);
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  // useEffect auxiliar para ver no console as alterações no array_cadastro_produto
  useEffect(() => {
    console.log(array_cadastro_produto);
  }, [array_cadastro_produto]);

  // Função que remove uma imagem (também atualiza imagem principal, se necessário)
  const removerImagem = (index) => {
    setImagens((prevImagens) => {
      const novasImagens = prevImagens.filter((_, i) => i !== index);
      setArray_cadastro_produto((prevProduto) => ({
        ...prevProduto,
        imagem: novasImagens,
      }));

      // Se remover a imagem principal, seta uma nova ou limpa
      if (prevImagens[index] === imagemPrincipal) {
        setImagemPrincipal(novasImagens[0] || "");
      }

      return novasImagens;
    });
  };

  // Função que define qual imagem será a imagem principal
  const selecionarImagemPrincipal = (imagem) => {
    if (imagens.includes(imagem)) {
      setImagemPrincipal(imagem);
    }
  };

  // Função para abrir o seletor de cores (EyeDropper API)
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

  // Função para substituir uma cor existente
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

  // Função que remove todas as cores selecionadas
  const removerCor = () => {
    setCoresSelecionadas([]);
    setArray_cadastro_produto({ ...array_cadastro_produto, cor: [] });
  };

  // Função que busca categorias do backend (usada no carregamento inicial)
  async function buscar_categorias() {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  }

  // Função que busca produtos do backend (usada no carregamento inicial e após cadastrar produto)
  async function buscar_produtos() {
    try {
      const res = await api.get("/produtos");
      set_array_produtos(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  }

  // Função que faz o cadastro do produto (chama a API POST /produtos)
  async function cadastrar_produto() {
    try {
      await api.post("/produtos", array_cadastro_produto);
      buscar_produtos(); // Atualiza lista de produtos
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
      alert("Erro ao cadastrar produto");
    }
  }

  // Constante auxiliar para mostrar um texto de fallback no nome do produto
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


        </div>

        <div className="formulario-direito">
          <div className="input-group-direita">
            <label className="input-categoria-label">Categoria</label>
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

            <button onClick={cadastrar_produto} className="botao-cadastrar">
              Cadastrar Produto
            </button>
          </div>
        </div>
      </div>

      {usuario_logado != `` && !conversa_aberta && <Chat />}
      {conversa_aberta && <Chat_conversa />}
    </div>
  );
}

export default Cadastro_Produto;
