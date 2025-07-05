// Importações principais de bibliotecas e arquivos
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import "./Gestao_Estoque.css";
import Header from "../../components/Header/Header.jsx";
import api from "../../services/api.js";
import Chat from "../../components/chat/Chat.jsx";
import Chat_conversa from "../../components/chat/Chat_conversa.jsx";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function Gestao_Estoque() {
  // Importação de dados globais via contexto
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { usuario_logado } = useContext(GlobalContext);
  const { conversa_aberta } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);
  const navigate = useNavigate(); // Navegação entre páginas

  // Estados locais
  const [filtrar_produto_brecho_id, set_filtrar_produto_brecho_id] = useState([]); // Produtos do brechó atual
  const [termoBusca, setTermoBusca] = useState(""); // Input de busca

  // Ao montar o componente, busca os dados iniciais do sistema
  useEffect(() => {
    buscar_produtos();
    buscar_categorias();
    buscar_brechos();
  }, []);

  // Define o tipo do header com base no usuário logado
  useEffect(() => {
    const encontrar_brecho = array_brechos.find(brecho => brecho._id === usuario_logado?._id);
    set_tipo_de_header(encontrar_brecho ? "brecho" : "usuario");
  }, [array_brechos, usuario_logado]);

  // Filtra produtos apenas do brechó logado
  useEffect(() => {
    if (array_produtos.length > 0 && usuario_logado?._id) {
      const produtosDoBrecho = array_produtos.filter(
        (produto) => produto.fk_id_brecho === usuario_logado._id
      );
      set_filtrar_produto_brecho_id(produtosDoBrecho);
    }
  }, [array_produtos, usuario_logado]);

  // Funções para buscar dados do backend
  async function buscar_brechos() {
    try {
      const brechos = await api.get(`/brechos`);
      set_array_brechos(brechos.data);
    } catch (erro) {
      console.error(erro);
    }
  }

  async function buscar_produtos() {
    try {
      const produtos = await api.get("/produtos");
      set_array_produtos(produtos.data);
    } catch (erro) {
      console.error(erro);
    }
  }

  async function buscar_categorias() {
    try {
      const categorias = await api.get("/categorias");
      set_array_categorias(categorias.data);
    } catch (erro) {
      console.error(erro);
    }
  }

  // Exclui um produto e atualiza a lista
  async function excluirProduto(id) {
    try {
      await api.delete(`/produtos/${id}`);
      buscar_produtos();
    } catch (error) {
      console.error(error);
    }
  }

  // Lista de cores padrão utilizadas para identificar cor próxima
  const coresSimplificadas = [
    { nome: "Preto", hex: "#000000" },
    { nome: "Branco", hex: "#FFFFFF" },
    { nome: "Vermelho", hex: "#FF0000" },
    { nome: "Verde", hex: "#008000" },
    { nome: "Azul", hex: "#0000FF" },
    { nome: "Amarelo", hex: "#FFFF00" },
    { nome: "Laranja", hex: "#FFA500" },
    { nome: "Roxo", hex: "#800080" },
    { nome: "Marrom", hex: "#8B4513" },
    { nome: "Cinza", hex: "#808080" },
    { nome: "Rosa", hex: "#FFC0CB" },
    { nome: "Ciano", hex: "#00FFFF" },
    { nome: "Magenta", hex: "#FF00FF" },
    { nome: "Vinho", hex: "#800000" },
    { nome: "Dourado", hex: "#FFD700" },
    { nome: "Prateado", hex: "#C0C0C0" },
    { nome: "Bege", hex: "#F5F5DC" },
    { nome: "Turquesa", hex: "#40E0D0" },
    { nome: "Lima", hex: "#00FF00" },
    { nome: "Lavanda", hex: "#E6E6FA" },
  ];

  // Converte hexadecimal para RGB
  function hexParaRGB(hex) {
    if (typeof hex !== "string") return null;
    if (!hex.startsWith("#")) hex = "#" + hex;
    const match = hex.match(/^#([0-9a-fA-F]{6})$/);
    if (!match) return null;
    const bigint = parseInt(match[1], 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  // Calcula qual cor está mais próxima no espaço RGB usando distância euclidiana
  function corMaisProxima(hex) {
    const rgb = hexParaRGB(hex);
    if (!rgb) return "Cor desconhecida";

    let corMaisPerto = null;
    let menorDistancia = Infinity;

    coresSimplificadas.forEach((cor) => {
      const corRGB = hexParaRGB(cor.hex);
      const distancia = Math.sqrt(
        Math.pow(rgb.r - corRGB.r, 2) +
        Math.pow(rgb.g - corRGB.g, 2) +
        Math.pow(rgb.b - corRGB.b, 2)
      );

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        corMaisPerto = cor.nome;
      }
    });

    return corMaisPerto || "Cor desconhecida";
  }

  // Traduz cor (nome ou hex) para nome mais próximo
  function nomeDaCorSimplificada(corProduto) {
    if (!corProduto) return "Cor desconhecida";
    if (Array.isArray(corProduto)) {
      return corProduto.map((cor) => nomeDaCorSimplificada(cor)).join(", ");
    }
    if (typeof corProduto === "string") {
      const corPorNome = coresSimplificadas.find(
        (c) => c.nome.toLowerCase() === corProduto.toLowerCase()
      );
      if (corPorNome) return corPorNome.nome;
      return corMaisProxima(corProduto);
    }
    return "Cor desconhecida";
  }

  // Abre página de edição com dados do produto
  function vizualizar_produto(_id) {
    const produtoSelecionado = array_produtos.find(
      (produto) => produto._id === _id
    );
    set_informacoes_editar_produto(produtoSelecionado);
    navigate("/cadastro_produto");
  }

  // Reseta a edição e vai para cadastro de novo produto
  const ResetNovoProduto = () => {
    set_informacoes_editar_produto(null);
    navigate("/cadastro_produto");
  };

  // Filtra produtos para exibir na tabela
  const produtosFiltrados = filtrar_produto_brecho_id.filter((produto) => {
    const nomeCategoria = array_categorias.find(cat => cat._id === produto.fk_id_categoria)?.nome || "";
    const nomeCor = nomeDaCorSimplificada(produto.cor);
    const termo = termoBusca.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termo) ||
      nomeCategoria.toLowerCase().includes(termo) ||
      nomeCor.toLowerCase().includes(termo)
    );
  });

  // Renderização da tela
  return (
    <AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}>
        <Header tipo={tipo_de_header} />
        <div className="estoque-container">
          <h2>Estoque Produto</h2>
          <div className="container-tabela-estoque">
            <div className="estoque-header">
              <div className="search-box">
                <span className="search-icon">
                  <img src="./img/LupaIcon.svg" alt="Buscar" />
                </span>
                <input
                  type="text"
                  placeholder="Procurar por nome, categoria ou cor"
                  className="search-input"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
              </div>
              <button onClick={ResetNovoProduto} className="novo-produto">
                Novo Produto
              </button>
            </div>

            <div className="estoque-tabela">
              <div className="estoque-tabela-header">
                <span>Produtos</span>
                <span>Preço</span>
                <span>Estoque</span>
                <span>Conservação</span>
                <span>Tamanho</span>
              </div>

              {produtosFiltrados.map((produto, index) => (
                <div
                  className="produto-linha"
                  key={index}
                  onClick={() => vizualizar_produto(produto._id)}
                >
                  <div className="produto-info">
                    <div className="produto-imagem">
                      <img src={produto.imagem[0]} alt={produto.nome} />
                    </div>
                    <div>
                      <p className="produto-nome">{produto.nome}</p>
                      <p className="produto-categoria">
                        {
                          array_categorias.find(
                            (categoria) => categoria._id === produto.fk_id_categoria
                          )?.nome || "Sem categoria"
                        } - {nomeDaCorSimplificada(produto.cor)}
                      </p>
                    </div>
                  </div>
                  <span className="produto-preco">R$ {produto.preco}</span>
                  <span>{produto.quantidade} uni</span>
                  <span>{produto.condicao}</span>
                  <span>{produto.tamanho}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      excluirProduto(produto._id);
                    }}
                    className="delete-button"
                  >
                    <img src="./img/Lixeiraicon.svg" alt="Excluir" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {usuario_logado !== "" && !conversa_aberta && <Chat />}
        {conversa_aberta && <Chat_conversa />}
      </motion.div>
    </AnimatePresence>
  );
}

export default Gestao_Estoque;
