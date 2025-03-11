import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HeaderUsuario.css'

function HeaderUsuario() {
    return (
        <div>
            <div className="alinhamento-navbar-usuario">
                <nav className="navbar-usuario">
                    <Link to={'/'} className='header-link-logo'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly circular" /></Link>

                    <Link to={'doacoes'} className='link-texto-navbar-usuario'>Doações</Link>
                    <Link to={'lancamentos'} className='link-texto-navbar-usuario'>Lançamentos</Link>
                    <Link to={'sobreNos'} className='link-texto-navbar-usuario'>Sobre nós</Link>

                    <button className='button-pesquisa-navbar'>
                        <img src="./public/img/icons/Pesquisa.svg" alt="icone de pesquisa" /> <p>O que você está procurando?</p>
                    </button>

                    <button className='button-sacola-navbar'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Winxs" /></button>
                    <button className='button-perfil-navbar'><img src="./public/img/icons/IconePerfil.svg" alt="perfil" /></button>
                </nav>
            </div>

        </div>
    )
}

export default HeaderUsuario
