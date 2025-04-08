import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderUsuario.css';

function HeaderUsuario() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <div className="alinhamento-navbar-usuario">
                <nav className="navbar-usuario">
                    {/* Ícono de menú (hamburger) */}
                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}><img src="./public/img/icons/MenuHamburger.svg" alt="Menu" /></button>

                    <Link to={'/'} className='header-link-logo'>
                        <img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly circular" />
                    </Link>

                    {/* Menú para versión Desktop */}
                    <div className="nav-links">
                        <Link to={'doacoes'} className='link-texto-navbar-usuario'>Doações</Link>
                        <Link to={'lancamentos'} className='link-texto-navbar-usuario'>Lançamentos</Link>
                        <Link to={'sobreNos'} className='link-texto-navbar-usuario'>Sobre nós</Link>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="container-pesquisa-navbar">
                        <input type="text"
                            className='input-pesquisa-navbar'
                            placeholder='O que você está procurando?' />
                    </div>

                    {/* Íconos */}
                    <div className="buttons-container-navbar-alinhamento">
                        <button className='button-sacola-navbar'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="sacola" /></button>
                        <button className='button-perfil-navbar'><img src="./public/img/icons/IconePerfil.svg" alt="perfil" /></button>
                    </div>
                </nav>

                {/* Menú lateral (solo visible en mobile) */}
                <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={() => setMenuOpen(false)}>❌</button>
                    <Link to={'doacoes'}>Doações</Link>
                    <Link to={'lancamentos'}>Lançamentos</Link>
                    <Link to={'sobreNos'}>Sobre nós</Link>
                </div>

                <div className="line-navbar"></div>
            </div>
        </div>
    );
}

export default HeaderUsuario;
