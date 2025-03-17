import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HeaderUsuario.css'

function HeaderUsuario() {
    return (
        <div>
            <div className="alinhamento-navbar-usuario">
                <nav className="navbar-usuario">
                    <Link to={'/'} className='header-link-logo'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly circular"/></Link>

                    <Link to={'doacoes'} className='link-texto-navbar-usuario'>Doações</Link>
                    <Link to={'lancamentos'} className='link-texto-navbar-usuario'>Lançamentos</Link>
                    <Link to={'sobreNos'} className='link-texto-navbar-usuario'>Sobre nós</Link>

                    <div className="container-pesquisa-navbar">
                        <img src="./public/img/icons/Pesquisa.svg" alt="icone de pesquisa" className='img-lupa-pesquisa-navbar' />
                        <input type="text"
                            className='input-pesquisa-navbar'
                            placeholder='O que você está procurando?' />
                    </div>


                    <div className="buttons-container-navbar-alinhamento">
                        <button className='button-sacola-navbar'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Winxs" /></button>
                        <button className='button-perfil-navbar'><img src="./public/img/icons/IconePerfil.svg" alt="perfil" /></button>
                    </div>
                </nav>

                <div className="line-navbar"></div>
            </div>

        </div>
    )
}

export default HeaderUsuario
