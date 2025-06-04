import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Sacola.css';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from "../../services/api";

function Sacola() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    const [ produtos_exibido_na_sacola, set_produtos_exibido_na_sacola ] = useState([]);

    
    useEffect(() => {

        if(usuario_logado){

            set_sacola(usuario_logado.sacola);            
            exibir_produtos_na_sacola();
        };
        
        console.log(sacola);

    }, [usuario_logado]);

    useEffect(() => {

        buscar_brechos();
        buscar_clientes();

    }, []);

    async function buscar_brechos(){

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_clientes(){

        try {

            const clientes = await api.get(`/clientes`);
            set_array_clientes(clientes.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function diminuir_produto(produto_selecionado){

        try {
                const encontrar_cliente = array_clientes.find(cliente => cliente._id == usuario_logado._id);
                const produto_atualizado = {...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada -= 1};
                const encontrar_index_produto = usuario_logado.sacola.indexOf(produto_selecionado);

                if(produto_atualizado.quantidade_selecionada == 0){

                    const usuario_logado_atualizado = {...usuario_logado, sacola: usuario_logado.sacola.splice(encontrar_index_produto, 1)};

                    if(encontrar_cliente){

                        await api.put(`/clientes/${usuario_logado_atualizado._id}`, usuario_logado_atualizado);
                    } else {
    
                        await api.put(`/brechos/${usuario_logado_atualizado._id}`, usuario_logado_atualizado);
                    };
                   
                    set_usuario_logado(usuario_logado_atualizado);

                } else {
                    
                    const usuario_logado_atualizado = {...usuario_logado, sacola: usuario_logado.sacola.splice(encontrar_index_produto, 1, produto_atualizado)};
                    
                    if(encontrar_cliente){

                        await api.put(`/clientes/${usuario_logado_atualizado._id}`, usuario_logado_atualizado);
                    } else {
    
                        await api.put(`/brechos/${usuario_logado_atualizado._id}`, usuario_logado_atualizado);
                    };
                   
                    set_usuario_logado(usuario_logado_atualizado);
                };                
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function aumentar_produto(produto_selecionado){

        try {
                const encontrar_cliente = array_clientes.find(cliente => cliente._id == usuario_logado._id);
                const produto_atualizado = {...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada += 1};
                const encontrar_index_produto = usuario_logado.sacola.indexOf(produto_selecionado);
                const usuario_logado_atualizado = {...usuario_logado, sacola: usuario_logado.sacola.splice(encontrar_index_produto, 1, produto_atualizado)};
                console.log(usuario_logado_atualizado);
                
                if(encontrar_cliente){

                    await api.put(`/clientes/${usuario_logado_atualizado._id}`, usuario_logado_atualizado);
                } else {

                    await api.put(`/brechos/${usuario_logado_atualizado._id}`, usuario_logado_atualizado);
                };

                set_usuario_logado(usuario_logado_atualizado);

                
        } catch (erro) {
          
            console.error(erro);
        };
    };

    function exibir_produtos_na_sacola(){

        if(sacola.length > 3){

            const produtos_exibidos = sacola.slice(0, 3);
            set_produtos_exibido_na_sacola(produtos_exibidos);

        } else {

            set_produtos_exibido_na_sacola(sacola);
        };
    };

    function imagem_do_brecho(id_brecho){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == id_brecho);
        
        if(encontrar_brecho){

            return encontrar_brecho.logo;
        };
    };

    function exibir_preco(produto_selecionado){

        const dividir_preco = String(produto_selecionado.preco * produto_selecionado.quantidade_selecionada).split(`.`);
        const centavos = dividir_preco[dividir_preco.length - 1];
        
        
        if(centavos < 10){

            return `R$${dividir_preco[0]},${centavos}0`;
        } else {

            return `R$${produto_selecionado.preco},${centavos}`;
        };
    };

  return (
    <div className='container_sacola'>

        <div className="container_header_sacola">

            <h1>Sacola</h1>

        </div>

        <div className="container_produtos_na_sacola">

            {sacola.length > 0 ? produtos_exibido_na_sacola.map((produto, i) => (

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

                            <button>Visualizar Sacola</button>

                        </div>

    </div>
  )
}

export default Sacola
