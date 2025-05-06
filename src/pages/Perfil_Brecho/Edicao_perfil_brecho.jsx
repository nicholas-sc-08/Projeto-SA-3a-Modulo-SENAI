import { useState } from 'react';
import Footer from '../../components/Footer'
import PopUp_mudar_Endereco from '../../components/PopUp_mudar_Endereco';
import '../Perfil_Brecho/Edicao_perfil_brecho.css'
import { useNavigate } from 'react-router-dom';


function Edicao_perfil_brecho() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false)

  const abrirPopUp = () => {
    setMostrarPopup(true);
  }

  const fecharPopUp = () => {
    setMostrarPopUp(false);
  }

  return (

    <div className="toda-a-tela">
      <div className="tela-antes-da-div-central">
        <div className="edicao-perfil-brecho-content">
          <div className="parte-esquerda-div-central">
            <div className="perfil-brecho-logo-content">
            <img src="" alt="" />
            </div>
            <div className="info-horario-perfil-brecho">
              <textarea name="" className="horario-preenchido-brecho" id="">Exemplo: Segunda à Sexta: 08:00 - 16:00 --- Sábado à Domingo: 10:00 - 17:00</textarea>
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
                <div className="input-info-vendedor-subDiv">
                  <p className="titulo-do-input">Nome</p>
                  <input type="text" className="inputs-pequenos-infos" placeholder='Nome do Vendedor' />
                </div>
                <div className="input-info-vendedor-subDiv">
                  <p className="titulo-do-input">Data de Nascimento</p>
                  <input type="text" className="inputs-pequenos-infos" placeholder='+55 (DD) 90000-0000' />
                </div>
              </div>
            </div>
            <div className="brecho-info-content">
              <div className="titulo-brecho-infos">
                <p>Informações do Brechó</p>
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p className="titulo-do-input">Nome</p>
                <input type="text" className="inputs-pequenos-infos" placeholder='Nome do Brechó' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p className="titulo-do-input">Telefone</p>
                <input type="text" className="inputs-pequenos-infos" placeholder='+55 (DD) 90000-0000' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p className="titulo-do-input">Email</p>
                <input type="text" className="inputs-pequenos-infos" placeholder='brecho@gmail.com' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <p className="titulo-do-input">CNPJ</p>
                <input type="text" className="inputs-pequenos-infos" placeholder='123456780090' />
              </div>
            </div>
            <div className="endereco-e-senha-infos-content">
              <p className="titulo-do-input">Endereço</p>
              <button onClick={abrirPopUp}>Clique para alterar</button>
              <p className="titulo-do-input">Mudança de Senha</p>
              <input type="text" placeholder="Nova Senha" />
              <input type="text" placeholder='Confirme sua senha'/>
            </div>
            <div className="botao-editar-content">
              <button>Editar</button>
            </div>
          </div>
        </div>
      </div>
      {mostrarPopUp && <PopUp_mudar_Endereco onClose={fecharPopup} />}
      <Footer />
    </div>
  )
}

export default Edicao_perfil_brecho
