import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Sacola.css';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from "../../services/api";

function Sacola() {

    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    
    useEffect(() => {

        if(usuario_logado){

            set_sacola(usuario_logado.sacola);            
        };

    }, [usuario_logado]);

    useEffect(() => {

        buscar_brechos();

    }, []);

    async function buscar_brechos(){

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    function imagem_do_brecho(id_brecho){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == id_brecho);
        
        if(encontrar_brecho){

            return encontrar_brecho.logo;
        };
    };

    function exibir_preco(preco_produto){

        const dividir_preco = String(preco_produto).split(`.`);
        const centavos = dividir_preco[dividir_preco.length - 1];
        
        if(centavos < 10){

            return `R$${dividir_preco[0]},${centavos}0`;
        } else {

            return `R$${preco_produto}`;
        };
    };

  return (
    <div className='container_sacola'>

        <div className="container_header_sacola">

            <h1>Sacola</h1>

        </div>

        <div className="container_produtos_na_sacola">

            {sacola ? sacola.map((produto, i) => (

                <div key={i} className='container_produtos_a_exibir_sacola'>

                    <div className="container_imagem_do_produto_sacola">

                        <img src={produto.imagem[0]} alt="" />

                    </div>

                    <div className="container_info_produto_sacola">

                        <div className="container_info_produto_nome_sacola">

                            <div className="container_info_produto_quantidade_e_nome">
                            
                                <div className="container_info_produto_titulo_sacola">

                                    <h3>{produto.nome}</h3>
                                </div>

                                <div className="container_contador_de_produtos">

                                    <button className='diminuir_quantidade_de_produto'>-</button>
                                    <h5>1</h5>
                                    <button className='aumentar_quantidade_de_produto'>+</button>
                                </div>
                            
                            </div>

                            <div className="container_info_produto_preco_e_logo">

                                <img src={imagem_do_brecho(produto.fk_id_brecho)} alt="" />
                                <span className='preco_do_produto_sacola'>{exibir_preco(produto.preco)}</span>
                            
                            </div>
                            
                        
                        </div>

                    </div>

                </div>
            
            )) : <div className='nenhum_item_adicionado'> <img src="./img/icons/lupa.png" alt="" /><p>Nenhum item adicionado</p> </div>}
                
                        <div className="container_botao_da_sacola">

                            <button>Visualizar Sacola</button>

                        </div>
        </div>

    </div>
  )
}

export default Sacola
