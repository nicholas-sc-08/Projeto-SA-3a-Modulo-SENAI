import React from "react";
import "./Gestao_estoque.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";



function Gestao_Estoque(){

  


  const produtos = [
    { nome: "Nome do produto", preco: 20.0, estoque: 10, conservacao: "Usado", tamanho: "GG" },
    { nome: "Nome do produto", preco: 30.0, estoque: 3, conservacao: "Novo", tamanho: "P" },
    { nome: "Nome do produto", preco: 10.0, estoque: 0, conservacao: "Semi novo", tamanho: "M" },
    { nome: "Nome do produto", preco: 15.0, estoque: 3, conservacao: "Semi novo", tamanho: "P" },
    { nome: "Nome do produto", preco: 20.0, estoque: 2, conservacao: "Semi novo", tamanho: "GG" },
    { nome: "Nome do produto", preco: 5.0, estoque: 2, conservacao: "Usado", tamanho: "GG" },
  ];
  const navigate = useNavigate('')

  return (
  
    <div className="estoque-container">
      <h2>Estoque Produto</h2>
      <div className="container-tabela-estoque">
      <div className="estoque-header">
        <div className="search-box">
          <span className="search-icon"><img src="./img/LupaIcon.svg" alt="" /></span>
          <input type="text" placeholder="Procurar produto" className="search-input" />
        </div>
        <button onClick={()=>navigate('/cadastro_produto')}className="novo-produto">Novo Produto</button>
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

        {produtos.map((produto, index) => (
          <div className="produto-linha" key={index}>
            <div className="produto-info">
              <div className="produto-imagem"></div>
              <div>
                <p className="produto-nome">{produto.nome}</p>
                <p className="produto-categoria">Categoria/cor</p>
              </div>
            </div>
            <span className="produto-preco">R$ {produto.preco.toFixed(2)}</span>
            <span>{produto.estoque} Uni</span>
            <span>{produto.conservacao}</span>
            <span>{produto.tamanho}</span>
            <button className="delete-button"><img src="./img/Lixeiraicon.svg" alt="" /></button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Gestao_Estoque;
