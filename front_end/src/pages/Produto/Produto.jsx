import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import Header from '../../components/Header/Header';
import Chat_conversa from '../../components/chat/Chat_conversa';
import Chat from '../../components/chat/Chat';
import Footer from '../../components/Footer/Footer';
import Pop_up_conversa_adicionada from '../../components/pop_up_conversa_adicionada/Pop_up_conversa_adicionada';
import Pop_up_usuario_nao_logado from '../../components/pop_up_usuario_nao_logado/Pop_up_usuario_nao_logado';
import Pop_up_produto_adicionado from '../../components/Pop_produto_adicionado/Pop_up_produto_adicionado.jsx'
import Pop_up_conversa_adicionada_sucesso from '../../components/pop_up_conversa_adicionada/Pop_up_conversa_adicionada_sucesso.jsx';
import './Produto.css';

function Produto() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    const { sacola_aberta, set_sacola_aberta } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { nome_do_brecho, set_nome_do_brecho } = useContext(GlobalContext);
    const { exibir_nome_brecho, set_exibir_nome_brecho } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
    const { brecho_selecionado, set_brecho_selecionado } = useContext(GlobalContext);
    const { sacola_ou_produto, set_sacola_ou_produto } = useContext(GlobalContext);
    const [imagem_selecionada, set_imagem_selecionada] = useState(0);
    const [produto_visualiazado, set_produto_visualizado] = useState(`0.1vw solid var(--cor_um)`);
    const [pop_de_chat_ja_adicionado, set_pop_de_chat_ja_adicionado] = useState(false);
    const [pop_de_chat_adicionado, set_pop_de_chat_adicionado] = useState(false);
    const [pop_up_de_usuario_nao_logado, set_pop_up_de_usuario_nao_logado] = useState(false);
    const [produtos_embaralhados, set_produtos_embaralhados] = useState([]);
    const [produto_adicionado_na_sacola, set_produto_adicionado_na_sacola] = useState(false);
    const refencia_do_produto = useRef(null);
    const ir_para_perfil = useNavigate(null);

    const cores_simplificadas = [{ nome: "Preto", hex: "#000000" }, { nome: "Branco", hex: "#FFFFFF" }, { nome: "Vermelho", hex: "#FF0000" }, { nome: "Verde", hex: "#008000" }, { nome: "Azul", hex: "#0000FF" }, { nome: "Amarelo", hex: "#FFFF00" }, { nome: "Laranja", hex: "#FFA500" }, { nome: "Roxo", hex: "#800080" }, { nome: "Marrom", hex: "#8B4513" }, { nome: "Cinza", hex: "#808080" }, { nome: "Rosa", hex: "#FFC0CB" }, { nome: "Ciano", hex: "#00FFFF" }, { nome: "Magenta", hex: "#FF00FF" }, { nome: "Vinho", hex: "#800000" }, { nome: "Dourado", hex: "#FFD700" }, { nome: "Prateado", hex: "#C0C0C0" }, { nome: "Bege", hex: "#F5F5DC" }, { nome: "Turquesa", hex: "#40E0D0" }, { nome: "Lima", hex: "#00FF00" }, { nome: "Lavanda", hex: "#E6E6FA" },];

    useEffect(() => {

        buscar_produtos();
        buscar_brechos();
        buscar_clientes();

    }, [usuario_logado]);

    useEffect(() => {

        sortear_produtos();
        set_sacola_aberta(false);
        refencia_do_produto.current.scrollIntoView();

    }, []);

    useEffect(() => {

        if (pop_up_de_usuario_nao_logado) {


            setTimeout(() => {

                set_pop_up_de_usuario_nao_logado(false);

            }, 3000);
        };

    }, [pop_up_de_usuario_nao_logado]);

    useEffect(() => {

        if (produto_adicionado_na_sacola) {

            setTimeout(() => {

                set_produto_adicionado_na_sacola(false);

            }, 2000);
        };

    }, [produto_adicionado_na_sacola]);

    useEffect(() => {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

        if (encontrar_brecho) {

            set_tipo_de_header(`brecho`);
        } else {

            set_tipo_de_header(`usuario`);
        };

    }, []);

    useEffect(() => {

        if (pop_de_chat_ja_adicionado) {

            setTimeout(() => {

                set_pop_de_chat_ja_adicionado(false);

            }, 2000);
        };

        if (pop_de_chat_adicionado) {

            setTimeout(() => {

                set_pop_de_chat_adicionado(false);

            }, 2000);
        };

        if (pop_up_de_usuario_nao_logado) {

            setTimeout(() => {

                set_pop_up_de_usuario_nao_logado(true);

            }, 2000);
        };

    }, [pop_de_chat_ja_adicionado, pop_up_de_usuario_nao_logado, pop_de_chat_adicionado]);

    async function buscar_brechos() {

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_produtos() {

        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);

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

    async function adicionar_conversa_ao_chat() {

        try {

            if (usuario_logado._id) {

                const brecho_selecionado = array_brechos.find(brecho => brecho._id == produto.fk_id_brecho);

                if (usuario_logado._id != produto.fk_id_brecho) {

                    const conversa_ja_existente = usuario_logado.conversas.find(conversa => conversa._id == produto.fk_id_brecho);

                    if (conversa_ja_existente) {

                        set_pop_de_chat_ja_adicionado(true);

                    } else {

                        const info_do_brecho = { _id: brecho_selecionado._id, nome_brecho: brecho_selecionado.nome_brecho, logo: brecho_selecionado.logo }
                        const nova_conversa_com_brecho = [...usuario_logado.conversas, info_do_brecho];

                        await api.put(`/clientes/${usuario_logado._id}`, { conversas: nova_conversa_com_brecho });
                        set_usuario_logado({ ...usuario_logado, conversas: [...usuario_logado.conversas, info_do_brecho] });

                        const info_do_cliente = { _id: usuario_logado._id, nome: usuario_logado.nome, imagem_de_perfil: usuario_logado.imagem_de_perfil };
                        const nova_conversa_com_cliente = [...brecho_selecionado.conversas, info_do_cliente];

                        await api.put(`/brechos/${brecho_selecionado._id}`, { conversas: nova_conversa_com_cliente });
                        set_pop_de_chat_adicionado(true);
                    };
                };

            } else {

                set_pop_up_de_usuario_nao_logado(true);
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    function sortear_produtos() {

        const embaralhar = [...array_produtos].sort(() => Math.random() - 0.5);
        const produtos_selecionados = embaralhar.slice(0, 4);

        set_produtos_embaralhados(produtos_selecionados);
    };

    function ir_para_produto_selecionado(produto_selecionado) {

        refencia_do_produto.current.scrollIntoView();

        set_produto(produto_selecionado);
        set_imagem_selecionada(0);
        sortear_produtos();
    };

    function imagem_do_brecho(_id) {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if (encontrar_brecho) {

            return encontrar_brecho.logo;
        };
    };

    function exibir_preco(preco) {

        const preco_convertido = String(preco).split(`.`);
        const decimal = preco_convertido[preco_convertido.length - 1];

        return decimal < 10 ? `R$${preco_convertido[0]},${decimal}0` : `R$${preco_convertido[0]},${decimal}`;
    };

    function exibir_nome_do_brecho(_id) {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if (exibir_nome_brecho == false) {

            set_exibir_nome_brecho(true);
            set_nome_do_brecho(encontrar_brecho.nome_brecho);
        };
    };

    function ir_para_perfil_brecho(id_brecho) {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == id_brecho);

        set_brecho_selecionado(encontrar_brecho);
        ir_para_perfil(`/perfil_brecho`);
    };

    async function adicionar_a_sacola() {

        const encontrar_produto = array_produtos.find(p => p._id == produto._id);

        try {

            if (usuario_logado._id) {

                if (sacola) {

                    const encontrar_produto_sacola = sacola.find(p => p._id == produto._id);

                    if (!encontrar_produto_sacola) {

                        const produto_na_sacola = { ...encontrar_produto, quantidade_selecionada: 1 };

                        if (usuario_logado) {

                            const usuario_atualizado = { ...usuario_logado, sacola: [...usuario_logado.sacola, produto_na_sacola] };

                            set_usuario_logado(usuario_atualizado);
                            set_sacola(usuario_atualizado.sacola);

                            const cliente = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);
                            set_usuario_logado(cliente.data);
                            set_produto_adicionado_na_sacola(true);
                        } else {

                            set_sacola([...sacola, produto_na_sacola]);
                            set_produto_adicionado_na_sacola(true);
                        };

                    };
                };

            } else {

                if (sacola) {

                    const encontrar_produto_sacola = sacola.find(p => p._id == produto._id);

                    if (!encontrar_produto_sacola) {

                        const produto_na_sacola = { ...encontrar_produto, quantidade_selecionada: 1 };

                        set_sacola([...sacola, produto_na_sacola]);
                        set_produto_adicionado_na_sacola(true);

                    };

                } else {

                    set_sacola([{ ...produto, quantidade_selecionada: 1 }]);
                };
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    function hexa_para_rgb(hex) {
        if (typeof hex !== "string") {

            return null;
        }

        if (!hex.startsWith("#")) {

            hex = "#" + hex;
        }

        const match = hex.match(/^#([0-9a-fA-F]{6})$/);

        if (!match) {

            return null
        };

        const bigint = parseInt(match[1], 16);

        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    function cor_mais_proxima(hex) {
        const rgb = hexa_para_rgb(hex);
        if (!rgb) {

            return "Cor desconhecida"
        };

        let cor_mais_proxima = null;
        let menor_diferença = Infinity;

        cores_simplificadas.forEach((cor) => {
            const cor_rgb = hexa_para_rgb(cor.hex);
            const diferenca =
                Math.abs(rgb.r - cor_rgb.r) +
                Math.abs(rgb.g - cor_rgb.g) +
                Math.abs(rgb.b - cor_rgb.b);

            if (diferenca < menor_diferença) {
                menor_diferença = diferenca;
                cor_mais_proxima = cor.nome;
            }
        });

        return cor_mais_proxima || "Cor desconhecida";
    }

    return (
        <AnimatePresence>

            <motion.div className='container_visualizar_produto' ref={refencia_do_produto} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>

                {pop_de_chat_ja_adicionado && <Pop_up_conversa_adicionada />}
                {pop_de_chat_ja_adicionado && <div className='fundo_do_pop_up_conversa_adicionada'></div>}
                {pop_up_de_usuario_nao_logado && <Pop_up_usuario_nao_logado />}
                {produto_adicionado_na_sacola && <Pop_up_produto_adicionado />}
                {pop_de_chat_adicionado && <Pop_up_conversa_adicionada_sucesso />}

                <Header tipo={tipo_de_header} />

                <div className="container_voltar_para_buscar_produtos">

                    <Link to={sacola_ou_produto}><img src='./img/icons/icone_seta_esquerda.svg' />Voltar</Link>

                </div>

                <div className="container_info_do_produto">

                    <div className="container_info_do_produto_imagens">

                        <div className="container_imagens_do_produto">

                            {produto.imagem.map((url, i) => (

                                <div key={i} className='container_outras_opcoes_de_imagens' style={{ border: imagem_selecionada == i ? produto_visualiazado : `` }}>

                                    <img src={url} alt="" onClick={() => set_imagem_selecionada(i)} />

                                </div>
                            ))}

                        </div>

                        <div className="container_imagem_principal_produto">

                            <img src={produto.imagem[imagem_selecionada]} alt="" />

                        </div>

                    </div>

                    <div className="container_info_do_produto_conteudo">

                        <div className="container_info_do_produto_titulo">

                            <h1>{produto.nome}</h1>

                            <div className='container_info_brecho_do_produto'>

                                <div className='container_info_brecho_logo'>

                                    <img src={imagem_do_brecho(produto.fk_id_brecho)} alt="" onMouseEnter={() => exibir_nome_do_brecho(produto.fk_id_brecho)} onClick={() => ir_para_perfil_brecho(produto.fk_id_brecho)} onMouseLeave={() => set_exibir_nome_brecho(false)} />

                                </div>

                                <AnimatePresence>

                                    {exibir_nome_brecho &&

                                        <motion.div className='contianer_pop_up_nome_do_brecho' initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                                            <span>{nome_do_brecho}</span>

                                        </motion.div>

                                    }

                                </AnimatePresence>

                            </div>

                        </div>

                        <div className="container_info_do_produto_preco">

                            <h2>{exibir_preco(produto.preco)}</h2>

                        </div>

                        <div className="container_info_do_produto_descricao">

                            <p>{produto.descricao}</p>

                        </div>

                        <div className="container_info_do_produto_tamanho_e_cor">

                            <div className="container_info_do_produto_tamanho">

                                <h3>Tamanho</h3>

                                <div className="container_fundo_info_do_produto_tamanho">

                                    <span>{produto.tamanho}</span>

                                </div>

                            </div>

                            <div className="container_info_do_produto_quantidade">

                                <h3>Quantidade</h3>

                                <div className="container_fundo_info_do_produto_quantidade">

                                    <span>{produto.quantidade}</span>

                                </div>

                            </div>

                            <div className="container_info_do_produto_composto">

                                <h3>Tipo do tecido</h3>

                                <div className='container_fundo_info_do_produto_composto'>

                                    <span>{produto.composicao}</span>

                                </div>

                            </div>

                            <div className="container_info_do_produto_cor">

                                <h3>Cor do Tecido</h3>

                                <div className='container_fundo_info_do_produto_cor'>

                                    <div className='cor_do_produto' style={{ backgroundColor: produto.cor[0] }}></div>
                                    <span>{cor_mais_proxima(produto.cor[0])}</span>

                                </div>

                            </div>

                        </div>

                        <div className="container_info_do_produto_botoes">

                            <div className='container_botoes_do_produto'>

                                <button className='botao_comprar_produto' onClick={() => adicionar_a_sacola()}>Adicionar a Sacola</button>
                                <button className='botao_conversar_com_brecho' onClick={() => adicionar_conversa_ao_chat()}><img src="./img/icons/icone_chat.png" alt="" />Chat</button>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="container_voce_tambem_pode_gostar">

                    <div className="container_voce_tambem_pode_gostar_titulo">

                        <h2>Você tembém pode gostar</h2>

                    </div>

                    <div className="container_produtos_embaralhados">

                        {produtos_embaralhados.map((produto_embaralhado, i) => (

                            <div key={i} className='container_produto_embaralhado' onClick={() => ir_para_produto_selecionado(produto_embaralhado)}>

                                <div className="container_imagem_do_produto">

                                    <img src={produto_embaralhado.imagem[0]} alt="" />

                                </div>

                                <div className="container_produto_embaralhado_info">

                                    <div className="contianer_produto_embaralhado_titulo">

                                        <h5>{produto_embaralhado.nome}</h5>
                                        <img src={imagem_do_brecho(produto_embaralhado.fk_id_brecho)} alt="" />

                                    </div>

                                    <div className="container_produto_embaralhado_preco">

                                        <span>{exibir_preco(produto_embaralhado.preco)}</span>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>


                {usuario_logado != `` && !conversa_aberta && <Chat />}
                {conversa_aberta && <Chat_conversa />}

                <Footer />

            </motion.div>
        </AnimatePresence>
    )
}

export default Produto
