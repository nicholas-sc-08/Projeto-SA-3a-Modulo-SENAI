import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';

import api from '../../services/api';
import Pop_up_excluir_produto_sacola from '../../components/Pop_up_excluir_produto_sacola/Pop_up_excluir_produto_sacola.jsx';
import Pop_up_notificacao_comprado from '../../components/Pop_up_notificacao_comprado/Pop_up_notificacao_comprado.jsx';
import Pop_up_usuario_nao_logado from '../../components/pop_up_usuario_nao_logado/Pop_up_usuario_nao_logado.jsx';
import Pop_up_sacola_vazia from '../../components/Pop_up_sacola_vazia/Pop_up_sacola_vazia.jsx';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Chat from '../../components/chat/Chat.jsx';
import Chat_conversa from '../../components/chat/Chat_conversa.jsx';

import './Sacola_geral.css';

function Sacola_geral() {

    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { sacola_aberta, set_sacola_aberta } = useContext(GlobalContext);
    const { sacola_ou_produto, set_sacola_ou_produto } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const [clicou_em_excluir, set_clicou_em_excluir] = useState(false);
    const [mostrarPopupCompra, setMostrarPopupCompra] = useState(false);
    const [pop_up_usuario_nao_logado, set_pop_up_usuario_nao_logado] = useState(false);
    const [pop_up_sacola_vazia, set_pop_up_sacola_vazia] = useState(false);
    const navegar_tela = useNavigate();
    const referencia_sacola = useRef(null);

    useEffect(() => {

        set_sacola_ou_produto(`/sacola`);

    }, [set_sacola_ou_produto]);

    useEffect(() => {

        if (usuario_logado._id) {

            set_sacola(usuario_logado.sacola);
        };

    }, [usuario_logado, set_sacola]);

    useEffect(() => {

        if(pop_up_usuario_nao_logado){

            setTimeout(() => {
                
                set_pop_up_usuario_nao_logado(false);

            }, 2000);
        };

    }, [pop_up_usuario_nao_logado]);

        useEffect(() => {

        if(pop_up_sacola_vazia){

            setTimeout(() => {
                
                set_pop_up_sacola_vazia(false);

            }, 2000);
        };

    }, [pop_up_sacola_vazia]);

    useEffect(() => {

        if (clicou_em_excluir) {

            setTimeout(() => set_clicou_em_excluir(false), 2000);
        };

    }, [clicou_em_excluir]);

    async function remover_produto_sacola(produto_selecionado) {

        try {

            const array_com_produto_removido = sacola.filter(p => p._id !== produto_selecionado._id);

            if (usuario_logado._id) {

                const usuario_atualizado = { ...usuario_logado, sacola: array_com_produto_removido };
                const atualizar_usuario = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);

                set_usuario_logado(atualizar_usuario.data);

            } else {

                set_sacola(array_com_produto_removido);
            };

            set_clicou_em_excluir(true);

        } catch (erro) {

            console.error(erro);
        };
    };

    function preco_dos_produtos(produto_sacola) {

        const calcular_preco = produto_sacola.preco * produto_sacola.quantidade_selecionada;
        const preco_final = calcular_preco.toFixed(2).replace(`.`, `,`);

        return `R$${preco_final}`;
    };

    function preco_total_dos_produtos() {

        let contador = 0;

        if (sacola) {

            for (let i = 0; i < sacola.length; i++) {
                contador += (sacola[i].preco * sacola[i].quantidade_selecionada);
            };
        };

        return `R$${contador.toFixed(2).replace(`.`, `,`)}`;
    };

    function ir_para_produto(produto_selecionado) {

        set_produto(produto_selecionado);
        navegar_tela(`/produto`);
        set_sacola_aberta(false);
    };

    async function diminuir_quantia_selecionada(produto_selecionado) {

        try {

            const produto_atualizado = { ...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada - 1 };
            const produtos = sacola.map(p => p._id === produto_selecionado._id ? produto_atualizado : p);

            if (usuario_logado._id) {

                const cliente_atualizado = { ...usuario_logado, sacola: produtos };
                const dados_do_cliente = await api.put(`/clientes/${cliente_atualizado._id}`, cliente_atualizado);

                set_usuario_logado(dados_do_cliente.data);
                set_sacola(produtos);

            } else {
                
                set_sacola(produtos);
            };

        } catch (erro) {
            
            console.error(erro);
        };
    };

    async function aumentar_quantidade_selecionada(produto_selecionado) {

        try {

            const produto_atualizado = { ...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada + 1 };
            const produtos = sacola.map(p => p._id === produto_selecionado._id ? produto_atualizado : p);

            if (usuario_logado._id) {

                const usuario_atualizado = { ...usuario_logado, sacola: produtos };
                const dados_do_usuario = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);

                set_sacola(produtos);
                set_usuario_logado(dados_do_usuario.data);

            } else {
                set_sacola(produtos);
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    // Função para finalizar compra e redirecionar para Stripe
    async function finalizarCompra() {

        try {
            if (!sacola || sacola.length == 0) {

                set_pop_up_sacola_vazia(true);
                return;
            };

            if(usuario_logado._id){
                
                const response = await api.post(`/criar-checkout`, { itens: sacola });
                
                if (response.data?.url) {
                    // Redireciona para o checkout do Stripe
                    window.location.href = response.data.url;                            
                    atualizar_usuario_pos_compra();
                };
                
            } else {
            
                set_pop_up_usuario_nao_logado(true);
            };
        } catch (error) {

            console.error("Erro ao iniciar pagamento:", error);
        };
    };

    // Fecha o popup de sucesso e volta para home
    function fecharPopupSucesso() {

        setMostrarPopupCompra(false);
        set_sacola_aberta(false);
        navegar_tela(`/`);
    }

    return (
        <AnimatePresence>
            <motion.div
                className="container_sacola_geral"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                ref={referencia_sacola}
            >
                {pop_up_sacola_vazia && <Pop_up_sacola_vazia/>}
                {pop_up_usuario_nao_logado && <Pop_up_usuario_nao_logado/>}
                {clicou_em_excluir && <Pop_up_excluir_produto_sacola />}
                {mostrarPopupCompra && <Pop_up_notificacao_comprado fechar={fecharPopupSucesso} />}

                <Header tipo={tipo_de_header} />

                <div className="alinhamento_conteudo_tela_sacola_geral" ref={referencia_sacola}>

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

                                            <button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    remover_produto_sacola(produto_sacola);
                                                }}
                                            >
                                                <img src="./img/Lixeira_icon_v_tres.svg" alt="Excluir" />
                                            </button>

                                        </div>

                                        <div className="container_info_extra_produto">
                                            <p>Tamanho: <span>{produto_sacola.tamanho}</span></p>
                                            <p>Cor: <span>{produto_sacola.cor[0]}</span></p>
                                        </div>

                                        <div className="container_preco_produto_sacola_geral">

                                            <p>{preco_dos_produtos(produto_sacola)}</p>

                                            <div className="container_contador_quantidade_produtos">

                                                <button
                                                    disabled={produto_sacola.quantidade_selecionada === 1}
                                                    className='botao_diminuir_contador_sacola_geral'
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        diminuir_quantia_selecionada(produto_sacola);
                                                    }}
                                                >
                                                    -
                                                </button>

                                                <span>{produto_sacola.quantidade_selecionada}</span>

                                                <button
                                                    disabled={produto_sacola.quantidade_selecionada === produto_sacola.quantidade}
                                                    className='botao_aumentar_contador_sacola_geral'
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        aumentar_quantidade_selecionada(produto_sacola);
                                                    }}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )) :

                                <div className='container_nenhum_item_sacola_geral'>
                                    <img src="./img/icons/icone_sacola_a.svg" alt="Nenhum item" />
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
                                    <button onClick={finalizarCompra}>
                                        Finalizar Compra <img src='./img/icons/icone_botao_finalizar_compra.svg' alt="finalizar" />
                                    </button>
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
    );
}

export default Sacola_geral;
