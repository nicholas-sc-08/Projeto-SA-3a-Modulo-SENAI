import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Pop_up_excluir_produto_sacola  from '../Pop_up_excluir_produto_sacola/Pop_up_excluir_produto_sacola';'../Pop_up_excluir_produto_sacola/Pop_up_excluir_produto_sacola.jsx'
import api from "../../services/api";
import './Sacola.css';

function Sacola() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    const { sacola_aberta, set_sacola_aberta } = useContext(GlobalContext);
    const ir_para_sacola = useNavigate(null);

    useEffect(() => {

        buscar_brechos();
        buscar_clientes();

        if (usuario_logado._id) {

            set_sacola(usuario_logado.sacola);
        };

    }, []);

    useEffect(() => {

        if (usuario_logado._id) {

            set_sacola(usuario_logado.sacola);
        };

    }, [usuario_logado]);

    async function buscar_brechos() {

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_clientes() {

        try {

            const clientes = await api.get(`/clientes`);
            set_array_clientes(clientes.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function diminuir_produto(produto_selecionado) {

        try {

            const produto_atualizado = { ...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada - 1 };

            if (produto_atualizado.quantidade_selecionada == 0) {

                const filtrar_produtos = sacola.filter(produto => produto._id != produto_selecionado._id);

                if (usuario_logado._id) {


                    const usuario_atualizado = { ...usuario_logado, sacola: filtrar_produtos };
                    const cliente_atualizado = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);
                    set_usuario_logado(cliente_atualizado.data);
                } else {

                    set_sacola(filtrar_produtos);
                };

            } else {

                const produtos = sacola.map(produto => produto._id == produto_selecionado._id ? produto_atualizado : produto);

                if (usuario_logado._id) {

                    const usuario_atualizado = { ...usuario_logado, sacola: produtos };
                    const cliente_atualizado = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);
                    set_usuario_logado(cliente_atualizado.data);
                } else {

                    set_sacola(produtos);
                };
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    async function aumentar_produto(produto_selecionado) {

        try {

            const produto_atualizado = { ...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada + 1 };
            const produtos = sacola.map(produto => produto._id == produto_selecionado._id ? produto_atualizado : produto);

            if (usuario_logado._id) {


                const usuario_atualizado = { ...usuario_logado, sacola: produtos };
                const cliente_atualizado = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);
                set_usuario_logado(cliente_atualizado.data);

            } else {

                set_sacola(produtos);
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    function imagem_do_brecho(id_brecho) {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == id_brecho);

        if (encontrar_brecho) {

            return encontrar_brecho.logo;
        };
    };

    function exibir_preco(produto_selecionado) {

        const preco_total = produto_selecionado.preco * produto_selecionado.quantidade_selecionada;
        const preco_formatado = preco_total.toFixed(2).replace('.', ',');

        return `R$${preco_formatado}`;
    };

    function ir_sacola_geral() {

        set_sacola_aberta(false);
        ir_para_sacola(`/sacola`);
    };

    return (
        <AnimatePresence mode="wait">

            <motion.div
                className='container_sacola'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                <div className="container_header_sacola">

                    <h1>Sacola</h1>

                </div>

                <div className="container_produtos_na_sacola">

                    {sacola && sacola.length > 0 ? sacola.map((produto, i) => (

                        <div key={i} className='container_produtos_a_exibir_sacola'>

                            <div className="container_imagem_do_produto_sacola">

                                <img src={produto._id ? produto.imagem[0] : ``} alt="" />

                            </div>

                            <div className="container_info_produto_sacola">

                                <div className="container_info_produto_nome_sacola">

                                    <div className="container_info_produto_quantidade_e_nome">

                                        <div className="container_info_produto_titulo_sacola">

                                            <h3>{produto.nome}</h3>
                                        </div>

                                        <div className="container_contador_de_produtos">

                                            <button className='diminuir_quantidade_de_produto' onClick={() => diminuir_produto(produto)}>-</button>
                                            <h5>{produto.quantidade_selecionada}</h5>
                                            <button className='aumentar_quantidade_de_produto' disabled={produto.quantidade_selecionada == produto.quantidade} onClick={() => aumentar_produto(produto)}>+</button>
                                        </div>

                                    </div>

                                    <div className="container_info_produto_preco_e_logo">

                                        <img src={imagem_do_brecho(produto.fk_id_brecho)} alt="" />
                                        <span className='preco_do_produto_sacola'>{exibir_preco(produto)}</span>

                                    </div>


                                </div>

                            </div>

                        </div>

                    )) : <div className='nenhum_item_adicionado'> <img src="./img/icons/lupa.png" alt="" /><p>Nenhum item adicionado</p> </div>}

                </div>
                <div className="container_botao_da_sacola">

                    <button onClick={() => ir_sacola_geral()}>Visualizar Sacola</button>

                </div>

            </motion.div>
        </AnimatePresence>
    )
}

export default Sacola
