import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../contexts/GlobalContext";
import "./Gestao_estoque.css";
import HeaderBrecho from "../../components/HeaderBrecho"

function Gestao_Estoque() {
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const navigate = useNavigate("");

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

  async function excluirProduto(id) {
    try {
      await  axios.delete(`http://localhost:3000/produto/${id}`);
      buscar_produtos()
    } catch (error) {
      console.error(error);
    }
  
  }

  function procurar_produtos(e){
    if(e.key== "Enter"){

    }

  }

  return (
    
    <div className="">
      <HeaderBrecho/>
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
              onKeyDown={(e)=> procurar_produtos(e)}
            />
          </div>
          <button
            onClick={() => navigate("/cadastro_produto")}
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
            <div className="produto-linha" key={index}>
              <div className="produto-info">
                <div className="produto-imagem">
                  <img src={produto.imagem} alt="" />
                </div>
                <div>
                  <p className="produto-nome">{produto.nome}</p>
                  <p className="produto-categoria">Categoria/cor</p>
                </div>
              </div>
              <span className="produto-preco">R$ {produto.preco}</span>
              <span>{produto.estoque} Uni</span>
              <span>{produto.condicao}</span>
              <span>{produto.tamanho}</span>
              <button
                onClick={() => excluirProduto(produto.id)}
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
