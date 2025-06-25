import React from 'react';
import './Pop_up_de_excluir_categoria.css';
import { useEffect } from 'react';
import { useContext } from 'react';
import api from '../../services/api';
import { GlobalContext } from '../../contexts/GlobalContext';

function Pop_up_de_excluir_categoria() {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { pop_up_de_excluir_categoria, set_pop_up_de_excluir_categoria } = useContext(GlobalContext);
  const { id_categoria, set_id_categoria } = useContext(GlobalContext);
  const { pop_up_notificacao_excluir_categoria, set_pop_up_notificacao_excluir_categoria } = useContext(GlobalContext);

  async function buscar_categorias(){

    try {
      
      const categorias = await api.get(`/categorias`);
      set_array_categorias(categorias.data);

    } catch (erro) {
      
      console.error(erro);
    };
  };

  async function excluir_categoria() {    

    try {
      
      await api.delete(`/categorias/${id_categoria}`);
      buscar_categorias();
      set_pop_up_notificacao_excluir_categoria(true);
      set_pop_up_de_excluir_categoria(false);

    } catch (erro) {
      
      console.error(erro);
    };
  };


  return (
    <div className='container_pop_up_de_excluir'>

        <div className="pop_up_de_excluir">

            <img src="./img/Ponto_de_interrogacao.svg" alt="" />
            <p>Tem certeza que deseja excluir essa categoria?</p>

            <div className="pop_up_de_excluir_botoes">

                <button className='pop_up_de_excluir_botao_sair' onClick={() => set_pop_up_de_excluir_categoria(false)}>Sair</button>
                <button className='pop_up_de_excluir_botao_excluir' onClick={excluir_categoria}>Excluir</button>
            </div>

        </div>

    </div>
  )
}

export default Pop_up_de_excluir_categoria