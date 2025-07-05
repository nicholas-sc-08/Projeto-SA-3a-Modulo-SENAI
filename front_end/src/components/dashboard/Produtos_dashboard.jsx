import { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Header from '../Header/Header'
import Pop_up_excluir_produto_dashboard from '../pop_up_dashboard/Pop_up_excluir_produto_dashboard';
import Pop_up_notificacao_excluir_produto from '../pop_up_dashboard/Pop_up_notificacao_excluir_produto';
import './Produtos_dashboard.css'

function Produtos_dashboard() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { produtos_dashboard, set_produtos_dashboard } = useContext(GlobalContext)
    const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext)
    const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useContext(GlobalContext);
    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useContext(GlobalContext);
    const { id_do_produto_a_excluir, set_id_do_produto_a_excluir } = useContext(GlobalContext);
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

    function armazenar_id_do_produto(id_do_produto) {

        set_abrir_pop_up_dashboard(true);
        set_id_do_produto_a_excluir(id_do_produto);

    };

    useEffect(() => {

        buscar_produtos();

    }, []);

    useEffect(() => {

        setTimeout(() => {

            set_pop_up_notificacao_excluir_dashboard(false);

        }, 2000);

    }, [pop_up_notificacao_excluir_dashboard]);

    return (
        <AnimatePresence>
            <motion.div className='alinhamento-estoque-produto-dashboard' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                <Header tipo='admin' />

                {abrir_pop_up_dashboard && <div className="container_sombra_para_visualizar_pop_up"></div>}
                {abrir_pop_up_dashboard && <Pop_up_excluir_produto_dashboard />}
                {pop_up_notificacao_excluir_dashboard && <div className="container_sombra_para_visualizar_pop_up"></div>}
                {pop_up_notificacao_excluir_dashboard && <Pop_up_notificacao_excluir_produto />}

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
                                    value={barra_de_pesquisa}
                                    onChange={e => set_barra_de_pesquisa(e.target.value)}
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

                    <div className='fundo-container-dados-do-produto'>

                        <div className="container-dados-do-produto">

                            {!barra_de_pesquisa && array_produtos.map((produto, i) => (

                                <div key={i} className="alinhamento-containers-informacoes-produtos-dashboard">
                                    <div className="grupo-um-informacoes-produto-dashboard">
                                        <div className="imagem-produto-dashboard">

                                            <img src={produto.imagem[0]} alt="" />

                                        </div>

                                        <div className="nome-categoria-produto-dashboard">
                                            <p className='nome-do-produto-dashboard'>{produto.nome}</p>
                                            <p className="categoria-cor-dashboard">
                                                {array_categorias.find(
                                                    (categoria) => categoria._id === produto.fk_id_categoria
                                                )?.nome || "Sem categoria"}{" "}
                                                - {(produto.cor)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grupo-dois-informacoes-produto-dashboard">
                                        <p className="preco-produto-dashboard">R${produto.preco}</p>

                                        <div className="alinhamento-informacoes-gerais-unidade-dashboard">
                                            <p className='p-grupo-dois-informacoes-produto-dashboard'>{produto.quantidade}</p>
                                        </div>

                                        <div className="alinhamento-informacoes-gerais-conservacao-dashboard">
                                            <p className='p-grupo-dois-informacoes-produto-dashboard'>{produto.condicao}</p>
                                        </div>

                                        <div className="alinhamento-informacoes-gerais-tamanho-dashboard">
                                            <p className='p-grupo-dois-informacoes-produto-dashboard'>{produto.tamanho}</p>
                                        </div>

                                    </div>

                                    {escolher_qual_excluir && (
                                        <button
                                            className="button-deletar-produto-dashboard-individual"
                                            onClick={() => armazenar_id_do_produto(produto._id)}
                                        >
                                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                        </button>
                                    )}

                                    <div className="linha-pretinha"></div>

                                </div>

                            ))}

                            {barra_de_pesquisa && resultado_de_pesquisa.map((produto, i) => (

                                <div key={i} className="alinhamento-containers-informacoes-produtos-dashboard">
                                    <div className="grupo-um-informacoes-produto-dashboard">
                                        <div className="imagem-produto-dashboard"></div>

                                        <div className="nome-categoria-produto-dashboard">
                                            <p className='nome-do-produto-dashboard'>{produto.nome}</p>
                                            <p className="categoria-cor-dashboard">
                                                {array_categorias.find(
                                                    (categoria) => categoria._id === produto.fk_id_categoria
                                                )?.nome || "Sem categoria"}{" "}
                                                - {(produto.cor)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grupo-dois-informacoes-produto-dashboard">
                                        <p className="preco-produto-dashboard">{produto.preco}</p>

                                        <div className="alinhamento-informacoes-gerais-unidade-dashboard">
                                            <p className='p-grupo-dois-informacoes-produto-dashboard'>{produto.quantidade}</p>
                                        </div>

                                        <div className="alinhamento-informacoes-gerais-conservacao-dashboard">
                                            <p className='p-grupo-dois-informacoes-produto-dashboard'>{produto.condicao}</p>
                                        </div>

                                        <div className="alinhamento-informacoes-gerais-tamanho-dashboard">
                                            <p className='p-grupo-dois-informacoes-produto-dashboard'>{produto.tamanho}</p>
                                        </div>

                                    </div>

                                    {escolher_qual_excluir && (
                                        <button
                                            className="button-deletar-produto-dashboard-individual"
                                            onClick={() => armazenar_id_do_produto(produto._id)}
                                        >
                                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                        </button>
                                    )}

                                    <div className="linha-pretinha"></div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div >
        </AnimatePresence>
    )
}

export default Produtos_dashboard
