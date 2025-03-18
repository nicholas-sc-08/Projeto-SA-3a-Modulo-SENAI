import React, { useContext } from 'react'
import './Cadastro_brecho.css'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import SecaoInputsUmBrecho from '../../components/CadastroBrechoSecaoInputsUm.jsx'
import SecaoInputsDoisBrecho from '../../components/CadastroBrechoSecaoInputsDois.jsx'
import SecaoInputsTresBrecho from '../../components/CadastroBrechoSecaoInputsTres.jsx'

function Cadastro_brecho() {

  const mudar_de_pagina = useNavigate(``);
  const { cadastroParteUmBrecho, setCadastroParteUmBrecho } = useContext(GlobalContext);
  const { cadastroParteDoisBrecho, setCadastroParteDoisBrecho } = useContext(GlobalContext);
  const { cadastroParteTresBrecho, setCadastroParteTresBrecho } = useContext(GlobalContext);

  const { arrayBrechos, setArraysBrechos } = useContext(GlobalContext)

  async function informacoesBrecho() {

    try {

      const resultado = await axios.get(`http://localhost:3000/Brecho`);
      setArraysBrechos(resultado.data);
      console.log(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

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

              {cadastro_parte_dois_brecho || cadastro_parte_tres_brecho ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
              {cadastro_parte_tres_brecho ? <img src='./img/Elipse_verde.svg' /> : <img src='./img/Elipse_amarela.svg' />}
            </div>

            <Link to={`/`}><img src="./img/logo/logo-verdeCamadinha.svg" alt="" className='logo-cadastro-brecho' /></Link>
          </div>

          {/* Seção de inputs Cadastro Brecho */}
            <div className="container-cadastro-inputs">

              <h1>Cadastro de usuário</h1>

              {cadastroParteUmBrecho && <SecaoInputsUmBrecho />}
              {cadastroParteDoisBrecho && <SecaoInputsDoisBrecho />}
              {cadastroParteTresBrecho && <SecaoInputsTresBrecho />}

              <div className="dv_formulario_botoes">

                {!exibir_botao_de_cadastro && <button type='button' onClick={etapa_seguinte}>Continuar</button>}
                {exibir_botao_de_cadastro && <button type='submit'>Cadastrar-se</button>}
                <p>{mensagem_de_erro}</p>

              </div>

            </div>
          {/* Seção de inputs Cadastro Brecho */}

        </div>
      </div>
    </div>
  )
}

export default Cadastro_brecho
