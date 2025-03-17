import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import "./Pop_up_de_excluir.css";
import { GlobalContext } from '../contexts/GlobalContext';
import axios from 'axios';

function Pop_up_de_excluir() {

  const { id_do_cliente_a_excluir, set_id_do_cliente_a_excluir } = useContext(GlobalContext);
  const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useContext(GlobalContext);
  const { array_clientes, set_array_clientes } = useContext(GlobalContext); 
  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext); 
  const { fk_id, set_fk_id } = useState(``);
  const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useContext(GlobalContext);

  async function buscar_clientes(){

    try {
      
      const clientes = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(clientes.data);

    } catch (erro) {
      
      console.error(erro);
    };
  };

  async function buscar_enderecos(){

    try {
      
      const enderecos = await axios.get(`http://localhost:3000/enderecos`);
      set_array_enderecos(enderecos.data);

    } catch (erro) {
      
      console.error(erro);
    };
  };

  async function excluir_endereco(id){

    try {
      
      const endereco_a_excluir = await axios.delete(`http://localhost:3000/enderecos/${id}`);
      excluir_cliente(id);

    } catch (erro) {
      
      console.error(erro);
    };
  };

  async function excluir_cliente(id){

    try {
      
      const cliente_a_excluir = await axios.delete(`http://localhost:3000/clientes/${id}`);
      buscar_clientes();
      buscar_enderecos();
      set_abrir_pop_up_dashboard(false);
      set_pop_up_notificacao_excluir_dashboard(true);

    } catch (erro) {
      
      console.error(erro);
    };
  };

  useEffect(() => {

    buscar_clientes();
    buscar_enderecos();

  }, []);

  return (
    <div className='container_pop_up_de_excluir'>

        <div className="pop_up_de_excluir">

            <img src="./img/Ponto_de_interrogacao.svg" alt="" />
            <p>Tem certeza que deseja excluir  essa conta de usuário?</p>

            <div className="pop_up_de_excluir_botoes">

                <button className='pop_up_de_excluir_botao_sair' onClick={() => set_abrir_pop_up_dashboard(false)}>Sair</button>
                <button className='pop_up_de_excluir_botao_excluir' onClick={() => excluir_endereco(id_do_cliente_a_excluir)}>Excluir</button>
            </div>

        </div>

    </div>
  )
}

export default Pop_up_de_excluir