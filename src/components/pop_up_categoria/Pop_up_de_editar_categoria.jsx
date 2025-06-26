import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import './Pop_up_de_editar_categoria.css';


function Pop_up_de_editar_categoria({ id_da_categoria }) {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { id_categoria, set_id_categoria } = useContext(GlobalContext);
  const { pop_up_de_editar_categoria, set_pop_up_de_editar_categoria } = useContext(GlobalContext);
  const [categoria, set_categoria] = useState({ nome: `` });
  const { pop_up_notificacao_editar_categoria, set_pop_up_notificacao_editar_categoria } = useContext(GlobalContext);
  const [erro, set_erro] = useState(false);
  const [mensagem_de_erro, set_mensagem_de_erro] = useState(`Categoria já existente!`);

  async function buscar_categorias() {

    try {

      const categorias = await api.get(`/categorias`);
      set_array_categorias(categorias.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function editar_categoria() {

    try {


      const encontrar_categoria = array_categorias.findIndex(categori => categori.nome.toUpperCase() == categoria.nome.toUpperCase());

      if (encontrar_categoria == -1) {

        await api.put(`/categorias/${id_categoria}`, categoria);
        buscar_categorias();
        set_pop_up_notificacao_editar_categoria(true);
        set_pop_up_de_editar_categoria(false);

      } else {

        set_erro(true);
      };

    } catch (erro) {

      console.error(erro);
    };
  };

  return (
    <div className='container_pop_up_cadastro_de_categoria_edicao'>

      <div className="container_pop_up_categoria_edicao">

        <div className="container-imagem-degrade"></div>

        <div className="container_pop_up_categoria_conteudo_edicao">

          <div className="container_alinhamento_botao_sair_edicao">

            <button onClick={() => set_pop_up_de_editar_categoria(false)} className='botao_de_sair_categoria_edicao'><img src="./img/Botao_sair_cadastro_categoria.svg" alt="" /></button>

          </div>

          <div className="container-titulo-cadastrar-marca">
            <h2>Editar categoria</h2>

            <div className="titulo-line-cadastrar-marca"></div>

            <p>Edite uma categoria já existente para organizar seus itens com facilidade!</p>
          </div>


          <div className="container_alinhamento_formulario">

            <div className="container-alinhamento-input-editar-categoria">
              <label> Novo nome da categoria</label>
              <input type="text" placeholder="Insira o novo nome para a categoria" value={categoria.nome} onChange={e => set_categoria({ ...categoria, nome: e.target.value })} />
            </div>

            <div className="container_botao_categoria_edicao">

              <p>{erro && mensagem_de_erro}</p>
              <button className='botao_categoria_edicao' onClick={editar_categoria}>Cadastrar</button>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Pop_up_de_editar_categoria