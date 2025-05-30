import React, { useContext, useEffect } from 'react';
import './Pesquisa_de_produtos.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Filtro_de_pesquisa from '../../components/Filtro_de_pesquisa';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import Chat_conversa from '../../components/chat/Chat_conversa';

function Pesquisa_de_produtos() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);
    const navegar_para_produto = useNavigate(null);

    useEffect(() => {

        buscar_produtos();
        buscar_brechos();

    }, []);

    useEffect(() => {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

        if(encontrar_brecho){

            set_tipo_de_header(`brecho`);

        } else {

            set_tipo_de_header(`usuario`);
        };

    }, []);

    async function buscar_brechos(){

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_produtos(){

        try {
            
            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    function ir_para_produto(produto){

        set_produto(produto);
        navegar_para_produto(`/produto`);
    };

    function preco_do_produto(preco){

        const preco_separado = String(preco).split(`.`);
        const decimal = preco_separado[preco_separado.length -1];

        return decimal < 10 ? `${preco_separado[0]},${decimal}0 ` : `${preco_separado[0]},${decimal}`;
    };

    function imagem_de_perfil_brecho(_id){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);
        
        if(encontrar_brecho){

            return encontrar_brecho.logo;
        };
    };

    return (
        <div className='container-alinhamento-all-pages'>
            <Header tipo={tipo_de_header} />

            <div className="container_conteudo_pesquisa_produtos">

                <div className="all-page-informacoes-alinhamento">
                    <Filtro_de_pesquisa />
                </div>

                <div className="container_exibir_produtos">

                    {array_produtos.map((produto, i) => (
                        
                        <div key={i} className='container_produto' onClick={() => ir_para_produto(produto)}>
                            
                            <div className="container_produto_img">

                                <img src={produto.imagem[0]} alt="aa" />

                            </div>

                            <div className="container_produto_info">

                                <div className='container_produto_titulo'>

                                    <h2>{produto.nome}</h2>
                                    <img src={imagem_de_perfil_brecho(produto.fk_id_brecho)} alt="" />

                                </div>
                                
                                <span>R${preco_do_produto(produto.preco)}</span>
                            
                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <div className="container_botoes_de_paginas">

                <div className="container_alinhamento_do_conteudo_de_paginas">

                    <div className="container_botao_voltar_pagina_esquerdo">

                        <button><img src='./img/icons/icone_seta_esquerda.svg'/></button>

                    </div>

                    <div className="container_numero_de_paginas">

                    <span>a</span>

                    </div>

                    <div className="container_botao_voltar_pagina_direito">

                        <button><img src='./img/icons/icone_seta_direita.svg'/></button>

                    </div>

                </div>

            </div>

            {usuario_logado != `` && !conversa_aberta && <Chat />}
            {conversa_aberta && <Chat_conversa />}

            <Footer />
        </div>
    )
}

export default Pesquisa_de_produtos
