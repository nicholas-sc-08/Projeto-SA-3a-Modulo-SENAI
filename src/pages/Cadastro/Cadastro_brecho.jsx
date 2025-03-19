import React, { useContext, useState } from 'react'
import './Cadastro_brecho.css'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import SecaoInputsUmBrecho from '../../components/CadastroBrechoSecaoInputsUm.jsx'
import SecaoInputsDoisBrecho from '../../components/CadastroBrechoSecaoInputsDois.jsx'
import SecaoInputsTresBrecho from '../../components/CadastroBrechoSecaoInputsTres.jsx'
import axios from 'axios';

function Cadastro_brecho() {

  const mudar_de_pagina = useNavigate(``);
  const { cadastroParteUmBrecho, setCadastroParteUmBrecho } = useContext(GlobalContext);
  const { cadastroParteDoisBrecho, setCadastroParteDoisBrecho } = useContext(GlobalContext);
  const { cadastroParteTresBrecho, setCadastroParteTresBrecho } = useContext(GlobalContext);
  const { arrayBrechos, setArraysBrechos } = useContext(GlobalContext)

  const { formCadastroBrecho } = useContext(GlobalContext)

  const [exibirBotaoCadastro, setExibirBotaoCadastro] = useState(false)
  const [mensagemErro, setMensagemErro] = useState(``)


  async function informacoesBrecho() {

    try {

      const resultado = await axios.get(`http://localhost:3000/brechos`);
      setArraysBrechos(resultado.data);
      console.log(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  // async function lidar_com_formulario(e) {

  //   e.preventDefault();

  //   try {

  //     const resposta = await axios.post(`http://localhost:3000/clientes`, form_de_cadastro_cliente);

  //     const endereco_do_cliente_com_fk = {

  //       ...endereco_do_cliente,
  //       fk_id: resposta.data.id
  //     };

  //     const resposta_endereco = await axios.post(`http://localhost:3000/enderecos`, endereco_do_cliente_com_fk);

  //     informacoes_clientes();
  //     mudar_de_pagina(`/login`);

  //   } catch (erro) {

  //     console.error(erro);
  //   };
  // };

  // useEffect(() => {

  //   informacoes_clientes();

  // }, []);

  // useEffect(() => {

  //   calcular_idade();

  // }, [form_de_cadastro_cliente.data_de_nascimento]);

  // function calcular_idade() {

  //   set_idade(dia_de_hoje.getFullYear() - new Date(form_de_cadastro_cliente.data_de_nascimento).getFullYear());
  // };

  // useEffect(() => {

  //   if (cadastro_parte_dois_cliente) {

  //     set_sub_titulo_cadastro_cliente(`Estamos a um passo de ter você conosco!`);
  //   } else if (cadastro_parte_tres_cliente) {

  //     set_sub_titulo_cadastro_cliente(`Seu estilo está quase no ar!`);
  //   };

  // }, [cadastro_parte_dois_cliente, cadastro_parte_tres_cliente]);

  // useEffect(() => {

  //   if (cadastro_parte_um_cliente == false && cadastro_parte_dois_cliente == false && cadastro_parte_tres_cliente) {

  //     set_exibir_botao_de_cadastro(true);
  //   } else {

  //     set_exibir_botao_de_cadastro(false);
  //   };

  // }, [cadastro_parte_um_cliente, cadastro_parte_dois_cliente, cadastro_parte_tres_cliente]);

  // function etapa_seguinte() {


  //   if (cadastro_parte_um_cliente == true && cadastro_parte_dois_cliente == false) {

  //     for (let i = 0; i < array_clientes.length; i++) {

  //       if (array_clientes[i].email == form_de_cadastro_cliente.email) {

  //         email_ja_cadastrado = true;
  //       };
  //     };

  //     if (form_de_cadastro_cliente.senha == form_de_cadastro_cliente.confirmar_senha) {

  //       senhas_iguais = true;
  //     } else {

  //       senhas_iguais = false;
  //     };

  //     if (form_de_cadastro_cliente.nome == false || form_de_cadastro_cliente.email == false || form_de_cadastro_cliente.senha == false) {

  //       set_mensagem_de_erro(`Favor preencher todos os campos!`);
  //       return
  //     };

  //     switch (true) {

  //       case senhas_iguais == true && email_ja_cadastrado == false:

  //         set_cadastro_parte_um_cliente(false);
  //         set_cadastro_parte_dois_cliente(true);
  //         set_mensagem_de_erro(``);
  //         break;

  //       case senhas_iguais == false && email_ja_cadastrado == true:

  //         set_mensagem_de_erro(`Email já cadastrado! As senhas devem ser iguais.`);
  //         break;

  //       case senhas_iguais == true && email_ja_cadastrado == true:

  //         set_mensagem_de_erro(`Email já cadastrado!`);
  //         break;

  //       case senhas_iguais == false && email_ja_cadastrado == false:

  //         set_mensagem_de_erro(`As senhas devem ser iguais!`);
  //         break;
  //     };

  //   } else if (cadastro_parte_dois_cliente == true && cadastro_parte_tres_cliente == false) {

  //     for (let i = 0; i < array_clientes.length; i++) {

  //       if (array_clientes[i].cpf == form_de_cadastro_cliente.cpf) {

  //         cpf_ja_cadastrado = true;
  //       };

  //       if (array_clientes[i].telefone == form_de_cadastro_cliente.telefone) {

  //         telefone_ja_cadastrado = true;
  //       };
  //     };

  //     switch (true) {

  //       case cpf_ja_cadastrado == false && telefone_ja_cadastrado == false && idade >= 18:

  //         set_mensagem_de_erro(``);
  //         set_cadastro_parte_dois_cliente(false);
  //         set_cadastro_parte_tres_cliente(true);
  //         break;

  //       case cpf_ja_cadastrado == true && telefone_ja_cadastrado == false && idade >= 18:

  //         set_mensagem_de_erro(`CPF já cadastrado!`);
  //         break;

  //       case cpf_ja_cadastrado == true && telefone_ja_cadastrado == true && idade >= 18:

  //         set_mensagem_de_erro(`CPF e Telefone já cadastrados!`);
  //         break;

  //       case cpf_ja_cadastrado == true && telefone_ja_cadastrado == true && idade < 18:

  //         set_mensagem_de_erro(`CPF e Telefone já cadastrados! Você deve ser maior de idade.`);
  //         break;

  //       case cpf_ja_cadastrado == true && telefone_ja_cadastrado == false && idade < 18:

  //         set_mensagem_de_erro(`CPF já cadastrado! Você deve ser maior de idade!`);
  //         break;

  //       case cpf_ja_cadastrado == false && telefone_ja_cadastrado == true && idade < 18:

  //         set_mensagem_de_erro(`Telefone já cadastrado! Você deve ser maior de idade!`);
  //         break;

  //       case cpf_ja_cadastrado == false && telefone_ja_cadastrado == false && idade < 18:

  //         set_mensagem_de_erro(`Você deve ser maior de idade!`);
  //         break;

  //       case cpf_ja_cadastrado == false && telefone_ja_cadastrado == true && idade > 18:

  //         set_mensagem_de_erro(`Telefone já cadastrado!`);
  //         break;

  //       default:

  //         set_mensagem_de_erro(`Favor preencher todos os campos!`);
  //         break;
  //     };

  //   };
  // };

  function seguinteEtapa(params) {

  }

  return (
    <div>
      <div className="alinhamento-fases-container-cadastro">
        <div className="container-ir-para-tela-login-alinhamento">
          <div className="container-informacoes-login-cadastro-brecho">

            <img src="./img/Estrela_um_cadastro.svg" alt="estrela" className='estrela-um-cadastro' />

            <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
            <p>A moda circular nunca para! Entre na sua conta e continue fazendo parte desse movimento incrível. </p>
            <button onClick={() => mudar_de_pagina(`/login`)}>Entrar</button>

            <img src="./img/Estrela_dois_cadastro.svg" alt="estrela" className='estrela-dois-cadastro' />
          </div>
        </div>

        <div className="alinhamento-elipses-com-container-inputs">

          <div className="alinhamento-elipses-logo">

            <div className='elipse-container'>
              <img src='./img/Elipse_verde.svg' />

              {cadastroParteDoisBrecho || cadastroParteTresBrecho ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
              {cadastroParteTresBrecho ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
            </div>

            <Link to={`/`}><img src="./img/logo/logo-verdeCamadinha.svg" alt="" className='logo-cadastro-brecho' /></Link>
          </div>

          <SecaoInputsUmBrecho />
          {/* Seção de inputs Cadastro Brecho */}
          <div className="container-cadastro-inputs">

            {cadastroParteUmBrecho && <SecaoInputsUmBrecho />}
            {cadastroParteDoisBrecho && <SecaoInputsDoisBrecho />}
            {cadastroParteTresBrecho && <SecaoInputsTresBrecho />}

            <div className="formulario-cadastro-brecho-buttons">

              {!exibirBotaoCadastro && <button type='button' onClick={seguinteEtapa}>Continuar</button>}
              {exibirBotaoCadastro && <button type='submit'>Cadastrar-se</button>}
              <p>{mensagemErro}</p>

            </div>

          </div>
          {/* Seção de inputs Cadastro Brecho */}


        </div>
      </div>
    </div>
  )
}

export default Cadastro_brecho
