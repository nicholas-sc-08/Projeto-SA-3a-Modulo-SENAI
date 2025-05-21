import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import '../Perfil_Brecho/Perfil_Brecho.css'
import Header from '../../components/Header'
import Pop_up_de_excluir_perfil from '../../components/Pop_up_de_excluir_perfil'

function Perfil_Brecho() {
  const [divAtiva, setDivAtiva] = useState("informacoes")

  const [mostrarPopUpExcluir, setMostrarPopUpExcluir] = useState(false)

  const abrirPopUpExcluir = () => {
    setMostrarPopUpExcluir(true)
  }

  const fecharPopUpExcluir = () => {
    setMostrarPopUpExcluir(false)
  }

  return (

    <div className="toda-tela-content">
      <Header tipo='brecho' />
      <div className="depois-da-navbar-content">
        <div className="perfil-brecho-content">
          <div className="parte-esquerda-content">
            <div className="logo-brecho-perfil-content">
              <img src="" alt="logo-do-brecho" />
            </div>
            <div className="infos-horario-endereco-cadastrou-brecho-content">
              <div className="endereco-e-horarios-contents">
                <div className="endereco-brecho-content">
                  <p className="titulo-endereco">Endereço:</p>
                  <span className="endereco-cadastrado">exemplo  Rua Irmão Walmir Orsi/Santa Augusta/Criciúma/SC </span>
                </div>
                <div className="horario-brecho-content">
                  <p className="titulo-horario">Horário de Funcionamento:</p>
                  <p className="horario-cadastrado">Segunda à Sexta: 08:00 - 16:00 </p>
                  <p className="horario-cadastrado">Sábado à Domingo: 10:00 - 17:00 </p>
                </div>
              </div>
              <div className="data-cadastrouSe-content">
                <p>Cadastrou-se em </p>
              </div>
            </div>
          </div>
          <div className="parte-direita-content">
            <div className="parte-superior-div-direita-content">
              <div className="nome-brecho-icons-content">
                <h1>Brechó Moda Sustentável</h1>

                <div className="icons-edicao-excluir-content">

                  <Link to={"/Edicao_perfil_brecho"} className="editar-content">
                    <img src="./public/img/icons/lapis-editar-icon.svg" alt="" />
                    <span className="editar-opcao-palavra">Editar</span>
                  </Link>

                  <Link onClick={() => setMostrarPopUpExcluir(true)} className="excluir-content">
                    <img src="./public/img/icons/lixeira-vermelha-icon.svg" alt="" />
                    <span className="excluir-opcao-palavra">Excluir</span>
                  </Link>

                </div>
              </div>

              <div className="entrar-em-contato-content">
                <div className="mensagem-content">
                  <a href="">
                    <img src="./public/img/icons/envelope-mensagem-icon.svg" alt="Icone-Email" />
                  </a>
                  <p>Envie uma Mensagem</p>
                </div>
                <div className="ligar-content">
                  <a href={'/contato'}>
                    <img src="./public/img/icons/telefone-icon.svg" alt="Icone-Ligar" />
                  </a>
                  <p>Ligue para Nós</p>
                </div>
              </div>
            </div>
            <div className="parte-inferior-div-direita-content">
              <div className="topicos-infos-grandeContent">
                <div className="topicos-infos-subContent">
                  <button onClick={() => setDivAtiva("informacoes")}>Informações</button>
                  <button onClick={() => setDivAtiva("sobre")}>Sobre</button>
                  <button onClick={() => setDivAtiva("produtos")}>Produtos</button>
                </div>
              </div>
              <div className="infos-exibidas-content">
                {divAtiva === "informacoes" && (
                  <>
                    <div className="titulo-topico-exibido">
                      <p>Informações de Contato</p>
                    </div>
                    <div className="infos-cadastradas-sub-div">

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">Nome:</label>
                        <span className="dados-cadastradas-exibidos"></span>
                      </div>

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">Email:</label>
                        <span className="dados-cadastradas-exibidos">e</span>
                      </div>

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">Telefone:</label>
                        <span className="dados-cadastradas-exibidos"></span>
                      </div>

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">CNPJ:</label>
                        <span className="dados-cadastradas-exibidos"></span>
                      </div>

                    </div>
                  </>
                )}

                {divAtiva === "sobre" && (
                  <>
                    {/* <div className="titulo-topico-exibido">
                      <p>Sobre o Brechó</p>
                    </div> */}
                    <div className="infos-cadastradas-descricao-sub-div">
                      <span className="descricao-brecho-cadastrado">Brechó focado em moda sustentável, com peças selecionadas e de qualidade.</span>
                    </div>
                  </>
                )}

                {divAtiva === "produtos" && (
                  <>
                    <div className="infos-cadastradas-sub-div">
                      <p>Produtos disponíveis do brechó</p>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      {mostrarPopUp && <Pop_up_menu_cliente onClose={fecharPopUp} />}
      {mostrarPopUpExcluir && (
        <Pop_up_de_excluir_perfil fecharPopUpExcluir={() => setMostrarPopUpExcluir(false)} />
      )}
      <Footer />
    </div>

  )
}

export default Perfil_Brecho




