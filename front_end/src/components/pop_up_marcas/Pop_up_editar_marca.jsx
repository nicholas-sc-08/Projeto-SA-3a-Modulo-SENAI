import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import './Pop_up_editar_marca.css'

function Pop_up_editar_marca() {

  const { array_marcas, set_array_marcas } = useContext(GlobalContext)
  const { id_marca, set_id_marca } = useContext(GlobalContext);
  const { pop_up_editar_marca, set_pop_up_editar_marca } = useContext(GlobalContext);
  const { pop_up_notificacao_editar_marca, set_pop_up_notificacao_editar_marca } = useContext(GlobalContext)
  const [marca, set_marca] = useState({ nome: `` });

  const [erro, set_erro] = useState(false);
  const [mensagem_de_erro, set_mensagem_de_erro] = useState(`Marca já existente!`);

  async function buscar_marcas() {

    try {

      const marcas = await api.get(`/marcas`);
      set_array_marcas(marcas.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function editar_marca() {

    try {

      const encontrar_marca = array_marcas.findIndex(m => m.nome.toUpperCase() === marca.nome.toUpperCase() && m.id !== id_marca);

      if (encontrar_marca == -1) {

        await api.put(`/marcas/${id_marca}`, marca);
        buscar_marcas();
        set_pop_up_notificacao_editar_marca(true);
        console.log('marca cadastrada', marca)
        set_pop_up_editar_marca(false);

      } else {

        set_erro(true);
      };

    } catch (erro) {

      console.error(erro);
    };
  };

  return (
    <div>
      <div className='container_pop_up_cadastro_de_marca_edicao'>

        <div className="container_pop_up_categoria_edicao">

          <div className="container-imagem-degrade"></div>

          <div className="container_pop_up_categoria_conteudo_edicao">

            <div className="container_alinhamento_botao_sair_edicao">

              <button onClick={() => set_pop_up_editar_marca(false)} className='botao_de_sair_categoria_edicao'><img src="./img/Botao_sair_cadastro_categoria.svg" alt="" /></button>

            </div>

            <div className="container-titulo-cadastrar-marca">
              <h2>Editar marca</h2>

              <div className="titulo-line-cadastrar-marca"></div>

              <p>Edite uma marca já existente para organizar seus itens com facilidade!</p>
            </div>


            <div className="container_alinhamento_formulario">

              <div className="container-alinhamento-input-editar-categoria">
                <label> Novo nome da marca</label>
                <input type="text" placeholder="Insira o novo nome para a categoria" value={marca.nome} onChange={e => set_marca({ ...marca, nome: e.target.value })} />
              </div>

              <div className="container_botao_categoria_edicao">

                <p>{erro && mensagem_de_erro}</p>
                <button className='botao_categoria_edicao' onClick={editar_marca}>Cadastrar</button>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Pop_up_editar_marca
