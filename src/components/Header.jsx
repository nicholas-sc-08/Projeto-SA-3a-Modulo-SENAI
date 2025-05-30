import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import './Janela_de_pesquisa_header.css';
import './Janela_button_perfil.css';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../contexts/GlobalContext';

function Header({ tipo }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const [containerAberto, setContainerAberto] = useState(false)
    const [buttonPerfilAberto, setButtonPefilAberto] = useState(false)
    const containerRef = useRef(null)
    const buttonPerfilRef = useRef(null)

    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);

    useEffect(() => {

        function clickForaContainer(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setContainerAberto(false) // aqui ele fecha se clicou fora
            }
        }

        document.addEventListener('mousedown', clickForaContainer)

        return () => {
            document.removeEventListener('mousedown', clickForaContainer)
        }

    }, [])

    useEffect(() => {

        function clickForaContainerPerfil(event) {
            if (buttonPerfilRef.current && !buttonPerfilRef.current.contains(event.target)) {
                setButtonPefilAberto(false) // aqui ele fecha se clicou fora
            }
        }

        document.addEventListener('mousedown', clickForaContainerPerfil)

        return () => {
            document.removeEventListener('mousedown', clickForaContainerPerfil)
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

    console.log(usuario_logado)

    const renderIcons = () => {
        const estaLogado = usuario_logado && Object.keys(usuario_logado).length > 0;

        console.log("usuario_logado:", usuario_logado);
        console.log("estaLogado:", estaLogado);

        return (
            <div className={`buttons-container-navbar-alinhamento${tipo === 'brecho' ? '-brecho' : ''}`}>
                <div className="button-container-navbar-alinhamento" ref={buttonPerfilRef}>
                    <button className="button-sacola-navbar">
                        <img src="/img/icons/IconeSacola.svg" alt="Sacola" />
                    </button>

                    {tipo === 'brecho' && (
                        <button className="button-chat-navbar">
                            <img src="/img/icons/chat.svg" alt="Chat" />
                        </button>
                    )}

                    <button
                        className="button-perfil-navbar"
                        onClick={() => setButtonPefilAberto(!buttonPerfilAberto)}
                    >
                        <img src="/img/icons/IconePerfil.svg" alt="Perfil" />
                    </button>

                    <AnimatePresence>
                        {buttonPerfilAberto && (
                            <motion.div
                                className="menu-perfil-desplegable"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {estaLogado ? (
                                    <>
                                        <div className='janela_button_perfil_logout'>
                                            <Link to='/perfil_cliente' className='container-imagem-pefil-usuario-header'><img src="./img/img_perfil_provisorio.svg" alt="" /> Olá! {usuario_logado.nome}</Link>
                                            <button onClick={() => set_usuario_logado([])} className='img-sair-da-conta'> <img src="./img/icons/Logout.svg" alt="Sair da minha conta" /> </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="janela_button_perfil">
                                            <Link to="/login">Login</Link>
                                            <Link to="/cadastro_cliente">Cadastrar</Link>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                                    transition={{ duration: 0.3, ease: 'easeOut' }}>

                                    <div className="container-alinhamento-conteudo-janela-de-pesquisa">

                                        <div className="container-alinhamento-historico-de-busquedas-header">
                                            <h2>Buscas recentes</h2>

                                            <div className="container-historico-de-busquedas-recentes">
                                                <div className="busquedas-recentes-individual">
                                                    <img src="./img/icons/Historico_de_busquedas.svg" alt="Historico" />

                                                    <p>Camiseta legal</p>
                                                </div>

                                                <div className="busquedas-recentes-individual">
                                                    <img src="./img/icons/Historico_de_busquedas.svg" alt="Historico" />

                                                    <p>Camiseta legal</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="alinhamento-de-container-janela-de-pesquisa">
                                            <div className="alinhamento-container-de-marcas">
                                                <h2>Marcas aclamadas pelo público</h2>

                                                <div className="alinahamento-container-marcas-aclamadas">
                                                    <div className="container-um-marcas-aclamadas">
                                                        <div className="fundo-cinza-marcas">
                                                            <img src="./img/logo/logo_farm_rio.svg" alt="Farm Rio" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas">
                                                            <img src="./img/logo/logo_zara.svg" alt="Zara" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas">
                                                            <img src="./img/logo/logo_le_lis.svg" alt="Le Lis" />
                                                        </div>
                                                    </div>

                                                    <div className="container-dois-marcas-aclamadas">
                                                        <div className="fundo-cinza-marcas">
                                                            <img src="./img/logo/logo_animale.svg" alt="Animale" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas">
                                                            <img src="./img/logo/logo_converse.svg" alt="Converse" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas">
                                                            <img src="./img/logo/logo_adidas.svg" alt="Adidas" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="alinhamento-container-de-categorias-especiais">
                                                <h2>Categorias especiais</h2>

                                                <ul>
                                                    <li>Roupas de marca</li>
                                                    <li>Roupas Vintage</li>
                                                    <li>Oversized</li>
                                                    <li>Estilo retrô</li>
                                                    <li>Estilo streetwear</li>
                                                    <li>Peças customizadas</li>
                                                </ul>
                                            </div>

                                            <div className="alinhamento-container-queridinhos-dos-flyers">
                                                <h2>Queridinhos dos Flyers</h2>

                                                <div className="alinhamento-brechos-queridinhos">
                                                    <div className="container-brecho-individual-queridinhos">
                                                        <img src="./img/img_perfil_provisorio.svg" alt="" />

                                                        <p>Garimpo urbano</p>
                                                    </div>

                                                    <div className="container-brecho-individual-queridinhos">
                                                        <img src="./img/img_perfil_provisorio.svg" alt="" />

                                                        <p>Garimpo urbano</p>
                                                    </div>

                                                    <div className="container-brecho-individual-queridinhos">
                                                        <img src="./img/img_perfil_provisorio.svg" alt="" />

                                                        <p>Garimpo urbano</p>
                                                    </div>
                                                    <div className="container-brecho-individual-queridinhos">
                                                        <img src="./img/img_perfil_provisorio.svg" alt="" />

                                                        <p>Garimpo urbano</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="alinhamento-container-flytracks">
                                                <h2>Flytracks</h2>

                                                <p className='subtitulo-flytracks'>Trilha sonora para garimpar com estilo.</p>

                                                {/* <div className="alinhamento-playlists"> */}
                                                <div className="container-playlist">
                                                    <img className='img-icon-playlist' src="./img/icons/icon_playlist_spotify.svg" alt="icon playlist spotify" />

                                                    <p>Winxstereo</p>

                                                    <img className='logo-spotify' src="./img/logo/logo_spotify.svg" alt="Spotify" />
                                                </div>

                                                <div className="container-playlist">
                                                    <img className='img-icon-playlist' src="./img/icons/icon_playlist_youtube.svg" alt="icon playlist youtube" />

                                                    <p>Mix da Fly</p>

                                                    <img className='logo-youtube' src="./img/logo/logo_youtube.svg" alt="Youtube" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* </div> */}

                                    </div>
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
