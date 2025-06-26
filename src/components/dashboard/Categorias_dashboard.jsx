import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Pop_up_de_cadastrar_categoria from '../pop_up_categoria/Pop_up_de_cadastrar_categoria.jsx';
import Pop_up_de_notificacao_cadastro_categoria from '../pop_up_categoria/Pop_up_de_notificacao_cadastro_categoria.jsx';
import Pop_up_de_editar_categoria from '../pop_up_categoria/Pop_up_de_editar_categoria.jsx';
import Pop_up_de_notificacao_editar_categoria from '../pop_up_categoria/Pop_up_de_notificacao_editar_categoria.jsx';
import Pop_up_de_excluir_categoria from '../pop_up_categoria/Pop_up_de_excluir_categoria.jsx';
import Pop_up_de_notificacao_excluir_categoria from '../pop_up_categoria/Pop_up_de_notificacao_excluir_categoria.jsx';
import Header from '../Header/Header.jsx';
import api from '../../services/api.js';
import './Categorias_dashboard.css';

function Categorias_dashboard() {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
  const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);
  const { id_categoria, set_id_categoria } = useContext(GlobalContext);
  const { pop_up_de_cadastrar_categoria, set_pop_up_de_cadastrar_categoria } = useContext(GlobalContext);
  const { pop_up_notificacao_cadastro_categoria, set_pop_up_notificacao_cadastro_categoria } = useContext(GlobalContext);
  const { pop_up_de_editar_categoria, set_pop_up_de_editar_categoria } = useContext(GlobalContext);
  const { pop_up_notificacao_editar_categoria, set_pop_up_notificacao_editar_categoria } = useContext(GlobalContext);
  const { pop_up_de_excluir_categoria, set_pop_up_de_excluir_categoria } = useContext(GlobalContext);
  const { pop_up_notificacao_excluir_categoria, set_pop_up_notificacao_excluir_categoria } = useContext(GlobalContext);
  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);

  const [editar_categoria, set_editar_categoria] = useState(false);
  const [texto_da_barra_de_pesquisa, set_texto_da_barra_de_pesquisa] = useState(``);
  const [array_da_barra_de_pesquisa, set_array_da_barra_de_pesquisa] = useState([]);
  const [array_categorias_ordenado, set_array_categorias_ordenado] = useState([]);
  const [resultado_de_pesquisa, set_resultado_de_pesquisa] = useState(false);
  const [categorias_filtradas, set_categorias_filtradas] = useState(``);

  const referencia_input = useRef(null);
  const navegar = useNavigate(``);

  function voltar_para_o_inicio() {

    set_inicio_dashboard(true);
    set_categorias_dashboard(false);
  };

  async function buscar_categorias() {

    try {

      const categorias = await api(`/categorias`);
      set_categorias_dashboard(categorias.data);

    } catch (erro) {

      console.error(erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    };
  };

  useEffect(() => {
    const categorias_ordenadas = [...array_categorias].sort((primeira_categoria, categoria_seguinte) =>
      primeira_categoria.nome.localeCompare(categoria_seguinte.nome, 'pt-BR', { sensitivity: 'base' })
    );

    set_array_categorias_ordenado(categorias_ordenadas);

  }, [array_categorias])

  function clicar_em_categoria(id) {

    set_id_categoria(id);

    if (editar_categoria) {

      set_pop_up_de_editar_categoria(true);
      set_editar_categoria(false);

    } else {

      set_pop_up_de_excluir_categoria(true);
    };
  };

  useEffect(() => {

    buscar_categorias();

  }, []);

  useEffect(() => {

    for (let i = 0; i < array_da_barra_de_pesquisa.length; i++) {

      if (array_da_barra_de_pesquisa[i].toUpperCase() == texto_da_barra_de_pesquisa.toUpperCase()) {

        set_resultado_de_pesquisa(true);
      };
    };

    const filtrar_categorias = array_categorias.filter(categoria => categoria.nome.toUpperCase().includes(texto_da_barra_de_pesquisa.toUpperCase()));
    const categorias_ordenadas = [...filtrar_categorias].sort((primeira_categoria, categoria_seguinte) => primeira_categoria.nome.localeCompare(categoria_seguinte.nome, 'pt-BR', { sensitivity: 'base' }));
    set_array_categorias_ordenado(categorias_ordenadas);

  }, [texto_da_barra_de_pesquisa]);

  useEffect(() => {

    if (pop_up_notificacao_cadastro_categoria) {

      setTimeout(() => {

        set_pop_up_notificacao_cadastro_categoria(false);

      }, 2000);
    };

    if (pop_up_notificacao_editar_categoria) {


      setTimeout(() => {

        set_pop_up_notificacao_editar_categoria(false);

      }, 2000);
    };

    if (pop_up_notificacao_excluir_categoria) {

      setTimeout(() => {

        set_pop_up_notificacao_excluir_categoria(false);
      }, 2000);
    };

  }, [pop_up_notificacao_cadastro_categoria, pop_up_notificacao_editar_categoria, pop_up_notificacao_excluir_categoria]);

  return (
    <AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className='container_categorias_dashboard'>

        <Header tipo='admin' />

        {pop_up_de_cadastrar_categoria && <div className='container_escurecer_tela'></div>}
        {pop_up_de_cadastrar_categoria && <Pop_up_de_cadastrar_categoria />}

        {pop_up_notificacao_cadastro_categoria && <div className='container_escurecer_tela'></div>}
        {pop_up_notificacao_cadastro_categoria && <Pop_up_de_notificacao_cadastro_categoria />}

        {pop_up_de_editar_categoria && <div className='container_escurecer_tela'></div>}
        {pop_up_de_editar_categoria && <Pop_up_de_editar_categoria />}

        {pop_up_notificacao_editar_categoria && <div className='container_escurecer_tela'></div>}
        {pop_up_notificacao_editar_categoria && <Pop_up_de_notificacao_editar_categoria />}

        {pop_up_de_excluir_categoria && <div className='container_escurecer_tela'></div>}
        {pop_up_de_excluir_categoria && <Pop_up_de_excluir_categoria />}

        {pop_up_notificacao_excluir_categoria && <div className='container_escurecer_tela'></div>}
        {pop_up_notificacao_excluir_categoria && <Pop_up_de_notificacao_excluir_categoria />}


        <div className="container-alinhamento-imagem-titulo-categorias-dashboard">
          <div className="container-alinhamento-imagem-categorias-dashboard">
            <div className="container-alinhamento-imagem-titulo-quantidade-categorias-dashboard">
              <div className="fundo-cinza-imagem-categorias-dashboard">
                <div className="fundo-verde-imagem-categorias-dashboard">
                  <img src="./img/icons/icone_dashboard_etiqueta_v_um.svg" alt="Icone categorias dashboard" />
                </div>
              </div>

              <div className="container-alinhamento-titulo-categorias-dashboard">
                <p className='titulo-um-categorias-dashboard'>Categorias</p>
                <p className='numero-de-categorias-dashboard'>{array_categorias.length}</p>
              </div>
            </div>

            <div className="container-sair-de-categorias-dashboard" onClick={voltar_para_o_inicio}>
              <p>Voltar</p>

              <img src="./img/icone_dashboard_sair.svg" alt="ir para a tela inicial" />
            </div>
          </div>
        </div>


        <div className="container_tabela_categorias">

          <div className="container_tabela_categorias_header">

            <div className="container_tabela_categorias_header_barra_de_pesquisa" onClick={() => referencia_input.current.focus()}>

              <img src="./img/LupaIcon.svg" alt="Lupa" />
              <input type="text" placeholder='Procurar Categoria' ref={referencia_input} value={texto_da_barra_de_pesquisa} onChange={e => set_texto_da_barra_de_pesquisa(e.target.value)} />

            </div>

            <div className="container_botoes_header_categorias">


              <div className="container_tabela_categorias_header_cadastrar_categoria">

                <button onClick={() => set_pop_up_de_cadastrar_categoria(true)}>Nova Categoria</button>

              </div>

              <div className="container_tabela_categorias_header_editar_categoria">

                <button onClick={() => set_editar_categoria(!editar_categoria)}>Editar Categoria</button>

              </div>

            </div>

          </div>

          <div className="container_subtitulo_tabela_categorias">

            <h2>Categorias</h2>

          </div>

          <div className="container_de_categorias_da_tabela">

            {array_categorias_ordenado.length > 0 ? array_categorias_ordenado.map((categoria, i) => (

              <div className='container_conteudo_categoria' key={i} onClick={() => clicar_em_categoria(categoria._id)}>

                <span>{editar_categoria && "· "}{categoria.nome}</span>

              </div>
            )) : <div className='container_nenhuma_categoria'>

              <img src="./img/LupaIcon.svg" alt="" />
              <p>Nenhuma categoria encontrada</p>

            </div>}

          </div>

        </div>

      </motion.div>

    </AnimatePresence>
  )
}

export default Categorias_dashboard
