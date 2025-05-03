import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import Secao_inputs_um from '../../components/Cadastro_cliente_secao_inputs_um.jsx';
import Secao_inputs_dois from '../../components/Cadastro_cliente_secao_inputs_dois.jsx';
import Secao_inputs_tres from '../../components/Cadastro_cliente_secao_inputs_tres.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro_cliente.css';

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
  let email_ja_cadastrado = false;
  let cpf_ja_cadastrado = false;
  let telefone_ja_cadastrado = false;
  let senhas_iguais = false;

  async function informacoes_clientes() {

    try {

      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);
      console.log(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  async function lidar_com_formulario(e) {

    e.preventDefault();

    try {

      const resposta = await axios.post(`http://localhost:3000/clientes`, form_de_cadastro_cliente);

      const endereco_do_cliente_com_fk = {

        ...endereco_do_cliente,
        fk_id: resposta.data.id
      };

      const resposta_endereco = await axios.post(`http://localhost:3000/enderecos`, endereco_do_cliente_com_fk);

      informacoes_clientes();
      mudar_de_pagina(`/login`);

    } catch (erro) {

      console.error(erro);
      set_erro_pagina(erro);
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

  function etapa_seguinte() {


    if (cadastro_parte_um_cliente == true && cadastro_parte_dois_cliente == false) {

      for (let i = 0; i < array_clientes.length; i++) {

        if (array_clientes[i].email == form_de_cadastro_cliente.email) {

          email_ja_cadastrado = true;
        };
      };

      for(let i = 0; i < array_brechos; i++){

        if(array_brechos[i].email == form_de_cadastro_cliente.email){

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

      for(let i = 0; i < array_brechos.length; i++){

        if(array_brechos[i].telefone == form_de_cadastro_cliente.telefone){

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

  return (
    <div className='container_cadastro_cliente'>

      <div className="container_ir_para_login_cliente">

        <img src="./img/Estrela_um_cadastro.svg" alt="estrela" className='estrela_um_cadastro' />

        <div className="container_informacoes_para_o_login">

          <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
          <p>A moda circular nunca para! Entre na sua conta e continue fazendo parte desse movimento incrível. </p>
          <button onClick={() => mudar_de_pagina(`/login`)}>Entrar</button>

          <img src="./img/Estrela_dois_cadastro.svg" alt="estrela" />

        </div>

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

                <Link to={`/`}><img src="./img/logo-verdeCamadinha 2.svg" alt="" /></Link>

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

          <div className="dv_formulario_botoes">

            {!exibir_botao_de_cadastro && <button type='button' onClick={etapa_seguinte}>Continuar</button>}
            {exibir_botao_de_cadastro && <button type='submit'>Cadastrar-se</button>}
            <p>{mensagem_de_erro}</p>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro_cliente;
