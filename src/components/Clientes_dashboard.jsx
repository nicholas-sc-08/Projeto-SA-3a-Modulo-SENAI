import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import './Clientes_dashboard.css';
import { GlobalContext } from '../contexts/GlobalContext';

function Clientes_dashboard() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext);
  const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
  const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
  const [ barra_de_pesquisa, set_barra_de_pesquisa ] = useState(``);
  const [escolher_qual_excluir, set_escolher_qual_excluir] = useState(false);
  

  function voltar_para_o_inicio(){

    set_inicio_dashboard(true);
    set_clientes_dashboard(false);
  };

  function enter_na_barra_de_pesquisa(e){

    if(e.key === "Enter"){

      alert("sadasd");
    };
  };

  async function buscar_clientes(){

    try {
      
      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);

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

  useEffect(() => {

    buscar_clientes();
    buscar_enderecos();
    
  }, []);

  useEffect(() => {

    console.log(array_enderecos);
    

  }, [array_enderecos]);


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

        <div className="container_tabela_clientes">

          <div className="container_tabela_clientes_header">

            <div className="container_barra_de_pesquisa">

              <img src="./img/LupaIcon.svg" alt="lupa" />
              <input type="text" onKeyDown={e => enter_na_barra_de_pesquisa(e)} placeholder="Procurar Usuário" value={barra_de_pesquisa} onChange={e => set_barra_de_pesquisa(e.target.value)}/>

            </div>

            <div className="container_excluir_usuario">

              <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira'/> : `X`}</button>

            </div>

          </div>

          <div className="container_tabela_clientes_resultados">

            

            {array_clientes.map((cliente, i) => (

              <div key={i}>

                <div className="container_coluna_imagem_de_perfil_cliente">

                  <img src={cliente.imagem_de_perfil} alt="" />

                </div>

                <div className="container_coluna_nome_cliente">

                  <p>Nome:{cliente.nome}</p>
  
                </div>

                <div className="container_coluna_email_cliente">

                  <p>Email:{cliente.email}</p>
  
                </div>

                <div className="container_coluna_telefone_cliente">

                  <p>Telefone: {cliente.telefone}</p>
  
                </div>

              </div>
            ))}

            {array_enderecos.map((endereco, i) => (

              <div key={i}>

                <div className="container_coluna_cep_cliente">

                  <p>CEP:{endereco.cep}</p>

                </div>
              </div>
            ))}

            {array_clientes.map((cliente, i) => (
              <div key={i}>

                <div className="container_coluna_senha_cliente">

                  <p>Senha:{cliente.senha}</p>

                </div>

                {escolher_qual_excluir &&                 
                
                <div className="container_coluna_excluir_cliente">

                <button><img src="./img/Lixeira_icon_v_dois.svg" alt="" /></button>

                </div>
                }

              </div>
            ))}

          </div>

        </div>

    </div>
  )
}

export default Clientes_dashboard
