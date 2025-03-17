import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import './Categorias_dashboard.css';

function Categorias_dashboard() {

  const { array_categorias, set_array_categorias } = useContext(GlobalContext);

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

              <div className="container_header_voltar">

                <span>Voltar</span>
                <img src="./img/icone_dashboard_sair.svg" alt="" />

              </div>

            </div>

        </div>

    </div>
  )
}

export default Categorias_dashboard
