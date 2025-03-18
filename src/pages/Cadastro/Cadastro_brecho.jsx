import React from 'react'
import './Cadastro_brecho.css'

function Cadastro_brecho() {
  return (
    <div>
      <div className="container-ir-para-tela-login-alinhamento">

        <div className="container-informacoes-login-cadastro-brecho">

          <img src="./img/Estrela_um_cadastro.svg" alt="estrela" className='estrela-um-cadastro' />

          <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
          <p>A moda circular nunca para! Entre na sua conta e continue fazendo parte desse movimento incrível. </p>
          <button onClick={() => mudar_de_pagina(`/login`)}>Entrar</button>

          <img src="./img/Estrela_dois_cadastro.svg" alt="estrela" className='estrela-dois-cadastro'/>
        </div>

      </div>
    </div>
  )
}

export default Cadastro_brecho
