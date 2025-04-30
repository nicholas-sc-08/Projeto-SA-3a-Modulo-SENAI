import Footer from '../../components/Footer'
import '../Perfil_Brecho/Edicao_perfil_brecho.css'

function Edicao_perfil_brecho() {
  return (

    <div className="toda-a-tela">
      <div className="tela-antes-da-div-central">
        <div className="edicao-perfil-brecho-content">
          <div className="parte-esquerda-div-central">
            <div className="perfil-brecho-logo-content">
              <input type="image" />
            </div>
            <div className="info-horario-perfil-brecho">
              <textarea name="" id="">Exemplo: Segunda à Sexta: 08:00 - 16:00 --- Sábado à Domingo: 10:00 - 17:00</textarea>
            </div>
          </div>
          <div className="parte-direita-div-central">
            <div className="titulo-edicao-brecho-content">
              <p>Edite seu Perfil</p>
            </div>
            <div className="vendedor-info-content">
              <div className="titulo-vendedor-info">
                <p>Informações do Vendedor</p>
              </div>
              <div className="inputs-info-vendedor-content">
                <div className="input-nome-vendedor">
                  <p>Nome</p>
                  <input type="text" placeholder='Nome do Vendedor' />
                </div>
                <div className="input-data-nasci-vendedor">
                  <p>Data de Nascimento</p>
                  <input type="text" placeholder='+55 (DD) 90000-0000'/>
                </div>
              </div>
            </div>
            <div className="brecho-info-content">
              <div className="titulo-brecho-infos">
                <p>Informações do Brechó</p>
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p>Nome</p>
                <input type="text" placeholder='Nome do Brechó' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p>Telefone</p>
                <input type="text" placeholder='+55 (DD) 90000-0000'/>
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p>Email</p>
                <input type="text" placeholder='brecho@gmail.com'/>
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p>CNPJ</p>
                <input type="text" placeholder='123456780090'/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Edicao_perfil_brecho
