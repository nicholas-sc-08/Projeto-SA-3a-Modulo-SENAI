import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import HeaderUsuario from '../../components/HeaderUsuario'
import '../Perfil_Brecho/Perfil_Brecho.css'

function Perfil_Brecho() {
  const [divAtiva, setDivAtiva] = useState("informacoes")

  return (

    <div className="toda-tela-content">
      <HeaderUsuario />
      <div className="depois-da-navbar-content">
        <div className="perfil-brecho-content">
          <div className="parte-esquerda-content">
            <div className="logo-brecho-perfil-content">
              <img src="" alt="" />
            </div>
            <div className="infos-horario-endereco-cadastrou-brecho-content">
              <div className="endereco-e-horarios-contents">
                <div className="endereco-brecho-content">
                  <p className="titulo-endereco">Endereço:</p>
                  <p className="endereco-cadastrado">exemplo  Rua Irmão Walmir Orsi/Santa Augusta/Criciúma/SC </p>
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
                  <div className="excluir-content">
                    <img src="./public/img/icons/lixeira-vermelha-icon.svg" alt="" />
                    <p>Excluir</p>
                  </div>
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
                      <p className="labels-infos">Nome:</p>

                      <p className="labels-infos">Email:</p>

                      <p className="labels-infos">Telefone:</p>

                      <p className="labels-infos">CNPJ:</p>
                    </div>
                  </>
                )}

                {divAtiva === "sobre" && (
                  <>
                    {/* <div className="titulo-topico-exibido">
                      <p>Sobre o Brechó</p>
                    </div> */}
                    <div className="infos-cadastradas-descricao-sub-div">
                      <p className="descricao-brecho-cadastrado">Brechó focado em moda sustentável, com peças selecionadas e de qualidade.</p>
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

      <Footer />
    </div>

  )
}

export default Perfil_Brecho
