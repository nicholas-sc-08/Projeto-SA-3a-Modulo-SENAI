import React, { useContext, useEffect, useState } from 'react'
import './Produtos_dashboard.css'
import Header from './Header'
import { GlobalContext } from '../contexts/GlobalContext';

function Produtos_dashboard() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { produtos_dashboard, set_produtos_dashboard } = useContext(GlobalContext)
    const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext)

    const [barra_de_pesquisa, set_barra_de_pesquisa] = useState(``);
    const [resultado_de_pesquisa, set_resultado_de_pesquisa] = useState([]);

    const [ids_filtrado, set_ids_filtrado] = useState(``);

    const [escolher_qual_excluir, set_escolher_qual_excluir] = useState(false);

    function voltar_para_o_inicio() {
        set_inicio_dashboard(true);
        set_produtos_dashboard(false);
    };

    useEffect(() => {

        const produtos_filtrados = array_produtos.filter(produto => produto.nome.toLowerCase().includes(barra_de_pesquisa.toLowerCase()));
        const ids = produtos_filtrados.map(produto => produto._id);

        set_resultado_de_pesquisa(produtos_filtrados);
        set_ids_filtrado(ids);

    }, [barra_de_pesquisa, array_produtos]);

    async function buscar_produtos() {

        try {

            const resultado = await api.get(`/produtos`);
            set_array_produtos(resultado.data);

        } catch (erro) {

            console.error(erro);
            set_erro_pagina(erro);
            navegar(`/erro`);
        };
    };

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
                            <p className='numero-de-produtos-dashboard'>{array_produtos.length}</p>
                        </div>
                    </div>

                    <div className="container-sair-de-brechos-dashboard" onClick={voltar_para_o_inicio}>
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

                            <div className="container_excluir_produto">

                                <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira' /> : <img src='./img/icons/close-icon.png' alt='cancelar' />}</button>

                            </div>
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

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Produtos_dashboard
