import React, { useContext, useEffect, useRef, useState } from 'react'
import './Marcas_dashboard.css'
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import { GlobalContext } from '../../contexts/GlobalContext';
import Pop_up_cadastrar_marca from '../pop_up_marcas/Pop_up_cadastrar_marca';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Marcas_dashboard() {

    const { array_marcas, set_array_marcas } = useContext(GlobalContext)
    const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
    const { marcas_dashboard, set_marcas_dashboard } = useContext(GlobalContext)
    const { id_marca, set_id_marca } = useContext(GlobalContext);
    const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
    
    const { pop_up_de_cadastrar_marca, set_pop_up_de_cadastrar_marca } = useContext(GlobalContext);
    
    const [ editar_marca, set_editar_marca ] = useState(false);
    const [array_marcas_ordenado, set_array_marcas_ordenado] = useState([]);
    const [texto_da_barra_de_pesquisa, set_texto_da_barra_de_pesquisa] = useState(``);
    const [array_da_barra_de_pesquisa, set_array_da_barra_de_pesquisa] = useState([]);

    const referencia_input = useRef(null);
    const navegar = useNavigate(``);

    function voltar_para_o_inicio() {

        set_inicio_dashboard(true);
        set_marcas_dashboard(false);
    };

    async function buscar_marcas() {

        try {

            const marcas = await api(`/marcas`);
            set_marcas_dashboard(marcas.data);

            const marcas_ordenadas = [...marcas.data].sort((primeira_marca, marca_seguinte) => primeira_marca.nome.localeCompare(marca_seguinte.nome, 'pt-BR', { sensitivity: 'base' }));
            set_array_marcas_ordenado(marcas_ordenadas);

        } catch (erro) {

            console.error(erro);
            set_erro_pagina(erro);
            navegar(`/erro`);
        };
    };

    // function clicar_em_marca(id) {

    //     set_id_marca(id);

    //     if (editar_marca) {

    //         set_pop_up_de_editar_marca(true);
    //         set_editar_marca(false);

    //     } else {

    //         set_pop_up_de_excluir_marca(true);
    //     };
    // };

    useEffect(() => {

        buscar_marcas();

    }, []);

    return (
        <div>
            <AnimatePresence>

                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className='container_categorias_dashboard'>

                    <Header tipo='admin' />

                    {pop_up_de_cadastrar_marca && <div className='container_escurecer_tela'></div>}
                    {pop_up_de_cadastrar_marca && <Pop_up_cadastrar_marca />}

                    {/* {pop_up_notificacao_cadastro_categoria && <div className='container_escurecer_tela'></div>}
                    {pop_up_notificacao_cadastro_categoria && <Pop_up_de_notificacao_cadastro_categoria />}

                    {pop_up_de_editar_categoria && <div className='container_escurecer_tela'></div>}
                    {pop_up_de_editar_categoria && <Pop_up_de_editar_categoria />}

                    {pop_up_notificacao_editar_categoria && <div className='container_escurecer_tela'></div>}
                    {pop_up_notificacao_editar_categoria && <Pop_up_de_notificacao_editar_categoria />}

                    {pop_up_de_excluir_categoria && <div className='container_escurecer_tela'></div>}
                    {pop_up_de_excluir_categoria && <Pop_up_de_excluir_categoria />}

                    {pop_up_notificacao_excluir_categoria && <div className='container_escurecer_tela'></div>}
                    {pop_up_notificacao_excluir_categoria && <Pop_up_de_notificacao_excluir_categoria />} */}


                    <div className="container-alinhamento-imagem-titulo-categorias-dashboard">
                        <div className="container-alinhamento-imagem-categorias-dashboard">
                            <div className="container-alinhamento-imagem-titulo-quantidade-categorias-dashboard">
                                <div className="fundo-cinza-imagem-categorias-dashboard">
                                    <div className="fundo-verde-imagem-categorias-dashboard">
                                        <img src="./img/icons/icone_dashboard_etiqueta_v_um.svg" alt="Icone categorias dashboard" />
                                    </div>
                                </div>

                                <div className="container-alinhamento-titulo-marcas-dashboard">
                                    <p className='titulo-um-categorias-dashboard'>Marcas</p>
                                    <p className='numero-de-categorias-dashboard'>{array_marcas.length}</p>
                                </div>
                            </div>

                            <div className="container-sair-de-categorias-dashboard" onClick={voltar_para_o_inicio}>
                                <p>Voltar</p>

                                <img src="./img/icone_dashboard_sair.svg" alt="ir para a tela inicial" />
                            </div>
                        </div>
                    </div>


                    <div className="container_tabela_categorias">

                        <div className="container_tabela_categorias_header">

                            <div className="container_tabela_categorias_header_barra_de_pesquisa" onClick={() => referencia_input.current.focus()}>

                                <img src="./img/LupaIcon.svg" alt="Lupa" />
                                <input type="text" placeholder='Procurar Categoria' ref={referencia_input} value={texto_da_barra_de_pesquisa} onChange={e => set_texto_da_barra_de_pesquisa(e.target.value)} />

                            </div>

                            <div className="container_botoes_header_categorias">


                                <div className="container_tabela_categorias_header_cadastrar_categoria">

                                    <button onClick={() => set_pop_up_de_cadastrar_marca(true)}>Nova Marca</button>

                                </div>

                                <div className="container_tabela_categorias_header_editar_categoria">

                                    <button onClick={() => set_editar_marca(!editar_categoria)}>Editar Marca</button>

                                </div>

                            </div>

                        </div>

                        <div className="container_subtitulo_tabela_categorias">

                            <h2>Marcas</h2>

                        </div>

                        <div className="container_de_categorias_da_tabela">

                            {array_marcas_ordenado.length > 0 ? array_marcas_ordenado.map((marca, i) => (

                                <div className='container_conteudo_categoria' key={i} onClick={() => clicar_em_categoria(marca._id)}>

                                    <span>{editar_marca && "· "}{marca.nome}</span>

                                </div>
                            )) : <div className='container_nenhuma_categoria'>

                                <img src="./img/LupaIcon.svg" alt="" />
                                <p>Nenhuma marca encontrada</p>

                            </div>}

                        </div>

                    </div>

                </motion.div>

            </AnimatePresence>
        </div>
    )
}

export default Marcas_dashboard
