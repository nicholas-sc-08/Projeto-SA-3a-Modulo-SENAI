import React from 'react'
import HeaderBrecho from './HeaderBrecho'
import './Brechos_dashboard.css'

function Brechos_dashboard() {
    return (
        <div>
            <HeaderBrecho />

            <div className="container-alinhamento-brechos-dashboard-allPage">
                <div className="container-alinhamento-imagem-titulo-brecho-dashboard">
                    <div className="container-alinhamento-imagem-brecho-dashboard">
                        <div className="container-alinhamento-imagem-titulo-quantidade-brechos-dashboard">
                            <div className="fundo-cinza-imagem-brecho-dashboard">
                                <div className="fundo-verde-imagem-brecho-dashboard">
                                    <img src="./img/icone-brecho-dashboard.svg" alt="Icone brecho dashboard" />
                                </div>
                            </div>

                            <div className="container-alinhamento-titulo-brecho-dashboard">
                                <p className='titulo-um-brecho-dashboard'>Brechós</p>
                                <p className='numero-de-brechos-dashboard'>200</p>
                            </div>
                        </div>

                        <div className="container-sair-de-brechos-dashboard">
                            <p>Voltar</p>

                            <img src="./img/icone_dashboard_sair.svg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="alinhamento-container-informacoes-brechos">
                    <div className="container-informacoes-brechos-dashboard">
                        <div className="container-barra-verde-pesquisa">
                            <div className="alinhamento-elementos-barra-verde-pesquisa">
                                <input type="text"
                                    placeholder='Buscar brechó' />

                                <button><img src="./img/Lixeira_icon_v_dois.svg" alt="" /></button>
                            </div>
                        </div>

                        <div className="container-barra-titulos-guias-informacoes-brecho">
                            <p className='nome-do-brecho-dashboard'>Nome do Brechó</p>
                            <p>Email</p>
                            <p>Telefone</p>
                            <p>CNPJ</p>
                            <p>Senha</p>
                        </div>

                        <div className="fundo-container-dados-do-brecho">
                            <div className="container-dados-do-brecho">
                                <div className="alinhamento-container-dados-do-brecho">
                                    <div className="alinhamento-imagem-nome-brecho">
                                        <img src="./img/img_perfil_provisorio.svg" alt="" />
                                        <p>Nome do brechó</p>
                                    </div>

                                    <p className='p-informacoes-brechos-dashboard'>emailBrecho@gmail.com</p>
                                    <p className='p-informacoes-brechos-dashboard'>(48) 99999-9999</p>
                                    <p className='p-informacoes-brechos-dashboard'>12.345.678/0001-95</p>
                                    <p className='p-informacoes-brechos-dashboard'>123456789</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Brechos_dashboard
