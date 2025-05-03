import React from 'react'
import './Produtos_dashboard.css'
import Header from './Header'
// import Footer from './Footer'

function Produtos_dashboard() {
    return (
        <div className='alinhamento-estoque-produto-dashboard'>
            <Header tipo='admin' />
            
            <div className="container-alinhamento-imagem-titulo-produtos-dashboard">
                <div className="container-alinhamento-imagem-produtos-dashboard">
                    <div className="container-alinhamento-imagem-titulo-quantidade-produtos-dashboard">
                        <div className="fundo-cinza-imagem-produtos-dashboard">
                            <div className="fundo-verde-imagem-produtos-dashboard">
                                <img src="./public/img/icons/icone_dashboard_produtos_v_um.svg" alt="Icone produtos dashboard" />
                            </div>
                        </div>

                        <div className="container-alinhamento-titulo-produtos-dashboard">
                            <p className='titulo-um-produtos-dashboard'>Produtos</p>
                            <p className='numero-de-produtos-dashboard'>200</p>
                        </div>
                    </div>

                    <div className="container-sair-de-brechos-dashboard">
                        <p>Voltar</p>

                        <img src="./img/icone_dashboard_sair.svg" alt="" />
                    </div>
                </div>
            </div>

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
                                <p>Nome do produto</p>
                            </div>

                            <div className="alinhamento-titulos-gerais-dashboard">
                                <p className='p-titulos-produtos-dashboard'>Preço</p>
                                <p className='p-titulos-produtos-dashboard'>Estoque</p>
                                <p className='p-titulos-produtos-dashboard'>Conservação</p>
                                <p className='p-titulos-produtos-dashboard'>Tamanho</p>
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
