import React from 'react'
import './TelaEmAndamento.css'
import Header from '../../components/Header/Header'

function TelaEmAndamento() {
    return (
        <div className='alinhamento-tela-em-andamento'>

            <Header tipo="usuario" />

            <div className="container-alinhamento-um-tela-em-andamento">
                <img src="./img/logo/logo-verdeCamadinha.svg" alt="Logo Fly" className='logo-fly-tela-em-andamento' />

                <div className="alinhamento-letras-tela-em-andamento">
                    <h1>Calma aí! Estamos chegando...</h1>
                    <p>Em breve: A maior rede de brechós online!</p>
                </div>
            </div>
        </div>
    )
}

export default TelaEmAndamento
