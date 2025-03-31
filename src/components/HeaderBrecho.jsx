import React from 'react'
import { Link } from 'react-router-dom'
import './HeaderBrecho.css'

function HeaderBrecho() {
  return (
    <div>
            <div className="alinhamento-navbar-usuario">
                <nav className="navbar-usuario">
                    <Link to={'/'} className='header-link-logo'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly circular"/></Link>

                    <Link to={'/gestao_estoque'} className='link-texto-navbar-usuario'>Estoque</Link>
                    <Link to={'informações'} className='link-texto-navbar-usuario'>Informações</Link>
                    <Link to={'sobreNos'} className='link-texto-navbar-usuario'>Sobre Nós</Link>

                    <div className="container-pesquisa-navbar">
                      <img src="./public/img/icons/Pesquisa.svg" alt="icone de pesquisa" className='img-lupa-pesquisa-navbar' />
                        <input type="text"
                            className='input-pesquisa-navbar'
                            placeholder='O que você está procurando?' />
                    </div>


                    <div className="buttons-container-navbar-alinhamento-brecho">
                        <button className='button-sacola-navbar'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Winxs" /></button>
                        <button className='button-chat-navbar'><img src="./public/img/icons/chat.svg" alt="chat" /></button>
                        <button className='button-perfil-navbar'><img src="./public/img/icons/IconePerfil.svg" alt="perfil" /></button>
                    </div>
                </nav>

                <div className="line-navbar"></div>
            </div>
    </div>
  )
}

export default HeaderBrecho
