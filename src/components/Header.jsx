import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';

function Header({ tipo }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const [containerAberto, setContainerAberto] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {

        function clickForaContainer(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setContainerAberto(false) // aqui ele fecha se clicou fora
            }
        }

        document.addEventListener('mousedown', clickForaContainer)

        return () => {
            document.addEventListener('mousedown', clickForaContainer)
        }

    }, [])

    const renderLinks = () => {
        if (tipo === 'usuario') {
            return (
                <>
                    <Link to="/doacoes" className="link-texto-navbar-usuario">Doações</Link>
                    <Link to="/lancamentos" className="link-texto-navbar-usuario">Lançamentos</Link>
                    <Link to="/sobre_nos" className="link-texto-navbar-usuario">Sobre nós</Link>
                </>
            );
        }
        if (tipo === 'brecho') {
            return (
                <>
                    <Link to="/gestao_estoque" className="link-texto-navbar-usuario">Estoque</Link>
                    <Link to="/informacoes" className="link-texto-navbar-usuario">Informações</Link>
                    <Link to="/sobreNos" className="link-texto-navbar-usuario">Sobre Nós</Link>
                </>
            );
        }
        if (tipo === 'admin') {
            return (
                <>
                    <Link to="/dashboard" className="link-texto-navbar-usuario">Painel de Controle</Link>
                    <Link to="/sobreNos" className="link-texto-navbar-usuario">Sobre nós</Link>
                </>
            );
        }
    };

    const renderIcons = () => {
        return (
            <div className={`buttons-container-navbar-alinhamento${tipo === 'brecho' ? '-brecho' : ''}`}>
                <div className="button-container-navbar-alinhamento">
                    <button className='button-sacola-navbar'><img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Sacola" /></button>
                    {tipo === 'brecho' && (
                        <button className='button-chat-navbar'><img src="./public/img/icons/chat.svg" alt="Chat" /></button>
                    )}
                    <button className='button-perfil-navbar'><img src="./public/img/icons/IconePerfil.svg" alt="Perfil" /><link to="/perfil_cliente" jva /></button>
                </div>
            </div>
        );
    };

    return (
        <div className="alinhamento-navbar-usuario">
            <nav className="navbar-usuario">
                {tipo === 'usuario' && (
                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="./public/img/icons/MenuHamburger.svg" alt="Menu" />
                    </button>
                )}

                {tipo === 'brecho' && (
                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="./public/img/icons/MenuHamburger.svg" alt="Menu" />
                    </button>
                )}

                {tipo === 'admin' && (
                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="./public/img/icons/MenuHamburger.svg" alt="Menu" />
                    </button>
                )}

                <Link to="/" className="header-link-logo">
                    <img src="./public/img/logo/logo-verdeCamadinha.svg" alt="Logo Fly" className='header-link-logo-img' />
                </Link>

                <div className="nav-links">
                    {renderLinks()}
                </div>

                <div ref={containerRef} className="container-pesquisa-navbar">
                    <input
                        type="text"
                        className="input-pesquisa-navbar"
                        placeholder="O que você está procurando?"
                        onFocus={() => setContainerAberto(true)} // Abre quando clica no input
                    />

                    <AnimatePresence>
                        {containerAberto && (
                            <>
                                <div
                                    className="overlay-pesquisa"
                                    onClick={() => setContainerAberto(false)}
                                />

                                <motion.div
                                    className="janelinha-de-pesquisa-header"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                >
                                    uma janelinha qualquer de um site qualquer
                                    <ul>
                                        <li>...</li>
                                    </ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {renderIcons()}
            </nav>

            {/* Sidebar só para usuário */}
            {tipo === 'usuario' && (
                <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={() => setMenuOpen(false)}>
                        <img src="./public/img/icons/CloseButton.svg" alt="Fechar janela" />
                    </button>
                    {renderLinks()}
                </div>
            )}

            {tipo === 'brecho' && (
                <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={() => setMenuOpen(false)}>
                        <img src="./public/img/icons/CloseButton.svg" alt="Fechar janela" />
                    </button>
                    {renderLinks()}
                </div>
            )}

            {tipo === 'admin' && (
                <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={() => setMenuOpen(false)}>
                        <img src="./public/img/icons/CloseButton.svg" alt="Fechar janela" />
                    </button>
                    {renderLinks()}
                </div>
            )}

            <div className="line-navbar"></div>

            {/* {containerAberto && (
                <div className="janelinha-de-pesquisa-header">

                    uma janelinha qualquer de um site qualquer
                    <ul>
                        <li>...</li>
                    </ul>
                </div>
            )} */}

        </div>
    );
}

export default Header;
