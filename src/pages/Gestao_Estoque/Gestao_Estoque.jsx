import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import namer from "color-namer";
import { GlobalContext } from "../../contexts/GlobalContext";
import "./Gestao_estoque.css";
import HeaderBrecho from "../../components/HeaderBrecho";

function Gestao_Estoque() {
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const { array_categorias, set_array_categorias } = useContext(GlobalContext)
  const navigate = useNavigate();

  useEffect(() => {
    buscar_produtos();
  }, []);

  useEffect(() => {
    console.log(array_produtos);
  }, [array_produtos]);

  async function buscar_produtos() {
    try {
      const produtos = await axios.get("http://localhost:3000/produto");
      set_array_produtos(produtos.data);
    } catch (erro) {
      console.error(erro);
    }
  }

  async function buscar_categorias() {
    try {
      const categorias = await axios.get("http://localhost:3000/categorias");
      set_array_categorias(categorias.data);
    } catch (erro) {
      console.error(erro);
    }
  }

  async function excluirProduto(id) {
    try {
      await axios.delete(`http://localhost:3000/produto/${id}`);
      buscar_produtos();
    } catch (error) {
      console.error(error);
    }
  }

  function procurar_produtos(e) {
    if (e.key === "Enter") {
      // Implementar lógica de pesquisa
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
    const match = hex.match(/#([0-9a-fA-F]{6})/);
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
  
  // Exemplo de uso:
  console.log(corMaisProxima("#3e2a21")); // Deve retornar "Marrom" ou algo próximo
  console.log(corMaisProxima("#00ffff")); // Deve retornar "Ciano"
  console.log(corMaisProxima("#ffd700")); // Deve retornar "Dourado"
  
  

  return (
    <div>
      <HeaderBrecho />
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
            <button onClick={() => navigate("/cadastro_produto")} className="novo-produto">
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
              <div className="produto-linha" key={index}>
                <div className="produto-info">
                  <div className="produto-imagem">
                    <img src={produto.imagem} alt="" />
                  </div>
                  <div>
                    <p className="produto-nome">{produto.nome}</p>
                    <p className="produto-categoria">{array_categorias.map((categoria, i) => (

                    <div className="container_categoria" key={i}>

                      <p>{array_categorias.find((categoria) => categoria.id == produto.fk_id_categoria)}</p>

                    </div>

                    ))}{corMaisProxima(produto.cor)}</p>
                  </div>
                </div>
                <span className="produto-preco">R$ {produto.preco}</span>
                <span>{produto.estoque} Uni</span>
                <span>{produto.condicao}</span>
                <span>{produto.tamanho}</span>
                <button onClick={() => excluirProduto(produto.id)} className="delete-button">
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
