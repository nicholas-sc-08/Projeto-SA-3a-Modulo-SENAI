import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Filtro_de_pesquisa from '../../components/filtro_de_pesquisa/Filtro_de_pesquisa';
import api from '../../services/api';
import Chat from '../../components/chat/Chat';
import Chat_conversa from '../../components/chat/Chat_conversa';
import './Pesquisa_de_produtos.css';

function Pesquisa_de_produtos() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { array_marcas, set_array_marcas } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
    const { pagina_atual, set_pagina_atual } = useContext(GlobalContext);
    const { id_categoria_selecionada, set_id_categoria_selecionada } = useContext(GlobalContext);
    const { id_marca_selecionada, set_id_marca_selecionada } = useContext(GlobalContext);
    const { sacola_aberta, set_sacola_aberta } = useContext(GlobalContext);
    const { sacola_ou_produto, set_sacola_ou_produto } = useContext(GlobalContext);
    const [produtos_embaralhados, set_produtos_embaralhados] = useState([]);
    const navegar_para_produto = useNavigate(null);
    const referencia_pesquisa_produtos = useRef(null);

    const location = useLocation();

    function obterQueryDaUrl() {
        const params = new URLSearchParams(location.search);
        return {
            query: params.get('query') || '',
            categoria: params.get('categoria') || '',
            marca: params.get('marca') || ''
        };
    }

    const { query, categoria, marca } = obterQueryDaUrl();
    const termoBuscado = query.toLowerCase();

    useEffect(() => {

        set_sacola_ou_produto(`/buscarProdutos`);

    }, []);

    useEffect(() => {

        buscar_produtos();
        buscar_categorias();
        buscar_brechos();
        buscar_marcas()

    }, [termoBuscado]);

    useEffect(() => {
        let produtos_filtrados = [...array_produtos];

        if (categoria) {
            produtos_filtrados = produtos_filtrados.filter(
                (p) => p.fk_id_categoria === categoria
            );
        }

        if (marca) {
            produtos_filtrados = produtos_filtrados.filter(
                (p) => p.fk_id_marca === marca
            );
        }

        if (query) {
            produtos_filtrados = produtos_filtrados.filter(
                (p) =>
                    p.nome?.toLowerCase().includes(termoBuscado) ||
                    p.descricao?.toLowerCase().includes(termoBuscado)
            );
        }

        const embaralhados = produtos_filtrados.sort(() => Math.random() - 0.5);
        set_produtos_embaralhados(embaralhados);

        referencia_pesquisa_produtos.current?.scrollIntoView();
    }, [array_produtos, categoria, marca, query]);



    const produtos_por_pagina = 12;
    const total_de_paginas = Math.ceil(produtos_embaralhados.length / produtos_por_pagina);

    useEffect(() => {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

        if (encontrar_brecho) {

            set_tipo_de_header(`brecho`);

        } else {

            set_tipo_de_header(`usuario`);
        };

        set_pagina_atual(1);
        set_sacola_aberta(false);

    }, []);

    async function buscar_categorias() {

        try {

            const categorias = await api.get(`/categorias`);
            set_array_categorias(categorias.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_brechos() {

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_marcas() {

        try {

            const marcas = await api.get(`/marcas`);
            set_array_marcas(marcas.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_produtos() {
        try {
            const res = await api.get(`/produtos`);
            const todos = res.data;

            let filtrados = [...todos];

            if (query) {
                filtrados = filtrados.filter(produto =>
                    produto.nome?.toLowerCase().includes(termoBuscado) ||
                    produto.descricao?.toLowerCase().includes(termoBuscado)
                );
            }

            if (categoria) {
                filtrados = filtrados.filter(produto => produto.fk_id_categoria === categoria);
            }

            if (marca) {
                filtrados = filtrados.filter(produto => produto.fk_id_marca === marca);
            }

            set_array_produtos(filtrados);

        } catch (erro) {
            console.error(erro);
        }
    }


    function ir_para_produto(produto) {

        set_produto(produto);
        navegar_para_produto(`/produto`);
    };

    function preco_do_produto(preco) {

        const preco_final = preco.toFixed(2).replace(`.`, `,`);

        return `R$${preco_final}`;
    };

    function imagem_de_perfil_brecho(_id) {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if (encontrar_brecho) {

            return encontrar_brecho.logo;
        };
    };

    return (

        <AnimatePresence>

            <motion.div className='container-alinhamento-all-pages' ref={referencia_pesquisa_produtos} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                <Header tipo={tipo_de_header} />

                <div className="container_conteudo_pesquisa_produtos">

                    <div className="all-page-informacoes-alinhamento">
                        <Filtro_de_pesquisa />
                    </div>

                    <div className="alinhamento-resultados-pesquisa">

                        <div className="alinhamento-resultados-de-pesquisa-texto">
                            <h3 className='resultados-de-pesquisa'>Resultados para: <span>
                                "
                                {query ||
                                    (categoria && array_categorias.find(c => c._id === categoria)?.nome) ||
                                    (marca && array_marcas.find(m => m._id === marca)?.nome) ||
                                    'Todos os produtos'}
                                "
                            </span></h3>
                        </div>

                        <div className="container_exibir_produtos">

                            {produtos_embaralhados.length > 0 ? produtos_embaralhados.slice((pagina_atual - 1) * produtos_por_pagina, pagina_atual * produtos_por_pagina).map((produto, i) => (

                                <div key={i} className='container_produto' onClick={() => ir_para_produto(produto)}>

                                    <div className="container_produto_img">

                                        <img src={produto.imagem[0]} alt="aa" />

                                    </div>

                                    <div className="container_produto_info">

                                        <div className='container_produto_titulo'>

                                            <h2>{produto.nome}</h2>
                                            <img src={imagem_de_perfil_brecho(produto.fk_id_brecho)} alt="" />

                                        </div>

                                        <span>{preco_do_produto(produto.preco)}</span>

                                    </div>

                                </div>
                            )) : <div className='container_nenhum_produto_buscar'><img src='./img/Sacola_pesquisar_produtos.svg' alt='produtos' /><p>Não encontramos nenhum produto correspondente à sua pesquisa. Experimente usar outros termos ou alterar os filtros!</p></div>}

                        </div>

                    </div>

                </div>

                {produtos_embaralhados.length > 0 ?

                    <div className="container_botoes_de_paginas">

                        <div className="container_alinhamento_do_conteudo_de_paginas">

                            <div className="container_botao_voltar_pagina_esquerdo">

                                <button disabled={pagina_atual == 1} onClick={() => { set_pagina_atual(pagina => Math.max(pagina - 1, 1)); referencia_pesquisa_produtos.current.scrollIntoView() }}><img src='./img/icons/icone_seta_esquerda.svg' /></button>

                            </div>

                            <div className="container_numero_de_paginas">

                                <span>{pagina_atual} de {total_de_paginas}</span>

                            </div>

                            <div className="container_botao_voltar_pagina_direito">

                                <button disabled={pagina_atual == total_de_paginas} onClick={() => { set_pagina_atual(pagina => Math.min(pagina + 1, total_de_paginas)); referencia_pesquisa_produtos.current.scrollIntoView() }}><img src='./img/icons/icone_seta_direita.svg' /></button>

                            </div>

                        </div>

                    </div>
                    : ``}

                {usuario_logado != `` && !conversa_aberta && <Chat />}
                {conversa_aberta && <Chat_conversa />}

                <Footer />
            </motion.div>
        </AnimatePresence>
    )
}

export default Pesquisa_de_produtos
