import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import './Janela_de_pesquisa_header.css';
import './Janela_button_perfil.css';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../contexts/GlobalContext';
import Sacola from './sacola/Sacola';
import api from '../services/api'

function Header({ tipo }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const { array_categorias, set_array_categorias } = useContext(GlobalContext)
    const { array_brechos, set_array_brechos } = useContext(GlobalContext)
    const { array_produtos, set_array_produtos } = useContext(GlobalContext)

    const [containerAberto, setContainerAberto] = useState(false)
    const [buttonPerfilAberto, setButtonPefilAberto] = useState(false)
    const containerRef = useRef(null)
    const buttonPerfilRef = useRef(null)

    const { termoBuscado, setTermoBuscado } = useContext(GlobalContext)
    const navigate = useNavigate()

    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { sacola_aberta, set_sacola_aberta } = useContext(GlobalContext);
    const { sacola, set_sacola } = useContext(GlobalContext);
    const { altura_inicial_chat, set_altura_inicial_chat } = useContext(GlobalContext);
    const { altura_inicial_header_chat, set_altura_inicial_header_chat } = useContext(GlobalContext);

    const [queridinhos_flyers, set_queridinhos_flyers] = useState([]);

    useEffect(() => {

        informacoes_categorias()
        informacoes_brechos()
        informacoes_produtos()

    }, []);

    async function informacoes_produtos() {

        try {

            const resultado = await api.get(`/produtos`);
            set_array_produtos(resultado.data);

        } catch (erro) {

            console.log(erro);
        };
    };

    async function informacoes_categorias() {

        try {

            const resultado = await api.get(`/categorias`);
            set_array_categorias(resultado.data);

        } catch (erro) {

            console.log(erro);
        };
    };

    async function informacoes_brechos() {

        try {

            const resultado = await api.get(`/brechos`);
            set_array_brechos(resultado.data);

        } catch (erro) {

            console.log(erro);
        };
    };

    useEffect(() => {

        const embaralhar = [...array_brechos].sort(() => Math.random() - 0.5);
        set_queridinhos_flyers(embaralhar);

    }, [array_brechos]);

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

    useEffect(() => {

        quantidade_de_produtos_sacola();

    }, [usuario_logado]);

    function renderLinks() {
        if (tipo === 'usuario') {
            return (
                <>
                    <Link to="/EstamosChegando" className="link-texto-navbar-usuario">Doações</Link>
                    <Link to="/buscarProdutos" className="link-texto-navbar-usuario">Produtos</Link>
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

    function sacola_perfil(parametro) {

        if (parametro == `sacola` && sacola_aberta == false) {

            set_sacola_aberta(true);
            setButtonPefilAberto(false);
            setContainerAberto(false);
            set_altura_inicial_chat(`10%`);

            setTimeout(() => {

                set_altura_inicial_header_chat(`100%`);

            }, 325);

        } else {

            set_sacola_aberta(false);
        };

        if (parametro == `perfil` && buttonPerfilAberto == false) {

            setButtonPefilAberto(true);
            set_sacola_aberta(false);
            setContainerAberto(false);
        } else {

            setButtonPefilAberto(false);
        };

        if (parametro == `container` && containerAberto == false) {

            setContainerAberto(true);
            set_sacola_aberta(false);
            setButtonPefilAberto(false);
        } else {

            setContainerAberto(false);
        };
    };

    function quantidade_de_produtos_sacola() {

        if (Array.isArray(sacola)) {

            return sacola.length;
        } else {

            return 0;
        };
    };

    function deslogar_usuario() {

        set_usuario_logado([]);
        set_sacola([]);
    };

    function renderIcons() {
        const estaLogado = usuario_logado && Object.keys(usuario_logado).length > 0;

        return (
            <div className={`buttons-container-navbar-alinhamento${tipo === 'brecho' ? '-brecho' : ''}`}>

                <div className="button-container-navbar-alinhamento" ref={buttonPerfilRef}>

                    {tipo == 'usuario' && (

                        <button className="button-sacola-navbar" onClick={() => sacola_perfil(`sacola`)}>
                            <img src="/img/icons/IconeSacola.svg" alt="Sacola" />
                            <span>{quantidade_de_produtos_sacola()}</span>
                        </button>

                    )}
                    {sacola_aberta && <Sacola />}

                    {tipo === 'brecho' && (
                        <button className="button-chat-navbar">
                            <img src="/img/icons/chat.svg" alt="Chat" />
                        </button>
                    )}

                    <button
                        className="button-perfil-navbar"
                        onClick={() => sacola_perfil(`perfil`)}
                    >
                        <img src={usuario_logado._id ? usuario_logado.imagem_de_perfil || usuario_logado.logo : `./img/icons/IconePerfil.svg`} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="Perfil" />
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
                                            <Link to='/perfil_brecho' className='container-imagem-pefil-usuario-header'><img referrerPolicy="no-referrer" crossOrigin="anonymous" src={usuario_logado._id ? usuario_logado.imagem_de_perfil || usuario_logado.logo : `./img/icons/IconePerfil.svg`} alt="" /> Olá! {usuario_logado.nome}</Link>
                                            <button onClick={() => deslogar_usuario()} className='img-sair-da-conta'> <img src="./img/icons/Logout.svg" alt="Sair da minha conta" /> </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="janela_button_perfil">
                                            <div className="texto_janela_buttons">
                                                <h2>Você está a um clique de descobrir brechós incríveis!</h2>
                                            </div>

                                            <div className="container-alinhamento-janela-button-perfil">
                                                <button className='janela_button_perfil_cadastrar-se' onClick={() => navigate('/escolha_cadastro')}>Cadastrar-se</button>
                                                <button className='janela_button_perfil_login' onClick={() => navigate('/login')}>Fazer Login</button>
                                            </div>
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

    const filteredProducts = array_produtos.filter((produto) => {
        const term = termoBuscado.toLowerCase();
        return (
            produto.nombre?.toLowerCase().includes(term) ||
            produto.marca?.toLowerCase().includes(term) ||
            produto.categoria?.toLowerCase().includes(term)
        );
    });

    const handleSearch = () => {
        if (termoBuscado.trim() !== '') {
            navigate(`/buscarProdutos?query=${encodeURIComponent(termoBuscado.trim())}`);
            setTermoBuscado('');      // limpiar input después de navegar
            setContainerAberto(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // buscar por marcas
    const buscarMarcas = (marca) => {
        setTermoBuscado(marca);
        navigate(`/buscarProdutos?query=${encodeURIComponent(marca.trim())}`);
        setTermoBuscado('')
    };

    const buscarCategoria = (categoria) => {
        setTermoBuscado(categoria);
        navigate(`/buscarProdutos?query=${encodeURIComponent(categoria.trim())}`);
        setTermoBuscado('')
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
                        onFocus={() => sacola_perfil(`container`)} // Abre quando clica no input

                        value={termoBuscado}
                        onChange={(e) => setTermoBuscado(e.target.value)}
                        onKeyDown={handleKeyDown}
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
                                            </div>
                                        </div>

                                        <div className="alinhamento-de-container-janela-de-pesquisa">
                                            <div className="alinhamento-container-de-marcas">
                                                <h2>Marcas populares entre o público</h2>

                                                <div className="alinahamento-container-marcas-aclamadas">
                                                    <div className="container-um-marcas-aclamadas">
                                                        <div className="fundo-cinza-marcas" onClick={() => buscarMarcas('farm' || 'farm rio')}>
                                                            <img src="./img/logo/logo_farm_rio.svg" alt="Farm Rio" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas" onClick={() => buscarMarcas('zara')}>
                                                            <img src="./img/logo/logo_zara.svg" alt="Zara" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas" onClick={() => buscarMarcas('Le lis')}>
                                                            <img src="./img/logo/logo_le_lis.svg" alt="Le Lis" />
                                                        </div>
                                                    </div>

                                                    <div className="container-dois-marcas-aclamadas">
                                                        <div className="fundo-cinza-marcas" onClick={() => buscarMarcas('animale')}>
                                                            <img src="./img/logo/logo_animale.svg" alt="Animale" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas" onClick={() => buscarMarcas('converse' || 'all star')}>
                                                            <img src="./img/logo/logo_converse.svg" alt="Converse" />
                                                        </div>

                                                        <div className="fundo-cinza-marcas" onClick={() => buscarMarcas('adidas')}>
                                                            <img src="./img/logo/logo_adidas.svg" alt="Adidas" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="alinhamento-container-de-categorias-especiais">
                                                <h2>Categorias especiais</h2>

                                                <ul>
                                                    {[...array_categorias].reverse().slice(0, 6).map((categoria, i) => (
                                                        <li key={i} onClick={() => buscarCategoria(categoria.nome)}>{categoria.nome}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="alinhamento-container-queridinhos-dos-flyers">
                                                <h2>Queridinhos dos Flyers</h2>

                                                {queridinhos_flyers.slice(0, 4).map((brecho, i) => (
                                                    <div className="alinhamento-brechos-queridinhos">
                                                        <div className="container-brecho-individual-queridinhos" key={i}>
                                                            <img src={brecho.logo} alt="Brecho logo" />

                                                            <p>{brecho.nome_brecho}</p>
                                                        </div>
                                                    </div>
                                                ))}
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
