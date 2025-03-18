import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import './Categorias_dashboard.css';

function Categorias_dashboard() {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);
  const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
  const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);

  function voltar_para_o_inicio(){

    set_inicio_dashboard(true);
    set_categorias_dashboard(false);
  };  

  return (
    <div className='container_categorias_dashboard'>
      
        <div className="container_header_categorias_dashboard">

            <div className="container_header_contador_categorias">

                <div className="container_contador_categorias">

                  <div className="container_contador_sombreamento_categorias">

                    <div className="container_contador_img_categorias">

                      <img src="./img/icons/icone_dashboard_etiqueta_v_um.svg" alt="" />

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
                <img src="./img/icone_dashboard_sair.svg" alt="" />

              </div>

            </div>

        </div>

        <div className="container_tabela_categorias">

          <div className="container_tabela_categorias_header">

            <div className="container_tabela_categorias_header_barra_de_pesquisa">

              <img src="./img/LupaIcon.svg" alt="Lupa" />
              <input type="text" placeholder='Procurar Categoria'/>

            </div>

            <div className="container_botoes_header_categorias">


              <div className="container_tabela_categorias_header_cadastrar_categoria">

                <button>Nova Categoria</button>
                
              </div>

              <div className="container_tabela_categorias_header_editar_categoria">

                <button>Editar Categoria</button>
                
              </div>

            </div>
          
          </div>

          <div className="container_subtitulo_tabela_categorias">

            <h2>Categorias</h2>

          </div>

        </div>

    </div>
  )
}

export default Categorias_dashboard
