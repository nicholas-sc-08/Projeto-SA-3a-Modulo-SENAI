import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import "./Gestao_estoque.css";
import Header from "../../components/Header";
import api from "../../services/api";
import Chat from "../../components/chat/Chat";
import Chat_conversa from "../../components/chat/Chat_conversa";

function Gestao_Estoque() {
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { conversa_aberta } = useContext(GlobalContext);
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [filtrar_produto_brecho_id, set_filtrar_produto_brecho_id] = useState([]);

  useEffect(() => {
    buscar_produtos();
    buscar_categorias();
    buscar_brechos();
  }, []);

  useEffect(() => {
    const encontrar_brecho = array_brechos.find(brecho => brecho._id === usuario_logado?._id);
    set_tipo_de_header(encontrar_brecho ? "brecho" : "usuario");
  }, [array_brechos, usuario_logado]);

  useEffect(() => {
    if (array_produtos.length > 0 && usuario_logado?._id) {
      const produtosDoBrecho = array_produtos.filter(
        (produto) => produto.fk_id_brecho === usuario_logado._id
      );
      set_filtrar_produto_brecho_id(produtosDoBrecho);
    }
  }, [array_produtos, usuario_logado]);

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

  async function excluirProduto(id) {
    try {
      await api.delete(`/produtos/${id}`);
      buscar_produtos();
    } catch (error) {
      console.error(error);
    }
  }

  function procurar_produtos(e) {
    if (e.key === "Enter") {
      // lógica de pesquisa aqui
    }
  }

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

  function corMaisProxima(hex) {
    const rgb = hexParaRGB(hex);
      if (!rgb) return "Cor desconhecida";

    let corMaisPerto = null;
    let menorDiferenca = Infinity;

    coresSimplificadas.forEach((cor) => {
      const corRGB = hexParaRGB(cor.hex);
      const diferenca =
        Math.abs(rgb.r - corRGB.r) +
        Math.abs(rgb.g - corRGB.g) +
        Math.abs(rgb.b - corRGB.b);

      if (diferenca < menorDiferenca) {
        menorDiferenca = diferenca;
        corMaisPerto = cor.nome;
      }
    });

    return corMaisPerto || "Cor desconhecida";
  }

  function vizualizar_produto(_id) {
    const produtoSelecionado = array_produtos.find(
      (produto) => produto._id === _id
    );
    set_informacoes_editar_produto(produtoSelecionado);
    navigate("/cadastro_produto");
  }

  const ResetNovoProduto = () => {
    set_informacoes_editar_produto(null);
    navigate("/cadastro_produto");
  };

  return (
    <div>
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
                placeholder="Procurar produto"
                className="search-input"
                onKeyDown={procurar_produtos}
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

            {filtrar_produto_brecho_id.map((produto, index) => (
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
                      {array_categorias.find(
                        (categoria) => categoria._id === produto.fk_id_categoria
                      )?.nome || "Sem categoria"}{" "}
                      - {corMaisProxima(produto.cor)}
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
    </div>
  );
}

export default Gestao_Estoque;


      
