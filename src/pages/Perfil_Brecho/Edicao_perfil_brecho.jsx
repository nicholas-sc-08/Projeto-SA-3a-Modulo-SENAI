import Footer from '../../components/Footer'
import '../Perfil_Brecho/Edicao_perfil_brecho.css'

function Edicao_perfil_brecho() {
  return (

    <div className="toda-a-tela">
      <div className="tela-antes-da-div-central">
        <div className="edicao-perfil-brecho-content">
          <div className="parte-esquerda-pop-up">
            <div className="perfil-brecho-logo-content">
              <input type="image" />
            </div>
            <div className="info-horario-perfil-brecho">
              <textarea name="" id="">Exemplo: Segunda à Sexta: 08:00 - 16:00 --- Sábado à Domingo: 10:00 - 17:00</textarea>
            </div>
          </div>
          <div className="parte-direita-pop-up">
            <div className="titulo-edicao-brecho-content">
              <p>Edite seu Perfil</p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Edicao_perfil_brecho
