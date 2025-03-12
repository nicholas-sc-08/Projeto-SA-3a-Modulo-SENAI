import React, { useContext, useEffect } from 'react';
import './Clientes_dashboard.css';
import { GlobalContext } from '../contexts/GlobalContext';

function Clientes_dashboard() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
  const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
  
  const voltar_para_o_inicio = () =>{

    set_inicio_dashboard(true);
    set_clientes_dashboard(false);
  };

  return (
    <div className='container_clientes_dashbord'>
        
        <div className="container_header_informacoes_tabela_alinhamento">

          <div className="container_header_informacoes_tabela">

            <div className="container_informacoes_clientes">

                <div className="sombra_dashboard_container_clientes_tabela">

                  <div className='dashboard_container_clientes_borda_tabela'>
                      
                      <div className='dashboard_container_clientes_img_tabela'>
                      
                      <img src="./img/icone_dashboard_clientes_v_um.svg"  alt="Clientes" />
                        
                      </div>
                        
                  </div>

                </div>

                <div className="container_quantidade_de_clientes">

                  <h2>Clientes</h2>
                  <span>{array_clientes.length}</span>

                </div>

            </div>

            <div className="container_dashboard_sair" onClick={voltar_para_o_inicio}>

              <div className="container_conteudo_dashboard_sair">

                <span>Voltar</span>
                <img src="./img/icone_dashboard_sair.svg" alt="Icone sair" />

              </div>

            </div>

          </div>

        </div>

    </div>
  )
}

export default Clientes_dashboard
