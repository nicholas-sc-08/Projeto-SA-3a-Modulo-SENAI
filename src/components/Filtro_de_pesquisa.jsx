import React, { useState } from 'react';
import './Filtro_de_pesquisa.css';

function Filtro_de_pesquisa() {
    const [categorias_visiveis, set_categorias_visiveis] = useState({
        preco: false,
        tamanho: false,
        estilos: false,
        tshirts: false,
        shorts: false,
        jeans: false,
        casual: false,
        formal: false,
        festa: false,
        academia: false,
    });

    const [preco, setPreco] = useState(1000);

    const handlePrecoChange = (event) => {
        setPreco(event.target.value);
    };

    function exibir_opcoes_de_categoria(categoria){

        
    };

    return (
        <aside className="filtro-container">
            <div className="alinhamento-titulo-filtro-pesquisa">
                <div className="titulo-imagem-filtro-pesquisa">
                    <h1>Filtros</h1>
                    <img src="./img/icons/icone-filtro-pesquisa.svg" alt="" />
                </div>
                <div className="line-filtro-pesquisa"></div>
            </div>

            {/* T-Shirts */}
            <div className="filtro-categorias-roupas">
                <h4 onClick={() => exibir_opcoes_de_categoria('tshirts')}>
                    T-shirts
                    <svg
                        className={`flecha-icon ${categorias_visiveis.tshirts ? 'flecha-open' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </h4>

                {categorias_visiveis.tshirts && (
                    <ul className="categorias-ocultas">
                        <li><button>Camisetas de manga longa</button></li>
                        <li><button>Camisetas de algodão</button></li>
                        <li><button>Camisetas de manga curta</button></li>
                    </ul>
                )}
            </div>

            {/* Shorts */}
            <div className="filtro-categorias-roupas">
                <h4 onClick={() => exibir_opcoes_de_categoria('shorts')}>Shorts
                    <svg
                        className={`flecha-icon ${categorias_visiveis.shorts ? 'flecha-open' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </h4>
                {categorias_visiveis.shorts && (
                    <ul className="categorias-ocultas">
                        <li><button>Shorts de praia</button></li>
                        <li><button>Shorts de algodão</button></li>
                        <li><button>Shorts jeans</button></li>
                    </ul>
                )}
            </div>

            {/* Jeans */}
            <div className="filtro-categorias-roupas">
                <h4 onClick={() => exibir_opcoes_de_categoria('jeans')}>Jeans
                    <svg
                        className={`flecha-icon ${categorias_visiveis.jeans ? 'flecha-open' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </h4>
                {categorias_visiveis.jeans && (
                    <ul className="categorias-ocultas">
                        <li><button>Jeans slim</button></li>
                        <li><button>Jeans reto</button></li>
                        <li><button>Jeans skinny</button></li>
                    </ul>
                )}
            </div>

            {/* Preços */}
            <div className="filtro-pesquisa-preco">
                <h4 onClick={() => exibir_opcoes_de_categoria('preco')}>Preços
                    <svg
                        className={`flecha-icon ${categorias_visiveis.preco ? 'flecha-open' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </h4>
                {categorias_visiveis.preco && (
                    <div className='container-input-preco-filtro'>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            step="1"
                            value={preco}
                            onChange={handlePrecoChange}
                            className='input-preco-filtro'
                        />
                        <div className="valores-preco-filtro">R$ 0,00 - R$ {preco},00</div>
                    </div>
                )}
            </div>

            {/* Tamanho */}
            <div className="filtro-tamanho">
                <h4 onClick={() => exibir_opcoes_de_categoria('tamanho')}>Tamanho
                    <svg
                        className={`flecha-icon ${categorias_visiveis.tamanho ? 'flecha-open' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </h4>
                {categorias_visiveis.tamanho && (
                    <div className="opcoes-tamanho-filtro">
                        <button>PP</button>
                        <button>P</button>
                        <button>M</button>
                        <button>G</button>
                        <button>GG</button>
                        <button>XG</button>
                    </div>
                )}
            </div>

            {/* Estilos */}
            <div className="filtro-estilos">
                <h4 onClick={() => exibir_opcoes_de_categoria('estilos')}>Estilos
                    <svg
                        className={`flecha-icon ${categorias_visiveis.estilos ? 'flecha-open' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </h4>
                {categorias_visiveis.estilos && (
                    <ul>
                        <div>
                            <li><button className='button-estilos-categorias-visiveis' onClick={() => exibir_opcoes_de_categoria('casual')}>Casual</button>
                                <svg
                                    className={`flecha-icon ${categorias_visiveis.casual ? 'flecha-open' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 6l6 6-6 6" />
                                </svg></li>
                            {categorias_visiveis.casual && (
                                <ul className="categorias-ocultas">
                                    <li><button>Roupas casuais</button></li>
                                    <li><button>Casacos</button></li>
                                    <li><button>Blusas</button></li>
                                </ul>
                            )}
                        </div>

                        <li><button className='button-estilos-categorias-visiveis' onClick={() => exibir_opcoes_de_categoria('formal')}>Formal</button>
                            <svg
                                className={`flecha-icon ${categorias_visiveis.formal ? 'flecha-open' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 6l6 6-6 6" />
                            </svg></li>
                        {categorias_visiveis.formal && (
                            <ul className="categorias-ocultas">
                                <li><button>Ternos</button></li>
                                <li><button>Camisas sociais</button></li>
                                <li><button>Saia lápis</button></li>
                            </ul>
                        )}

                        <li><button className='button-estilos-categorias-visiveis' onClick={() => exibir_opcoes_de_categoria('festa')}>Festa</button>
                            <svg
                                className={`flecha-icon ${categorias_visiveis.festa ? 'flecha-open' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 6l6 6-6 6" />
                            </svg></li>
                        {categorias_visiveis.festa && (
                            <ul className="categorias-ocultas">
                                <li><button>Vestidos de festa</button></li>
                                <li><button>Roupas de gala</button></li>
                                <li><button>Trajes de noite</button></li>
                            </ul>
                        )}

                        <li><button className='button-estilos-categorias-visiveis' onClick={() => exibir_opcoes_de_categoria('academia')}>Academia</button>
                            <svg
                                className={`flecha-icon ${categorias_visiveis.academia ? 'flecha-open' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 6l6 6-6 6" />
                            </svg></li>
                        {categorias_visiveis.academia && (
                            <ul className="categorias-ocultas">
                                <li><button>Leggings</button></li>
                                <li><button>Blusas de treino</button></li>
                                <li><button>Shorts de academia</button></li>
                            </ul>
                        )}
                    </ul>
                )}
            </div>

            <button className="btn-aplicar">Aplicar Filtro</button>
        </aside>
    );
}

export default Filtro_de_pesquisa;
