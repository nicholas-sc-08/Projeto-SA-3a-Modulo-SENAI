import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderUsuario.css';

function HeaderUsuario() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="alinhamento-navbar-usuario">
            <nav className="navbar-usuario">
                {/* Botão Hamburger */}
                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    <img src="./public/img/icons/MenuHamburger.svg" alt="Menu" />
                </button>

                {/* Logo */}
                <Link to="/" className="header-link-logo">
                    <img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly" className='header-link-logo-img' />
                </Link>

                {/* Links (Desktop apenas) */}
                <div className="nav-links">
                    <Link to="doacoes" className="link-texto-navbar-usuario">Doações</Link>
                    <Link to="lancamentos" className="link-texto-navbar-usuario">Lançamentos</Link>
                    <Link to="sobre_nos" className="link-texto-navbar-usuario">Sobre nós</Link>
                </div>

                {/* Pesquisa */}
                <div className="container-pesquisa-navbar">
                    <input
                        type="text"
                        className="input-pesquisa-navbar"
                        placeholder="O que você está procurando?"
                    />
                </div>

                {/* Botões sacola e perfil */}
                <div className="buttons-container-navbar-alinhamento">
                    <button className="button-sacola-navbar">
                        <img src="./public/img/icons/IconeSacola.svg" alt="Sacola" />
                    </button>
                    <button className="button-perfil-navbar">
                        <img src="./public/img/icons/IconePerfil.svg" alt="Perfil" />
                    </button>
                </div>
            </nav>

            {/* Sidebar (só mobile) */}
            <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setMenuOpen(false)}> <img src="./public/img/icons/CloseButton.svg" alt="Fechar janela" /> </button>
                <Link to="doacoes">Doações</Link>
                <Link to="lancamentos">Lançamentos</Link>
                <Link to="sobreNos">Sobre nós</Link>
            </div>

            <div className="line-navbar"></div>
        </div>
    );
}

export default HeaderUsuario;
