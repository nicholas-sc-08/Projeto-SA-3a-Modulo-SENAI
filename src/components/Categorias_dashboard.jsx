import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import './Categorias_dashboard.css';
import Pop_up_de_cadastrar_categoria from './Pop_up_de_cadastrar_categoria.jsx';

function Categorias_dashboard() {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
  const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);
  const { pop_up_de_cadastrar_categoria, set_pop_up_de_cadastrar_categoria } = useContext(GlobalContext);
  
  const referencia_input = useRef(null);

  function voltar_para_o_inicio(){

    set_inicio_dashboard(true);
    set_categorias_dashboard(false);
  };

  function abrir_pop_up_de_cadastro(){

    set_pop_up_de_cadastrar_categoria(true);
  };

  return (
    <div className='container_categorias_dashboard'>

      {pop_up_de_cadastrar_categoria && <Pop_up_de_cadastrar_categoria/>}
      {pop_up_de_cadastrar_categoria && <div className='container_escurecer_tela'></div>}
      
        <div className="container_header_categorias_dashboard">

            <div className="container_header_contador_categorias">

                <div className="container_contador_categorias">

                  <div className="container_contador_sombreamento_categorias">

                    <div className="container_contador_img_categorias">

                      <img src="./img/icons/icone_dashboard_etiqueta_v_um.svg" alt="etiqueta" />

                    </div>

                  </div>

                  <div className="container_contador_categorias_titulo">

                    <h2>Categorias</h2>
                    <span>{array_categorias.length}</span>
                  
                  </div>

                </div>

            </div>

            <div className="container_header_voltar_para_inicio">

              <div className="container_header_voltar" onClick={voltar_para_o_inicio}>

                <span>Voltar</span>
                <img src="./img/icone_dashboard_sair.svg" alt="sair" />

              </div>

            </div>

        </div>

        <div className="container_tabela_categorias">

          <div className="container_tabela_categorias_header">

            <div className="container_tabela_categorias_header_barra_de_pesquisa" onClick={() => referencia_input.current.focus()}>

              <img src="./img/LupaIcon.svg" alt="Lupa" />
              <input type="text" placeholder='Procurar Categoria' ref={referencia_input}/>

            </div>

            <div className="container_botoes_header_categorias">


              <div className="container_tabela_categorias_header_cadastrar_categoria">

                <button onClick={abrir_pop_up_de_cadastro}>Nova Categoria</button>
                
              </div>

              <div className="container_tabela_categorias_header_editar_categoria">

                <button>Editar Categoria</button>
                
              </div>

            </div>
          
          </div>

          <div className="container_subtitulo_tabela_categorias">

            <h2>Categorias</h2>

          </div>

          <div className="container_de_categorias_da_tabela">

            {array_categorias.map((categoria, i) => (

              <div className='container_conteudo_categoria' key={i}>

                <span>{categoria.nome}</span>

              </div>
            ))}

          </div>

        </div>

    </div>
  )
}

export default Categorias_dashboard
