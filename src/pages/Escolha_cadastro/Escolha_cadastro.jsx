import React from 'react'
import "./Escolha_cadastro.css";

function Escolha_cadastro() {
  return (
    <div>
        <div className='ladoEsquerdo-container-escolha-cadastro'>
            <img className='estrelaMenor' src="./img/estrelaMenor.png" alt="" />
        <div className='info-ladoEsquerdo-escolha-cadastro'>
            <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
            <p>A moda circular nunca para! Que tal fazer parte desse movimento?</p>
            <button onClick={() => navegar('/login')} type='button'>Entrar</button>
        </div>
            <img className='estrelaGrande' src="./img/estrelaGrande.png" alt="" />
        </div>

        <div className='ladoDireito-container-escolha-cadastro'>
            <h1>Crie sua conta Fly!</h1>
            <p>Qual caminho você quer seguir?</p>
            <div className='escolha-container'>
            <div className='quero-comprar'>
            <input type="radio" />
            <div className='info-quero-comprar'>
            <h3>Quero Comprar</h3>
            <p>Explore peças únicas nos nossos brechós</p>
            </div>
        </div>
        </div>

        </div>
    </div>
  )
}

export default Escolha_cadastro
