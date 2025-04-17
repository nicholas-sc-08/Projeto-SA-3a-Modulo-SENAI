import Footer from '../../components/Footer'
import HeaderUsuario from '../../components/HeaderUsuario'
import '../Perfil_Brecho/Perfil_Brecho.css'

function Perfil_Brecho() {

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
                  <p className="horario-cadastrado">exemplo  08:00 - 16:00 </p>
                </div>
              </div>
              <div className="data-cadastrouSe-content">

              </div>
            </div>
          </div>
          <div className="parte-direita-content">
            <div className="parte-superior-div-direita-content">
              <div className="nome-brecho-icons-content">
                <h1>Brechó Moda Sustentável</h1>

                <div className="icons-edicao-excluir-content">
                  <div className="editar-content">
                    <img src="./public/img/icons/lapis-editar-icon.svg" alt="" />
                    <p>Editar</p>
                  </div>
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
                  <button>Informações</button>
                  <button>Sobre</button>
                  <button>Produtos</button>
                </div>
              </div>
              <div className="infos-exibidas-content">

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
