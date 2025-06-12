import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './Sacola_geral.css';
import Footer from '../../components/Footer';
import Chat from '../../components/chat/Chat';
import Chat_conversa from '../../components/chat/Chat_conversa';

function Sacola_geral() {

    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const navegar_tela_produto = useNavigate(null);

    function preco_dos_produtos(preco){

        const preco_final = preco.toFixed(2).replace(`.`, `,`);

        return `R$${preco_final}`;
    };

    function preco_total_dos_produtos(){

        let contador = 0;

        for(let i = 0; i < sacola.length; i++){

            contador += (sacola[i].preco * sacola[i].quantidade_selecionada);
        };

        return `R$${contador.toFixed(2).replace(`.`, `,`)}`;
    };

    function ir_para_produto(produto_selecionado){

        set_produto(produto_selecionado);
        navegar_tela_produto(`/produto`);
    };

    return (

        <AnimatePresence>

            <motion.div className='container_sacola_geral' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}>

                <Header tipo={tipo_de_header} />

                <div className="alinhamento_conteudo_tela_sacola_geral">

                    <h1 className='titulo_tela_sacola'>Sacola</h1>

                    <div className="container_conteudo_sacola_geral">

                        <div className="container_produtos_na_sacola_geral">

                            {sacola && sacola.length > 0 ? sacola.map((produto_sacola, i) => (

                                <div key={i} className='container_produto_sacola_geral' onClick={() => ir_para_produto(produto_sacola)}>

                                    <div className="container_imagem_do_produto_sacola_geral">

                                        <img src={produto_sacola.imagem[0]} alt="" />

                                    </div>

                                    <div className="container_info_produto_sacola_geral">

                                        <div className="container_titulo_produto_sacola_geral">

                                            <h2>{produto_sacola.nome}</h2>
                                            <button><img src="./img/Lixeira_icon_v_tres.svg" alt="" /></button>

                                        </div>

                                        <div className="container_info_extra_produto">


                                            <p>Tamanho: <span>{produto_sacola.tamanho}</span></p>
                                            <p>Cor: <span>{produto_sacola.cor[0]}</span></p>

                                        </div>

                                        <div className="container_preco_produto_sacola_geral">

                                            <span>{preco_dos_produtos(produto_sacola.preco)}</span>
                                        
                                        </div>

                                    </div>

                                </div>
                            )) :

                                <div className='container_nenhum_item_sacola_geral'>

                                    <img src="./img/icons/icone_sacola_a.svg" alt="" />
                                    <span>Hmm... Parece que você ainda não adicionou um item a sacola!</span>

                                </div>}

                        </div>

                        <div className="container_resumo_do_pedido_sacola_geral">

                            <h3>Resumo do Pedido</h3>

                            <div className="container_texto_do_resumo_pedido">

                                <p>Seu carrinho está pronto! Verifique todos os seus itens, certifique-se de que tudo está correto e finalize sua compra com segurança e tranquilidade.</p>

                            </div>

                            <div className="container_valores_sacola_geral">

                                <div className="container_sub_total_sacola_geral">

                                    <span>Subtotal</span>
                                    <span>{preco_total_dos_produtos()}</span>

                                </div>

                                <div className="container_total_sacola_geral">

                                    <span>Total</span>
                                    <span>{preco_total_dos_produtos()}</span>

                                </div>

                                <div className="container_botao_de_finalizar_compra">

                                    <button>Finalizar Compra <img src='./img/icons/icone_botao_finalizar_compra.svg' /></button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <Footer />

                {usuario_logado != `` && !conversa_aberta && <Chat />}
                {conversa_aberta && <Chat_conversa />}

            </motion.div>

        </AnimatePresence>
    )
}

export default Sacola_geral
