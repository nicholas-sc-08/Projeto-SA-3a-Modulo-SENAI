// Importações de bibliotecas e componentes necessários para o funcionamento da página
import React, { useEffect, useState, useContext } from "react";
import "./Cadastro_Produto.css";
import Header from "../../components/Header/Header";
import { GlobalContext } from "../../contexts/GlobalContext";
import api from "../../services/api";
import "../Produto/Produto.css";
import { useNavigate } from "react-router-dom";
import Footer from '../../components/Footer/Footer';
import Pop_up_cadastro_produto from "../../components/Pop_up_cadastro_produto/Pop_up_cadastro_produto";
import Pop_up_erro_cadastro_produto from "../../components/Pop_up_cadastro_produto/Pop_up_erro_cadastro_produto";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function Cadastro_Produto() {
  // Estados globais via Context API
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { array_estoques, set_array_estoques } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);
  const [pop_up_notificacao_cadastro_produto, set_pop_up_notificacao_cadastro_produto] = useState(false);
  const navigate = useNavigate();

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
  const [pop_up_erro_cadastro, set_pop_up_erro_cadastro] = useState(false);
  const [marcaEmFoco, setMarcaEmFoco] = useState(false);
  const [tecidoEmFoco, setTecidoEmFoco] = useState(false);
  const [categoriaEmFoco, setCategoriaEmFoco] = useState(false);




  // Objeto com os dados principais do produto a ser cadastrado
  const [array_cadastro_produto, setArray_cadastro_produto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    condicao: "",
    cor: [],
    imagem: [],
    fk_id_marca: "",
    composicao: "",
    fk_id_categoria: "",
    tamanho: "",
    quantidade: 1,
    fk_id_brecho: usuario_logado?._id || "", // Prevê erro se usuário não estiver carregado
  });

  const [inputTecido, setInputTecido] = useState("");
  const [tecidosFiltrados, setTecidosFiltrados] = useState(tecidos_disponiveis);

  useEffect(() => {

    if (pop_up_notificacao_cadastro_produto) {

      setTimeout(() => {

        set_pop_up_notificacao_cadastro_produto(false);

      }, 2000);
    }

  }, [pop_up_notificacao_cadastro_produto]);

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
        fk_id_marca: informacoes_editar_produto.fk_id_marca,
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
      setInputMarca(informacoes_editar_produto.marca || "");
      setInputTecido(informacoes_editar_produto.composicao || "");

    }
  }, []);


  useEffect(() => {
    if (informacoes_editar_produto) {
      const marcaSelecionada = listaMarcas.find(m => m._id === informacoes_editar_produto.fk_id_marca);
      setInputMarca(marcaSelecionada?.nome || ""); // Mostra o nome no input
      setArray_cadastro_produto(prev => ({
        ...prev,
        fk_id_marca: informacoes_editar_produto.fk_id_marca // Salva o ID
      }));
    }
  }, [informacoes_editar_produto, listaMarcas]);


  useEffect(() => {
    if (informacoes_editar_produto) {
      const categoriaSelecionada = categorias.find(c => c._id === informacoes_editar_produto.fk_id_categoria);
      setInputCategoria(categoriaSelecionada?.nome || "");
      setArray_cadastro_produto(prev => ({
        ...prev,
        fk_id_categoria: informacoes_editar_produto.fk_id_categoria
      }));
    }
  }, [informacoes_editar_produto, categorias]);



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
  }

  useEffect(() => {
    const resultado = listaMarcas.filter((fk_id_marca) =>
      fk_id_marca.nome.toLowerCase().includes(inputMarca.toLowerCase())
    );
    setMarcasFiltradas(resultado);
  }, [inputMarca, listaMarcas]);

  useEffect(() => {
    if (pop_up_erro_cadastro) {
      const timer = setTimeout(() => {
        set_pop_up_erro_cadastro(false);
      }, 1500);

      return () => clearTimeout(timer); // Limpeza do timer
    }
  }, [pop_up_erro_cadastro]);

  useEffect(() => {
    if (pop_up_notificacao_cadastro_produto) {
      const timer = setTimeout(() => {
        set_pop_up_notificacao_cadastro_produto(false);
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [pop_up_notificacao_cadastro_produto, set_pop_up_notificacao_cadastro_produto]);


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
    setImagens((prev) => [...prev, urlLocal]);
    if (!imagemPrincipal) setImagemPrincipal(urlLocal);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho"); // esse nome deve bater com o preset criado no Cloudinary

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/fly-cloud-name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ Imagem enviada para Cloudinary:", data);

      if (data.secure_url) {
        const novaLista = [...array_cadastro_produto.imagem, data.secure_url];
        setImagens(novaLista);
        setArray_cadastro_produto((prev) => ({
          ...prev,
          imagem: novaLista,
        }));

        if (imagemPrincipal === urlLocal || !imagemPrincipal) {
          setImagemPrincipal(data.secure_url);
        }

        URL.revokeObjectURL(urlLocal);
      } else {
        alert("Erro ao subir imagem: URL não retornada.");
      }
    } catch (error) {
      console.error(" Erro ao fazer upload da imagem:", error);
      alert("Erro ao enviar imagem. Verifique o console.");
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


  // Função para editar o produto existente
  async function editar_produto() {
    try {
      await api.put(`/produtos/${informacoes_editar_produto._id}`, array_cadastro_produto);
      buscar_produtos(); // Atualiza a listagem
      navigate("/gestao_estoque");

      // Limpa o estado de edição
      set_informacoes_editar_produto(null);

      // Reset visual opcional
      setArray_cadastro_produto({
        nome: "",
        descricao: "",
        preco: "",
        condicao: "",
        cor: [],
        imagem: [],
        fk_id_marca: "",
        composicao: "",
        fk_id_categoria: "",
        tamanho: "",
        quantidade: 1,
        fk_id_brecho: usuario_logado?._id || "",
      });
      setQuantidade(1);
      setTamanhoSelecionado("");
      setImagens([]);
      setImagemPrincipal(null);
      setCoresSelecionadas([]);
      setInputTecido("");
      setInputCategoria("");
      setInputMarca("");

    } catch (error) {
      console.error("Erro ao editar produto", error);
      alert("Erro ao atualizar produto");
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


  async function cadastrar_produto() {
    try {
      const produtoParaEnviar = {
        ...array_cadastro_produto,
        preco: Number(array_cadastro_produto.preco),
        quantidade: Number(array_cadastro_produto.quantidade),
        cor: array_cadastro_produto.cor || [],
        imagem: array_cadastro_produto.imagem || [],
      };

      console.log("Dados a enviar:", produtoParaEnviar);

      await api.post("/produtos", produtoParaEnviar);
      buscar_produtos();
      set_pop_up_notificacao_cadastro_produto(true);
      setTimeout(() => navigate("/gestao_estoque"), 2000);

    } catch (error) {
      console.error("Erro ao cadastrar produto", error.response?.data || error.message || error);
      set_pop_up_erro_cadastro(true);
    }
  }

  // Nome exibido do produto (fallback caso não digitado)
  const nomeExibido = array_cadastro_produto.nome?.trim() || "Nome do Produto";
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}>
        {pop_up_notificacao_cadastro_produto && <Pop_up_cadastro_produto />}
        <Header tipo={tipo_de_header} />
        <div className="cabecalho-titulo">


          <button className="botao-seta-voltar" onClick={() => navigate(-1)}>
            <img src="/img/seta-esquerda.png" alt="Voltar" />
          </button>
          <h2 className="titulo">Cadastro Produto</h2>
        </div>
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
                    setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: e.target.value.toUpperCase() });
                  }}
                />
              </div>


              <div className="quantidade-container">
                <div className="quantidade-titulo">Quantidade</div>
                <div className="quantidade">
                  <button className="botao-quantidade" onClick={diminuirQuantidade}>
                    <img src="./img/icons/seta-esquerda.png" alt="Diminuir" className="icone-quantidade" />
                  </button>

                  <div className="quantidade-numero">{quantidade}</div>

                  <button className="botao-quantidade" onClick={aumentarQuantidade}>
                    <img src="./img/icons/seta-direita.png" alt="Aumentar" className="icone-quantidade" />
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
                    setArray_cadastro_produto({ ...array_cadastro_produto, composicao: e.target.value });
                  }}
                  onFocus={() => setTecidoEmFoco(true)}
                  onBlur={() => setTimeout(() => setTecidoEmFoco(false), 200)}
                  placeholder="Digite o tecido"
                  autoComplete="off"
                />

                {tecidoEmFoco && tecidosFiltrados.length > 0 && (
                  <ul className="lista-tecidos">
                    {tecidosFiltrados.map((tecido, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setInputTecido(tecido);
                          setArray_cadastro_produto({ ...array_cadastro_produto, composicao: tecido });
                          setTecidoEmFoco(false);
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
                  className="input-group-marcas"
                  value={inputMarca}
                  onChange={(e) => {
                    setInputMarca(e.target.value);
                    setArray_cadastro_produto({ ...array_cadastro_produto, fk_id_marca: "" });
                  }}
                  onFocus={() => setMarcaEmFoco(true)}
                  onBlur={() => setTimeout(() => setMarcaEmFoco(false), 200)}
                  autoComplete="off"
                />
                {marcaEmFoco && marcasFiltradas.length > 0 && (
                  <ul className="lista-marcas">
                    {marcasFiltradas.map((marca, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setInputMarca(marca.nome); // Exibe o nome no input
                          setArray_cadastro_produto(prev => ({
                            ...prev,
                            fk_id_marca: marca._id,  // Salva o ID da marca no objeto do produto
                          }));
                          setMarcaEmFoco(false);
                        }}
                      >
                        {marca.nome}
                      </li>
                    ))}
                  </ul>
                )}

              </div>


              <label>Estado do produto</label>
              <select
                required
                value={array_cadastro_produto.condicao}
                onChange={(e) =>
                  setArray_cadastro_produto({ ...array_cadastro_produto, condicao: e.target.value })
                }
                className="input-group-estado"
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
                  setArray_cadastro_produto({ ...array_cadastro_produto, fk_id_categoria: "" });
                }}
                onFocus={() => setCategoriaEmFoco(true)}
                onBlur={() => setTimeout(() => setCategoriaEmFoco(false), 200)}
                autoComplete="off"
              />

              {categoriaEmFoco && categoriasFiltradas.length > 0 && (
                <ul className="lista-categorias">
                  {categoriasFiltradas.map((cat) => (
                    <li
                      key={cat._id}
                      onClick={() => {
                        setInputCategoria(cat.nome); // Exibe o nome no input
                        setArray_cadastro_produto(prev => ({
                          ...prev,
                          fk_id_categoria: cat._id, // Salva o ID da categoria no objeto do produto
                        }));
                        setCategoriaEmFoco(false);
                      }}
                    >
                      {cat.nome}
                    </li>
                  ))}
                </ul>
              )}


            </div>


            <button

              onClick={informacoes_editar_produto ? editar_produto : cadastrar_produto}
              className="botao-cadastrar"
              style={informacoes_editar_produto ? { backgroundColor: "var(--cor_um)" } : {}} >
              {informacoes_editar_produto ? "Salvar Alterações" : "Cadastrar Produto"}
            </button>

          </div>
        </div>


        <Footer />
        {pop_up_notificacao_cadastro_produto && <Pop_up_cadastro_produto />}
        {pop_up_erro_cadastro && <Pop_up_erro_cadastro_produto />}


      </motion.div>
    </AnimatePresence>
  );
}

export default Cadastro_Produto;
