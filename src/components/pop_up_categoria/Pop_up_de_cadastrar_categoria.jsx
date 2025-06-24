import React, { useContext, useEffect, useState } from 'react';
import './Pop_up_de_cadastrar_categoria.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Pop_up_de_cadastrar_categoria() {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { pop_up_de_cadastrar_categoria, set_pop_up_de_cadastrar_categoria } = useContext(GlobalContext);
  const { pop_up_notificacao_cadastro_categoria, set_pop_up_notificacao_cadastro_categoria } = useContext(GlobalContext);
  const [categoria_a_cadastrar, set_categoria_a_cadastrar] = useState({ nome: ``, sub_categoria: false });
  const [mensagem_de_erro, set_mensagem_de_erro] = useState(`Categoria já cadastrada!`);
  const [erro, set_erro] = useState(false);
  const [valor_checkbox, set_valor_checkbox] = useState(``);
  const [categorias_primarias, set_categorias_primarias] = useState([]);

  useEffect(() => {

    buscar_categorias();

  }, []);

  async function buscar_categorias() {

    try {

      const categorias = await api.get(`/categorias`);
      set_array_categorias(categorias.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function cadastrar_categoria() {

    try {

      const encontrar_categoria_cadastrada = array_categorias.findIndex(categoria => categoria.nome.toUpperCase() == categoria_a_cadastrar.nome.toUpperCase() && categoria.sub_categoria == categoria_a_cadastrar.sub_categoria);

      if (encontrar_categoria_cadastrada == -1) {

        await api.post(`/categorias`, categoria_a_cadastrar);
        set_pop_up_de_cadastrar_categoria(false);
        set_erro(false);
        buscar_categorias();
        set_pop_up_notificacao_cadastro_categoria(true);

      } else {

        set_erro(true);
      };

    } catch (erro) {

      console.error(erro);
    };
  };

  return (
    <div className='container-alinhamento-pop-up-marcas'>

      <div className="container-pup-up-marcas">

        <div className="container-imagem-degrade"></div>

        <div className="container-cadastrar-marca">

          <div className="alinhamento-button-sair-pop-up">

            <button onClick={() => set_pop_up_de_cadastrar_categoria(false)} className='botao_de_sair_categoria'><img src="./img/Botao_sair_cadastro_categoria.svg" alt="" /></button>

          </div>

          <div className="container-titulo-cadastrar-marca">

            <h2>Cadastrar Categoria</h2>

            <div className="titulo-line-cadastrar-marca"></div>

            <p>Crie uma nova categoria para organizar seus itens com facilidade!</p>

          </div>


          <div className="container_alinhamento_formulario">

            <div className="container-alinhamento-input-cadastrar-categoria">
              <label>Nome da Categoria</label>
              <input type="text" placeholder={valor_checkbox ? `Insira o nome da sub categoria` : `Insira o nome da categoria`} value={categoria_a_cadastrar.nome} onChange={e => set_categoria_a_cadastrar({ ...categoria_a_cadastrar, nome: e.target.value })} />
            </div>

            <div className="container_checkbox_cadastrar_categoria">

              <input type="checkbox" className='checkbox_cadastro_de_categoria' name="" id="" value={valor_checkbox} onChange={e => set_valor_checkbox(e.target.checked)} />
              <p>Sub categoria?</p>
            </div>

            <div className="container_botao_cadastrar_categoria">

              <p>{erro && mensagem_de_erro}</p>
              <button className='botao_cadastrar_categoria' onClick={cadastrar_categoria}>Cadastrar</button>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Pop_up_de_cadastrar_categoria
