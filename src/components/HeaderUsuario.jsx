import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderUsuario.css';

function HeaderUsuario() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <div className="alinhamento-navbar-usuario">
            <nav className="navbar-usuario">

                {/* Botón de menú hamburguesa - SOLO MOBILE */}
                <button className="hamburger-menu" onClick={toggleMenu}>
                    <img src="./public/img/icons/HamburgerNavbarMobile.svg" alt="" />
                </button>
                
                {/* Logo */}
                <Link to={'/'} className='header-link-logo'>
                    <img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly circular" />
                </Link>

                {/* Links - Solo visibles en Desktop */}
                <div className="nav-links">
                    <Link to={'doacoes'} className='link-texto-navbar-usuario'>Doações</Link>
                    <Link to={'lancamentos'} className='link-texto-navbar-usuario'>Lançamentos</Link>
                    <Link to={'sobreNos'} className='link-texto-navbar-usuario'>Sobre nós</Link>
                </div>

                {/* Buscador */}
                <div className="container-pesquisa-navbar">
                    <input type="text"
                        className='input-pesquisa-navbar'
                        placeholder='O que você está procurando?' />
                </div>

                {/* Botones de perfil y carrito */}
                <div className="buttons-container-navbar-alinhamento">
                    <button className='button-sacola-navbar'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Winxs" /></button>
                    <button className='button-perfil-navbar'><img src="./public/img/icons/IconePerfil.svg" alt="perfil" /></button>
                </div>

            </nav>

            {/* Menú desplegable en Mobile */}
            {menuAberto && (
                <div className="mobile-menu">
                    <Link to={'doacoes'} onClick={toggleMenu}>Doações</Link>
                    <Link to={'lancamentos'} onClick={toggleMenu}>Lançamentos</Link>
                    <Link to={'sobreNos'} onClick={toggleMenu}>Sobre nós</Link>
                </div>
            )}

            <div className="line-navbar"></div>
        </div>
    );
}

export default HeaderUsuario;
