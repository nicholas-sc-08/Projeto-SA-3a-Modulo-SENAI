import React, { useContext, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import './Clientes_dashboard.css';
import { GlobalContext } from '../contexts/GlobalContext';
import Pop_up_de_excluir from './Pop_up_de_excluir';
import Pop_up_de_notificacao_dashboard from './Pop_up_de_notificacao_dashboard';
import { useNavigate } from 'react-router-dom';

function Clientes_dashboard() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext);
  const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
  const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
  const [ barra_de_pesquisa, set_barra_de_pesquisa ] = useState(``);
  const [escolher_qual_excluir, set_escolher_qual_excluir] = useState(false);
  const [confirmar_exclusao, set_confimar_exclusao] = useState(false);
  const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useContext(GlobalContext);
  const { id_do_cliente_a_excluir, set_id_do_cliente_a_excluir } = useContext(GlobalContext);
  const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useContext(GlobalContext);
  const referencia_do_inpt = useRef(null);
  const [resultado_de_pesquisa, set_resultado_de_pesquisa] = useState([]);
  const [resultado_de_pesquisa_endereco, set_resultado_de_pesquisa_endereco] = useState([]);
  const [ids_filtrado, set_ids_filtrado] = useState(``);
  const { erro_Pagina, set_erro_pagina } = useContext(GlobalContext);
  const navegar = useNavigate(``);

  function voltar_para_o_inicio(){

    set_inicio_dashboard(true);
    set_clientes_dashboard(false);
  };

  useEffect(() => {

    const clientes_filtrados = array_clientes.filter(cliente => cliente.nome.toLowerCase().includes(barra_de_pesquisa.toLowerCase()));
    const ids = clientes_filtrados.map(cliente => cliente.id);
    const enderecos_filtrados = array_enderecos.filter(endereco => ids.includes(endereco.fk_id));
  
    set_resultado_de_pesquisa(clientes_filtrados);
    set_ids_filtrado(ids);
    set_resultado_de_pesquisa_endereco(enderecos_filtrados);
  
  }, [barra_de_pesquisa, array_clientes, array_enderecos]);
  

  async function buscar_clientes(){

    try {
      
      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);

    } catch (erro) {
      
      console.error(erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    };
  };

  async function buscar_enderecos(){

    try {
      
      const enderecos = await axios.get(`http://localhost:3000/enderecos`);
      set_array_enderecos(enderecos.data);      

    } catch (erro) {
      
      console.error(erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    };
  };

  function armazenar_id_do_cliente(id_do_cliente){

    set_abrir_pop_up_dashboard(true);
    set_id_do_cliente_a_excluir(id_do_cliente);

  };

  useEffect(() => {

    buscar_clientes();
    buscar_enderecos();
    
  }, []);

  useEffect(() => {

    setTimeout(() => {
      
      set_pop_up_notificacao_excluir_dashboard(false);

    }, 2000);

  }, [pop_up_notificacao_excluir_dashboard]);

  return (
    <div className='container_clientes_dashbord'>

        { abrir_pop_up_dashboard && <div className="container_sombra_para_visualizar_pop_up"></div>}
        { abrir_pop_up_dashboard && <Pop_up_de_excluir/>}
        { pop_up_notificacao_excluir_dashboard && <div className="container_sombra_para_visualizar_pop_up"></div>}
        { pop_up_notificacao_excluir_dashboard && <Pop_up_de_notificacao_dashboard/>}

        <div className="container_header_informacoes_tabela_alinhamento">

          <div className="container_header_informacoes_tabela">

            <div className="container_informacoes_clientes">

                <div className="sombra_dashboard_container_clientes_tabela">

                  <div className='dashboard_container_clientes_borda_tabela'>
                      
                      <div className='dashboard_container_clientes_img_tabela'>
                      
                      <img src="./img/icons/icone_dashboard_clientes_v_um.svg"  alt="Clientes" />
                        
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

        <div className="container_tabela_cliente_alinhamento">

          <div className="container_tabela_clientes">

            <div className="container_tabela_clientes_header">

              <div className="container_barra_de_pesquisa" onClick={() => referencia_do_inpt.current.focus()}>

                <img src="./img/LupaIcon.svg" alt="lupa" />
                <input type="text" placeholder="Procure pelo nome de usuário" value={barra_de_pesquisa} onChange={e => set_barra_de_pesquisa(e.target.value)}/>

              </div>

              <div className="container_excluir_usuario">

                <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira'/> : `X`}</button>

              </div>

            </div>

            <div className="container_separacao_de_informacoes_e_da_scrollbar">

              <div className="container_alinhamento_de_informacoes_tabela_clientes">

                <div className="container_titulos_da_tabela_clientes">

                  <div className="container_titulo_principal_tabela_clientes">

                    <h1>Clientes</h1>

                  </div>

                  <div className="container_titulos_informacoes_tabela_clientes">

                      <span></span>
                      <span className='titulo_dashboard_nome'>Nome de Usuário</span>
                      <span className='titulo_dashboard_email'>Email</span>
                      <span className='titulo_dashboard_telefone'>Telefone</span>
                      <span className='titulo_dashboard_cep'>CEP</span>
                      <span className='titulo_dashboard_senha'>Senha</span>

                  </div>

                </div>

                <div className="container_tabela_clientes_resultados">

                    <div className="container_sombreamento">

                      
                    </div>
                    <div className="b">
                      

                      {!barra_de_pesquisa && 

                    array_clientes.map((cliente, i) => (

                      <div key={i} className='container_colunas_serie_a'>

                        <div className="container_coluna_imagem_de_perfil_cliente">

                          <img src={cliente.imagem_de_perfil} alt="" />

                        </div>

                        <div className='container_colunas_serie_b'>

                          <div className="container_coluna_nome_cliente">

                            <span>{cliente.nome}</span>
            
                          </div>

                          <div className="container_coluna_email_cliente">

                            <span>{cliente.email}</span>
            
                          </div>

                          <div className="container_coluna_telefone_cliente">

                            <span>{cliente.telefone}</span>
            
                          </div>

                        </div>

                      </div>
                    ))}

                    {barra_de_pesquisa && resultado_de_pesquisa.map((cliente, i) => (

                      <div key={i} className='container_colunas_serie_a'>

                        <div className="container_coluna_imagem_de_perfil_cliente">

                          <img src={cliente.imagem_de_perfil} alt="" />

                        </div>

                        <div className='container_colunas_serie_b'>

                          <div className="container_coluna_nome_cliente">

                            <span>{cliente.nome}</span>
            
                          </div>

                          <div className="container_coluna_email_cliente">

                            <span>{cliente.email}</span>
            
                          </div>

                          <div className="container_coluna_telefone_cliente">

                            <span>{cliente.telefone}</span>
            
                          </div>

                        </div>

                      </div>
                    ))}

                    </div>
                    
                    <div className="c">

                    {!barra_de_pesquisa && array_enderecos.map((endereco, i) => (
                      
                      <div key={i} className='container_colunas_serie_c'>

                        <div className="container_coluna_cep_cliente">

                          <span>{endereco.cep}</span>

                        </div>
                      </div>
                    ))}

                    {barra_de_pesquisa && resultado_de_pesquisa_endereco.map((endereco, i) => (
                      
                      <div key={i} className='container_colunas_serie_c'>

                        <div className="container_coluna_cep_cliente">

                          <span>{endereco.cep}</span>

                        </div>
                      </div>
                    ))}
                    </div>

                    <div className="d">

                    {resultado_de_pesquisa && resultado_de_pesquisa.map((cliente, i) => (
                      <div key={i} className='container_colunas_serie_d'>

                        <div className="container_coluna_senha_cliente">

                          <span>{cliente.senha}</span>

                        </div>

                        {escolher_qual_excluir &&                 
                        
                        <div className="container_coluna_excluir_cliente">

                        <button onClick={() => armazenar_id_do_cliente(cliente.id)}><img src="./img/Lixeiraicon.svg" alt="" /></button>

                        </div>
                        }

                      </div>
                    ))}

                    {!resultado_de_pesquisa && array_clientes.map((cliente, i) => (
                      <div key={i} className='container_colunas_serie_d'>

                        <div className="container_coluna_senha_cliente">

                          <span>{cliente.senha}</span>

                        </div>

                        {escolher_qual_excluir &&                 
                        
                        <div className="container_coluna_excluir_cliente">

                        <button onClick={() => armazenar_id_do_cliente(cliente.id)}><img src="./img/Lixeiraicon.svg" alt="" /></button>

                        </div>
                        }

                      </div>
                    ))}

                    </div>

                </div>

              </div>
            </div>

          </div>

        </div>

    </div>
  )
}

export default Clientes_dashboard
