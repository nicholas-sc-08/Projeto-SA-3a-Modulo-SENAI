import React, { useContext, useEffect, useState } from 'react'
import './Cadastro_brecho.css'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import SecaoInputsUmBrecho from '../../components/cadastro_brecho/CadastroBrechoSecaoInputsUm.jsx'
import SecaoInputsDoisBrecho from '../../components/cadastro_brecho/CadastroBrechoSecaoInputsDois.jsx'
import SecaoInputsTresBrecho from '../../components/cadastro_brecho/CadastroBrechoSecaoInputsTres.jsx'
import api from '../../services/api.js';
import { AnimatePresence, motion } from "framer-motion";

function Cadastro_brecho() {

  const mudar_de_pagina = useNavigate(``);
  const { cadastroParteUmBrecho, setCadastroParteUmBrecho } = useContext(GlobalContext);
  const { cadastroParteDoisBrecho, setCadastroParteDoisBrecho } = useContext(GlobalContext);
  const { cadastroParteTresBrecho, setCadastroParteTresBrecho } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext);
  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext);

  const { formCadastroBrecho } = useContext(GlobalContext)

  const [exibirBotaoCadastro, setExibirBotaoCadastro] = useState(false)
  const [mensagemErro, setMensagemErro] = useState(``)
  const [idade, setIdade] = useState(``)
  const [subTituloCadastroBrecho, setSubTituloCadastroBrecho] = useState(`Complete os dados abaixo e comece a compartilhar seus produtos com o mundo!`)
  const [tituloCadastroBrecho, setTituloCadastroBrecho] = useState(`Crie a sua conta Fly!`)

  const diaDeHoje = new Date();
  const navegar_para_outra_tela = useNavigate();

  const [animandoCadastro, setAnimandoCadastro] = useState(false);

  /* Para a verificação do input de email -- se possui caracteres antes do @ e se há os dominios "gmail.com" e "hotmail.com" */
  const terminaComGmailOuHotmail = formCadastroBrecho.email.endsWith('@gmail.com') || formCadastroBrecho.email.endsWith('@hotmail.com')
  const oTextoAntesDoArroba = formCadastroBrecho.email.indexOf('@') > 0   /* se tiver algo antes do @, vai retornar como errado, porque o index do @ tem q ser igual a 0 */

  let senhasIguais = false;
  let emailJaCadastrado = false
  let telefoneJaCadastrado = false
  let CNPJJaCadastrado = false
  let nomeBrechoJaCadastrado = false
  let enderecoCadastrado = false;

  async function informacoesBrecho() {

    try {

      const resultado = await api.get(`/brechos`);
      set_array_brechos(resultado.data);
      console.log(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  async function informacoes_clientes() {

    try {

      const clientes = await api.get(`/clientes`);
      set_array_clientes(clientes.data);


    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_enderecos() {

    try {

      const enderecos = await api.get(`/enderecos`);
      set_array_enderecos(enderecos.data);


    } catch (erro) {

      console.error(erro);
    };
  };

  async function lidarComFormulario(e) {

    e.preventDefault();

    try {

      const resposta = await api.post(`/brechos`, formCadastroBrecho);

      const enderecoDoBrechoComFK = {

        ...enderecoDoBrecho,
        id_brecho: resposta.data._id
      };

      await api.post(`/enderecos`, enderecoDoBrechoComFK);

      informacoesBrecho();
      buscar_enderecos();
      navegar_para_outra_tela(`/login`);

    } catch (erro) {

      console.error(erro);
    };
  };

  function calcularIdade() {

    setIdade(diaDeHoje.getFullYear() - new Date(formCadastroBrecho.data_de_nascimento_vendedor).getFullYear());
  };

  useEffect(() => {

    informacoesBrecho();
    informacoes_clientes();
    buscar_enderecos();

  }, []);

  useEffect(() => {

    calcularIdade();

  }, [formCadastroBrecho.data_de_nascimento_vendedor]);

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

  function etapaAnterior() {
    if (cadastroParteUmBrecho && !cadastroParteDoisBrecho && !cadastroParteTresBrecho) {
      // Estou na etapa 1, Volta para tela inicial de escolha de cadastro
      navegar_para_outra_tela('/escolha_cadastro')

    } else if (!cadastroParteUmBrecho && cadastroParteDoisBrecho && !cadastroParteTresBrecho) {
      // Estou na etapa 2, volta para etapa 1
      setCadastroParteUmBrecho(true)
      setCadastroParteDoisBrecho(false)
      setTituloCadastroBrecho("Crie a sua conta Fly!")
      setSubTituloCadastroBrecho('Complete os dados abaixo e comece a compartilhar seus produtos com o mundo!')

    } else if (!cadastroParteUmBrecho && !cadastroParteDoisBrecho && cadastroParteTresBrecho) {
      // Estou na etapa 3, volta para etapa 2
      setCadastroParteDoisBrecho(true)
      setCadastroParteTresBrecho(false)
    }
  }

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


      for (let i = 0; i < array_brechos.length; i++) {

        if (array_brechos[i].email == formCadastroBrecho.email) {

          emailJaCadastrado = true;
        };

        if (array_brechos[i].telefone == formCadastroBrecho.telefone) {

          telefoneJaCadastrado = true;
        };

        if (array_brechos[i].cnpj == formCadastroBrecho.cnpj) {

          CNPJJaCadastrado = true;
        };

        if (array_brechos[i].nome_brecho == formCadastroBrecho.nome_brecho) {

          nomeBrechoJaCadastrado = true;
        };
      };

      for (let i = 0; i < array_clientes.length; i++) {

        if (array_clientes[i].email == formCadastroBrecho.email) {

          emailJaCadastrado = true;
        };

        if (array_clientes[i].telefone == formCadastroBrecho.telefone) {

          telefoneJaCadastrado = true;
        };
      };

      if (!formCadastroBrecho.logo || !formCadastroBrecho.nome_brecho || !formCadastroBrecho.email || !formCadastroBrecho.telefone) {
        setMensagemErro(`Por favor preencher todos os dados!`);
        console.log(formCadastroBrecho)
        return
      };


      /* Precisa estar depois da verificação dos campos preenchidos */
      if (!formCadastroBrecho.email.includes('@')) {
        setMensagemErro('O email deve conter "@"')
        return
      }

      if (!terminaComGmailOuHotmail) {
        setMensagemErro(`O email deve conter "gmail.com" ou "hotmail.com"`);
        return
      }

      if (!oTextoAntesDoArroba) {
        setMensagemErro(`O email deve conter caracteres antes do @`);
        return
      }


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

  const LoginCadastro = () => {
    setAnimandoCadastro(true); // dispara animação de saída

    // espera 800ms pra redirecionar após a animação
    setTimeout(() => {
      navegar_para_outra_tela('/login');
    }, 600);
  };

  return (
    <AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}>
        <div className="alinhamento-fases-container-cadastro">

          <div className="container-ir-para-tela-login-alinhamento">
            <AnimatePresence>
              {!animandoCadastro && (
                <motion.div
                  className="container-informacoes-login-cadastro-brecho"
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

              <div className="alinhamento-buttons-cadastro">

                {<button type='button' className='button-etapa-anterior-cadastro' onClick={etapaAnterior}>Voltar</button>}

                <div className="formulario-cadastro-brecho-buttons">
                  {!exibirBotaoCadastro && <button type='button' onClick={seguinteEtapa}>Continuar</button>}
                  {exibirBotaoCadastro && <button type='submit'>Cadastrar-se</button>}
                  <p>{mensagemErro}</p>

                </div>
              </div>

            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Cadastro_brecho
