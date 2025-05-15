import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../contexts/GlobalContext";
import "./Gestao_estoque.css";
import Header from "../../components/Header";
import api from "../../services/api";


// ...imports mantidos

function Gestao_Estoque() {
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    buscar_produtos();
    buscar_categorias();
  }, []);

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
    console.log(produtoSelecionado);
    set_informacoes_editar_produto(produtoSelecionado);
    navigate("/cadastro_produto");
  }

  const ResetNovoProduto = () => {
    set_informacoes_editar_produto(null);
    navigate("/cadastro_produto");
  };

  return (
    <div>
      <Header tipo="brecho" />
      <div className="estoque-container">
        <h2>Estoque Produto</h2>

        <div className="container-tabela-estoque">
          <div className="estoque-header">
            <div className="search-box">
              <span className="search-icon">
                <img src="./img/LupaIcon.svg" alt="" />
              </span>
              <input
                type="text"
                placeholder="Procurar produto"
                className="search-input"
                onKeyDown={(e) => procurar_produtos(e)}
              />
            </div>
            <button
              onClick={() => ResetNovoProduto()}
              className="novo-produto"
            >
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
              <span></span>
            </div>

            {array_produtos.map((produto, index) => (
              <div
                className="produto-linha"
                key={index}
                onClick={() => vizualizar_produto(produto._id)}
              >
                <div className="produto-info">
                  <div className="produto-imagem">
                    <img src={produto.imagem} alt="" />
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
                  <img src="./img/Lixeiraicon.svg" alt="" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gestao_Estoque;
