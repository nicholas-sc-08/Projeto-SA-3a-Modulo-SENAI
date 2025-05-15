import React, { useContext, useEffect } from 'react';
import './Pesquisa_de_produtos.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Filtro_de_pesquisa from '../../components/Filtro_de_pesquisa';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Pesquisa_de_produtos() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const navegar_para_produto = useNavigate(null);

    useEffect(() => {

        buscar_produtos();

    }, []);

    async function buscar_produtos(){

        try {
            
            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    function ir_para_produto(produto){

        navegar_para_produto(`/produto`);
    };

    return (
        <div className='container-alinhamento-all-pages'>
            <Header tipo='usuario' />

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

                                <h2>{produto.nome}</h2>
                                <span>R${produto.preco}</span>
                            
                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Pesquisa_de_produtos
