import React from 'react'
import './Pesquisa_de_produtos.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Filtro_de_pesquisa from '../../components/Filtro_de_pesquisa'

function Pesquisa_de_produtos() {
    return (
        <div className='container-alinhamento-all-pages'>
            <Header tipo='usuario' />

            <div className="all-page-informacoes-alinhamento">
                <Filtro_de_pesquisa />
            </div>

            <Footer />
        </div>
    )
}

export default Pesquisa_de_produtos
