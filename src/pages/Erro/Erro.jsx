import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext'
import HeaderBrecho from '../../components/HeaderBrecho';
import Footer from '../../components/Footer.jsx';
import './Erro.css';

function Erro() {

  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
  const navegacao = useNavigate(`/`);

  return (
    <div>

        <HeaderBrecho/>

        <div className="container_tela_de_erro">

          <div className="container_erro">
              
              <p>{erro_pagina}</p>
          
          </div>      

          <div className="container_botao_de_voltar">

              <button onClick={() => navegacao(`/`)}>Ir para o Início</button>

          </div>

        </div>

        <Footer/>

    </div>
  )
}

export default Erro
