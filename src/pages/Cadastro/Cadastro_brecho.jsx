import React, { useContext, useEffect, useState } from 'react'
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
  const { array_brechos, set_array_brechos } = useContext(GlobalContext)
  const { enderecoDoBrecho } = useContext(GlobalContext)

  const { formCadastroBrecho } = useContext(GlobalContext)

  const [exibirBotaoCadastro, setExibirBotaoCadastro] = useState(false)
  const [mensagemErro, setMensagemErro] = useState(``)
  const [idade, setIdade] = useState(``)
  const [subTituloCadastroBrecho, setSubTituloCadastroBrecho] = useState(`Complete os dados abaixo e comece a compartilhar seus produtos com o mundo!`)
  const [tituloCadastroBrecho, setTituloCadastroBrecho] = useState(`Crie a sua conta Fly!`)

  const diaDeHoje = new Date();

  let senhasIguais = false;
  let emailJaCadastrado = false
  let telefoneJaCadastrado = false
  let CNPJJaCadastrado = false
  let nomeBrechoJaCadastrado = false


  async function informacoesBrecho() {

    try {

      const resultado = await axios.get(`http://localhost:3000/brechos`);
      set_array_brechos(resultado.data);
      console.log(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  async function lidarComFormulario(e) {

    e.preventDefault();

    try {

      const resposta = await axios.post(`http://localhost:3000/brechos`, formCadastroBrecho);

      const enderecoDoBrechoComFK = {

        ...enderecoDoBrecho,
        id_brecho: resposta.data.id
      };

      const respostaEndereco = await axios.post(`http://localhost:3000/enderecos`, enderecoDoBrechoComFK);

      informacoesBrecho();
      mudar_de_pagina(`/login`);

    } catch (erro) {

      console.error(erro);
    };
  };

  useEffect(() => {

    informacoesBrecho();

  }, []);

  useEffect(() => {

    calcularIdade();

  }, [formCadastroBrecho.data_de_nascimento_vendedor]);

  function calcularIdade() {

    setIdade(diaDeHoje.getFullYear() - new Date(formCadastroBrecho.data_de_nascimento_vendedor).getFullYear());
  };

  useEffect(() => {

    if (cadastroParteDoisBrecho) {

      setSubTituloCadastroBrecho(`Estamos a poucos passos de te ter conosco!!`);

    } else if (cadastroParteTresBrecho) {

      setSubTituloCadastroBrecho(`Cadastre as informações de endereço!`);
    };

  }, [cadastroParteDoisBrecho, cadastroParteTresBrecho]);

  useEffect(() => {

    if (cadastroParteDoisBrecho) {

      setTituloCadastroBrecho(`Cadastre seu brechó`);

    } else if (cadastroParteTresBrecho) {

      setTituloCadastroBrecho(`Cadastre seu brechó`);
    };

  }, [cadastroParteDoisBrecho, cadastroParteTresBrecho]);

  useEffect(() => {

    if (cadastroParteUmBrecho == false && cadastroParteDoisBrecho == false && cadastroParteTresBrecho) {

      setExibirBotaoCadastro(true);
    } else {

      setExibirBotaoCadastro(false);
    };

  }, [cadastroParteUmBrecho, cadastroParteDoisBrecho, cadastroParteTresBrecho]);


  function seguinteEtapa() {

    if (cadastroParteUmBrecho == true && cadastroParteDoisBrecho == false) {


      if (formCadastroBrecho.senha == formCadastroBrecho.confirmarSenha) {

        senhasIguais = true;

      } else {
        senhasIguais = false;
      };

      if (formCadastroBrecho.nome_vendedor == false || formCadastroBrecho.data_de_nascimento_vendedor == false || formCadastroBrecho.senha == false) {

        setMensagemErro(`Favor preencher todos os campos!`);
        return
      };

      switch (true) {

        case senhasIguais == true && idade >= 18:

          setCadastroParteUmBrecho(false);
          setCadastroParteDoisBrecho(true);
          setMensagemErro(``);
          break;

        case senhasIguais == false && idade >= 18:

          setMensagemErro(`As senhas devem ser iguais!`);
          break;

        case senhasIguais == true && idade < 18:

          setMensagemErro(`Você precisa ser maior de idade para criar uma conta de vendedor no Fly!`);
          break;

        case senhasIguais == false && idade < 18:

          setMensagemErro(`As senhas devem ser iguais e você precisa ser maior de idade para criar uma conta no Fly!`);
          break;
      };

    } else if (cadastroParteDoisBrecho == true && cadastroParteTresBrecho == false) {
      console.log(array_brechos)

      for (let i = 0; i < array_brechos.length; i++) {

        if (array_brechos[i].email == formCadastroBrecho.email) {

          emailJaCadastrado = true;
        };

        if (array_brechos[i].telefone == formCadastroBrecho.telefone) {

          telefoneJaCadastrado = true;
        };

        if (array_brechos[i].CNPJ == formCadastroBrecho.CNPJ) {

          CNPJJaCadastrado = true;
        };

        if (array_brechos[i].nome_brecho == formCadastroBrecho.nome_brecho) {

          nomeBrechoJaCadastrado = true;
        };
      };

      if (!formCadastroBrecho.logo || !formCadastroBrecho.nome_brecho || !formCadastroBrecho.email || !formCadastroBrecho.telefone) {
        setMensagemErro(`Por favor preencher todos os dados!`);
        console.log(formCadastroBrecho)
        return
      };

      switch (true) {

        case emailJaCadastrado == false && telefoneJaCadastrado == false && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == false:

          setMensagemErro(``);
          setCadastroParteDoisBrecho(false);
          setCadastroParteTresBrecho(true);
          break;

        case emailJaCadastrado == true && telefoneJaCadastrado == false && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == false:

          setMensagemErro(`Email já cadastrado!`);
          break;

        case emailJaCadastrado == false && telefoneJaCadastrado == true && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == false:

          setMensagemErro(`Telefone já cadastrado!`);
          break;

        case emailJaCadastrado == false && telefoneJaCadastrado == false && CNPJJaCadastrado == true && nomeBrechoJaCadastrado == false:

          setMensagemErro(`CNPJ já cadastrado!`);
          break;

        case emailJaCadastrado == false && telefoneJaCadastrado == false && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == true:

          setMensagemErro(`Nome do brechó já cadastrado!`);
          break;

        case emailJaCadastrado == true && telefoneJaCadastrado == true && CNPJJaCadastrado == true && nomeBrechoJaCadastrado == true:

          setMensagemErro(`Dados já cadastrados!`);
          break;

        case emailJaCadastrado == true && telefoneJaCadastrado == true && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == false:

          setMensagemErro(`Telefone e email já cadastrado!`);
          break;

        case emailJaCadastrado == true && telefoneJaCadastrado == false && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == true:

          setMensagemErro(`Nome e email já cadastrados!`);
          break;

        case emailJaCadastrado == true && telefoneJaCadastrado == false && CNPJJaCadastrado == true && nomeBrechoJaCadastrado == false:

          setMensagemErro(`Email e CNPJ já cadastrados!`);
          break;

        case emailJaCadastrado == false && telefoneJaCadastrado == true && CNPJJaCadastrado == true && nomeBrechoJaCadastrado == false:

          setMensagemErro(`Telefone e CNPJ já cadastrados!`);
          break;

        case emailJaCadastrado == false && telefoneJaCadastrado == true && CNPJJaCadastrado == false && nomeBrechoJaCadastrado == true:

          setMensagemErro(`Telefone e nome já cadastrados!`);
          break;

        case emailJaCadastrado == false && telefoneJaCadastrado == false && CNPJJaCadastrado == true && nomeBrechoJaCadastrado == true:

          setMensagemErro(`CNPJ e nome já cadastrados!`);
          break;

      };

    };

  }

  useEffect(() => {
    console.log(cadastroParteUmBrecho, cadastroParteDoisBrecho)
  }, [cadastroParteUmBrecho, cadastroParteDoisBrecho])

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

          <form onSubmit={lidarComFormulario}>

            <div className="alinhamento-elipses-logo">

              <div className='elipse-container'>

                <img src='./img/Elipse_verde.svg' />

                {cadastroParteDoisBrecho || cadastroParteTresBrecho ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
                {cadastroParteTresBrecho ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
              </div>

              <Link to={`/`}><img src="./img/logo/logo-verdeCamadinha.svg" alt="" className='logo-cadastro-brecho' /></Link>
            </div>

            <div className="container-formulario-um-cadastro-brecho">

              <h1>{tituloCadastroBrecho}</h1>
              <p>{subTituloCadastroBrecho}</p>

            </div>

            {cadastroParteUmBrecho && <SecaoInputsUmBrecho />}
            {cadastroParteDoisBrecho && <SecaoInputsDoisBrecho />}
            {cadastroParteTresBrecho && <SecaoInputsTresBrecho />}

            <div className="formulario-cadastro-brecho-buttons">

              {!exibirBotaoCadastro && <button type='button' onClick={seguinteEtapa}>Continuar</button>}
              {exibirBotaoCadastro && <button type='submit'>Cadastrar-se</button>}
              <p>{mensagemErro}</p>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastro_brecho
