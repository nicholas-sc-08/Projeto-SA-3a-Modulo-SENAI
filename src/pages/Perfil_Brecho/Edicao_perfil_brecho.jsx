import { useState } from 'react';
import Footer from '../../components/Footer'
import PopUp_mudar_Endereco from '../../components/PopUp_mudar_Endereco'
import '../Perfil_Brecho/Edicao_perfil_brecho.css'
import { Link } from 'react-router-dom';


function Edicao_perfil_brecho() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false)

  const abrirPopUp = () => {
    setMostrarPopUp(true)
  }

  const fecharPopUp = () => {
    setMostrarPopUp(false)
  }

  return (

    <div className="toda-a-tela">
      <div className="tela-antes-da-div-central">
        <div className="edicao-perfil-brecho-content">
          <div className="parte-esquerda-div-central">
            <div className="icone-voltar-verde-content">
              <Link to={'/perfil_brecho'}>
              <img src="./public/img/icons/Voltar-icone-verde.svg" className="icone-voltar-edicao-brecho" alt="Voltar"/>
              </Link>
            </div>
            <div className="logo-brecho-geral-content">
              <div className="perfil-brecho-logo">
                <img src="" alt="" />
              </div>
            </div>
            <div className="info-horario-perfil-brecho">
              <textarea name="" className="horario-preenchido-brecho" id="" placeholder="Segunda à Sexta: 08:00 - 16:00 --- Sábado à Domingo: 10:00 - 17:00"></textarea>
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
                  <label className="titulo-do-input">Nome</label>
                  <input type="text" className="inputs-pequenos-infos" placeholder='Nome do Vendedor' />
                </div>
                <div className="input-info-vendedor-subDiv">
                  <label className="titulo-do-input">Data de Nascimento</label>
                  <input type="date" className="inputs-pequenos-infos"  />
                </div>
              </div>
            </div>
            <div className="brecho-info-content">
              <div className="titulo-brecho-infos">
                <p>Informações do Brechó</p>
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">Nome</label>
                <input type="text" className="inputs-pequenos-infos" placeholder='Nome do Brechó' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">Telefone</label>
                <input type="text" className="inputs-pequenos-infos" min={14} maxLength={14} placeholder='(DD) 99123-4567' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">Email</label>
                <input type="email" className="inputs-pequenos-infos" placeholder='brecho@gmail.com' />
              </div>
              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">CNPJ</label>
                <input type="text" className="inputs-pequenos-infos" min={18} maxLength={18} placeholder='00.000.000/0000-00' />
              </div>
            </div>
            <div className="endereco-e-senha-infos-content">
              <label className="titulo-do-input">Endereço</label>
              <button onClick={() => setMostrarPopUp(true)}>Clique para alterar</button>
              <label className="titulo-do-input">Mudança de Senha</label>
              <input type="password" placeholder="Nova Senha" min={7} maxLength={12} />
              <input type="password" placeholder='Confirme sua senha' min={7} maxLength={12} />
            </div>
            <div className="botao-editar-content">
              <button>Editar</button>
            </div>
          </div>
        </div>
      </div>
      {mostrarPopUp && (
        <PopUp_mudar_Endereco fecharPopUp={() => setMostrarPopUp(false)} />
      )}

      <Footer />
    </div>
  )
}

export default Edicao_perfil_brecho
