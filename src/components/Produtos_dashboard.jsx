import React from 'react'
import './Produtos_dashboard.css'
import HeaderBrecho from './HeaderBrecho'
import Footer from './Footer'

function Produtos_dashboard() {
    return (
        <div className='alinhamento-estoque-produto-dashboard'>
            <HeaderBrecho />

            <h1>Estoque Produto</h1>

            <div className="alinhamento-container-um-estoque-produto-dashboard">

                <div className="alinhamento-container-dois-estoque-produto-dashboard">
                    <div className="container-um-estoque-produto-dashboard">
                        <div className="alinhamento-input-button-estoque-produto-dashboard">
                            <input type="text"
                                placeholder='Buscar produto'
                            />

                            <button>Novo produto</button>
                        </div>

                        <div className="alinhamento-titulos-estoque-produto-dashboard">
                            <div className="alinhamento-titulo-produtos-dashboard">
                                <p>Produtos</p>
                            </div>

                            <div className="alinhamento-titulos-gerais-dashboard">
                                <p>Preço</p>
                                <p>Estoque</p>
                                <p>Conservação</p>
                                <p>Tamanho</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-dois-estoque-produto-dashboard">
                    <div className="alinhamento-containers-informacoes-produtos-dashboard">
                        <div className="grupo-um-informacoes-produto-dashboard">
                            <div className="imagem-produto-dashboard"></div>

                            <div className="nome-categoria-produto-dashboard">
                                <p className='nome-do-produto-dashboard'>Nome do produto</p>
                                <p className='categoria-cor-dashboard'>Categoria / Cor</p>
                            </div>
                        </div>

                        <div className="grupo-dois-informacoes-produto-dashboard">
                            <p className="preco-produto-dashboard">R$ 20,00</p>

                            <div className="alinhamento-informacoes-gerais-unidade-dashboard">
                                <p className='p-grupo-dois-informacoes-produto-dashboard'>10 Unid</p>
                            </div>

                            <div className="alinhamento-informacoes-gerais-conservacao-dashboard">
                                <p className='p-grupo-dois-informacoes-produto-dashboard'>Usado</p>
                            </div>

                            <div className="alinhamento-informacoes-gerais-tamanho-dashboard">
                                <p className='p-grupo-dois-informacoes-produto-dashboard'>GG</p>
                            </div>

                        </div>

                        <div className="button-deletar-produto-dashboard">
                            <button><img src="./public/img/Lixeiraicon.svg" alt="Deletar produto" /></button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Produtos_dashboard
