import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import Secao_inputs_um from '../../components/cadastro_cliente/Cadastro_cliente_secao_inputs_um.jsx';
import Secao_inputs_dois from '../../components/cadastro_cliente/Cadastro_cliente_secao_inputs_dois.jsx';
import Secao_inputs_tres from '../../components/cadastro_cliente/Cadastro_cliente_secao_inputs_tres.jsx';
import axios from 'axios';
import api from '../../services/api.js';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

function Cadastro_cliente() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { form_de_cadastro_cliente } = useContext(GlobalContext);
  const { endereco_do_cliente } = useContext(GlobalContext);
  const { cadastro_parte_um_cliente, set_cadastro_parte_um_cliente } = useContext(GlobalContext);
  const { cadastro_parte_dois_cliente, set_cadastro_parte_dois_cliente } = useContext(GlobalContext);
  const { cadastro_parte_tres_cliente, set_cadastro_parte_tres_cliente } = useContext(GlobalContext);
  const [exibir_botao_de_cadastro, set_exibir_botao_de_cadastro] = useState(false);
  const [mensagem_de_erro, set_mensagem_de_erro] = useState(``);
  const [sub_titulo_cadastro_cliente, set_sub_titulo_cadastro_cliente] = useState(`Quase lá! Preencha abaixo e aproveite as ofertas!`);
  const [idade, set_idade] = useState(``);
  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
  const dia_de_hoje = new Date();
  const mudar_de_pagina = useNavigate(``);

  const [animandoCadastro, setAnimandoCadastro] = useState(false);

  /* Para a verificação do input de email -- se possui caracteres antes do @ e se há os dominios "gmail.com" e "hotmail.com" */
  const termina_Com_Gmail_Ou_Hotmail = form_de_cadastro_cliente.email.endsWith('@gmail.com') || form_de_cadastro_cliente.email.endsWith('@hotmail.com')
  const o_Texto_Antes_Do_Arroba = form_de_cadastro_cliente.email.indexOf('@') > 0   /* se tiver algo antes do @, vai retornar como errado, porque o index do @ tem q ser igual a 0 */

  let email_ja_cadastrado = false;
  let cpf_ja_cadastrado = false;
  let telefone_ja_cadastrado = false;
  let senhas_iguais = false;

  async function informacoes_clientes() {

    try {

      const resultado = await api.get(`/clientes`);
      set_array_clientes(resultado.data);
      console.log(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  async function lidar_com_formulario(e) {

    e.preventDefault();

    try {

      const resposta = await api.post(`/clientes`, form_de_cadastro_cliente);

      const endereco_do_cliente_com_fk = {

        ...endereco_do_cliente,
        fk_id: resposta.data._id
      };

      await api.post(`/enderecos`, endereco_do_cliente_com_fk);

      informacoes_clientes();

      mudar_de_pagina(`/`);


    } catch (erro) {

      console.error(erro);
      set_erro_pagina(erro.message);
      mudar_de_pagina(`/erro`);
    };
  };

  useEffect(() => {

    informacoes_clientes();

  }, []);

  useEffect(() => {

    calcular_idade();

  }, [form_de_cadastro_cliente.data_de_nascimento]);

  function calcular_idade() {

    set_idade(dia_de_hoje.getFullYear() - new Date(form_de_cadastro_cliente.data_de_nascimento).getFullYear());
  };

  useEffect(() => {

    if (cadastro_parte_dois_cliente) {

      set_sub_titulo_cadastro_cliente(`Estamos a um passo de ter você conosco!`);
    } else if (cadastro_parte_tres_cliente) {

      set_sub_titulo_cadastro_cliente(`Seu estilo está quase no ar!`);
    };

  }, [cadastro_parte_dois_cliente, cadastro_parte_tres_cliente]);

  useEffect(() => {

    if (cadastro_parte_um_cliente == false && cadastro_parte_dois_cliente == false && cadastro_parte_tres_cliente) {

      set_exibir_botao_de_cadastro(true);
    } else {

      set_exibir_botao_de_cadastro(false);
    };

  }, [cadastro_parte_um_cliente, cadastro_parte_dois_cliente, cadastro_parte_tres_cliente]);

  function etapaAnterior() {
    if (cadastro_parte_um_cliente && !cadastro_parte_dois_cliente && !cadastro_parte_tres_cliente) {
      // Estou na etapa 1, Volta para tela inicial de escolha de cadastro
      mudar_de_pagina('/escolha_cadastro')

    } else if (!cadastro_parte_um_cliente && cadastro_parte_dois_cliente && !cadastro_parte_tres_cliente) {
      // Estou na etapa 2, volta para etapa 1
      set_cadastro_parte_um_cliente(true)
      set_cadastro_parte_dois_cliente(false)

    } else if (!cadastro_parte_um_cliente && !cadastro_parte_dois_cliente && cadastro_parte_tres_cliente) {
      // Estou na etapa 3, volta para etapa 2
      set_cadastro_parte_dois_cliente(true)
      set_cadastro_parte_tres_cliente(false)
      set_sub_titulo_cadastro_cliente('Seu estilo está quase no ar!')
    }
  }

  function etapa_seguinte() {

    if (cadastro_parte_um_cliente == true && cadastro_parte_dois_cliente == false) {


      for (let i = 0; i < array_clientes.length; i++) {

        if (array_clientes[i].email == form_de_cadastro_cliente.email) {

          email_ja_cadastrado = true;
        };
      };

      for (let i = 0; i < array_brechos; i++) {

        if (array_brechos[i].email == form_de_cadastro_cliente.email) {

          email_ja_cadastrado = true;
        };
      };

      if (form_de_cadastro_cliente.senha == form_de_cadastro_cliente.confirmar_senha) {

        senhas_iguais = true;
      } else {

        senhas_iguais = false;
      };

      if (form_de_cadastro_cliente.nome == false || form_de_cadastro_cliente.email == false || form_de_cadastro_cliente.senha == false) {

        set_mensagem_de_erro(`Favor preencher todos os campos!`);
        return
      };

      /* Precisa estar depois da verificação dos campos preenchidos */
      if (!form_de_cadastro_cliente.email.includes('@')) {
        set_erro('O email deve conter "@"');
        return;
      }

      if (!termina_Com_Gmail_Ou_Hotmail) {
        set_mensagem_de_erro(`O email deve conter "gmail.com" ou "hotmail.com"`);
        return
      }

      if (!o_Texto_Antes_Do_Arroba) {
        set_mensagem_de_erro(`O email deve conter caracteres antes do @`);
        return
      }

      switch (true) {

        case senhas_iguais == true && email_ja_cadastrado == false:

          set_cadastro_parte_um_cliente(false);
          set_cadastro_parte_dois_cliente(true);
          set_mensagem_de_erro(``);
          break;

        case senhas_iguais == false && email_ja_cadastrado == true:

          set_mensagem_de_erro(`Email já cadastrado! As senhas devem ser iguais.`);
          break;

        case senhas_iguais == true && email_ja_cadastrado == true:

          set_mensagem_de_erro(`Email já cadastrado!`);
          break;

        case senhas_iguais == false && email_ja_cadastrado == false:

          set_mensagem_de_erro(`As senhas devem ser iguais!`);
          break;
      };

    } else if (cadastro_parte_dois_cliente == true && cadastro_parte_tres_cliente == false) {

      for (let i = 0; i < array_clientes.length; i++) {

        if (array_clientes[i].cpf == form_de_cadastro_cliente.cpf) {

          cpf_ja_cadastrado = true;
        };

        if (array_clientes[i].telefone == form_de_cadastro_cliente.telefone) {

          telefone_ja_cadastrado = true;
        };
      };

      for (let i = 0; i < array_brechos.length; i++) {

        if (array_brechos[i].telefone == form_de_cadastro_cliente.telefone) {

          telefone_ja_cadastrado = true;
        };
      };

      switch (true) {

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == false && idade >= 18:

          set_mensagem_de_erro(``);
          set_cadastro_parte_dois_cliente(false);
          set_cadastro_parte_tres_cliente(true);
          break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == false && idade >= 18:

          set_mensagem_de_erro(`CPF já cadastrado!`);
          break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == true && idade >= 18:

          set_mensagem_de_erro(`CPF e Telefone já cadastrados!`);
          break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == true && idade < 18:

          set_mensagem_de_erro(`CPF e Telefone já cadastrados! Você deve ser maior de idade.`);
          break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == false && idade < 18:

          set_mensagem_de_erro(`CPF já cadastrado! Você deve ser maior de idade!`);
          break;

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == true && idade < 18:

          set_mensagem_de_erro(`Telefone já cadastrado! Você deve ser maior de idade!`);
          break;

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == false && idade < 18:

          set_mensagem_de_erro(`Você deve ser maior de idade!`);
          break;

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == true && idade > 18:

          set_mensagem_de_erro(`Telefone já cadastrado!`);
          break;

        default:

          set_mensagem_de_erro(`Favor preencher todos os campos!`);
          break;
      };

    };
  };

  const LoginCadastro = () => {
    setAnimandoCadastro(true); // dispara animação de saída

    // espera 800ms pra redirecionar após a animação
    setTimeout(() => {
      mudar_de_pagina('/login');
    }, 600);
  };

  return (
    <AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}>
        <div className='container_cadastro_cliente'>

          {/* <div className="container_ir_para_login_cliente">

        <img src="./img/Estrela_um_cadastro.svg" alt="estrela" className='estrela_um_cadastro' />

        <div className="container_informacoes_para_o_login">

          <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
          <p>A moda circular nunca para! Entre na sua conta e continue fazendo parte desse movimento incrível. </p>
          <button onClick={() => mudar_de_pagina(`/login`)}>Entrar</button>

          <img src="./img/Estrela_dois_cadastro.svg" alt="estrela" />

        </div>

      </div> */}

          <div className="container-ir-para-tela-login-alinhamento">
            <AnimatePresence>
              {!animandoCadastro && (
                <motion.div
                  className="container-informacoes-login-cadastro-cliente"
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 10, x: 755 }} // Se mueve a la derecha
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <img className='estrela-um-cadastro' src="./img/estrelaMenor.png" alt="" />

                  <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
                  <p>A moda circular nunca para! Entre na sua conta e continue fazendo parte desse movimento incrível.</p>
                  <button onClick={LoginCadastro} type='button'>Entrar</button>

                  <img className='estrela-dois-cadastro' src="./img/estrelaGrande.png" alt="" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="container_formulario_cliente">

            <form onSubmit={lidar_com_formulario}>

              <div className="container_logo_etapa_cliente">

                <div className="container_etapa_cliente_alinhamento">

                  <div className="container_etapa_cliente">

                    <img src='./img/Elipse_verde.svg' />

                    {cadastro_parte_dois_cliente || cadastro_parte_tres_cliente ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
                    {cadastro_parte_tres_cliente ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}

                  </div>

                  <div className="container_logo_fly_cliente">

                    <Link to={`/`}><img src="./img/logo/logo-verdeCamadinha.svg" alt="" /></Link>

                  </div>

                </div>

              </div>

              <div className="container_cadastro_cliente_titulo">

                <h1>Cadastro de usuário</h1>
                <p>{sub_titulo_cadastro_cliente}</p>
              </div>

              {cadastro_parte_um_cliente && <Secao_inputs_um />}
              {cadastro_parte_dois_cliente && <Secao_inputs_dois />}
              {cadastro_parte_tres_cliente && <Secao_inputs_tres />}

              <div className="alinhamento-buttons-cadastro">

                {<button type='button' className='button-etapa-anterior-cadastro' onClick={etapaAnterior}>Voltar</button>}

                <div className="dv_frm_cadastro_cliente_botoes">

                  {!exibir_botao_de_cadastro && <button type='button' onClick={etapa_seguinte}>Continuar</button>}
                  {exibir_botao_de_cadastro && <button type='submit'>Cadastrar-se</button>}
                  <p>{mensagem_de_erro}</p>

                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Cadastro_cliente;
