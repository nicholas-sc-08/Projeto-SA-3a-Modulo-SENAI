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
            <div className="infos-horario-endereco-brecho-content">

            </div>
          </div>
          <div className="parte-direita-content">
            <div className="parte-superior-div-direita-content">
              <div className="nome-brecho-icons-content">
                <h1>Brechó Moda Sustentável</h1>

                <div className="icons-edicao-excluir-content">
                  <div className="editar-content">
                    <i></i>
                    <p>Editar</p>
                  </div>
                  <div className="excluir-content">
                    <i></i>
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
              <div className="topicos-infos-content">

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
