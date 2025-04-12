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

            </div>
            <div className="infos-horario-endereco-brecho-content">

            </div>
          </div>
          <div className="parte-direita-content">
            <div className="parte-superior-div-direita-content">
              <div className="nome-brecho-content">

              </div>
              <div className="entrar-em-contato-content">

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
