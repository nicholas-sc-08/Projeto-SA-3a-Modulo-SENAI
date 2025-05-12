import '../components/PopUp_mudar_Endereco.css'
import { useNavigate } from 'react-router-dom'

function PopUp_mudar_Endereco({ fecharPopUp }) {
  const navegar = useNavigate()

  return (
    <div className="tela-inteira-content">
      <div className="divs-centrais-content">
        <div className="voltar-e-menu-content">
          <img src="./img/icons/Voltar-icone-verde.svg" alt="Voltar" onClick={fecharPopUp} />
          <img src="./img/icons/Menu-hamburguer-verde-escuro.svg" alt="Menu" />


        </div>
        <div className="popUp-mudar-endereco-content">
          <div className="titulo-e-subtitulo-content">
            <p className="titulo-endereco-brecho-popUp">Modificar meu endereço</p>
            <p className="subtitulo-endereco-brecho-popUp">De onde você deseja enviar os seus produtos?</p>
          </div>
          <div className="inputs-do-popUp-content">
            <div className="juncao-rua-logra-e-numero-content">
              <div className="rua-logra-input-content">
                <p className="topicos-input-endereco">Rua/Logradouro</p>
                <input type="text" placeholder='Rua do Vasco' />
              </div>
              <div className="numero-input-content">
                <p className="topicos-input-endereco">Número</p>
                <input type="text" placeholder='283' />
              </div>
            </div>
            <div className="complemento-input-content">
              <p className="topicos-input-endereco">Complemento</p>
              <input type="text" placeholder='Apartamento 07' />
            </div>
            <div className="juncao-cep-e-bairro-content">
              <div className="cep-input-content">
                <p className="topicos-input-endereco">CEP</p>
                <input type="text" placeholder='88058-080' />
              </div>
              <div className="bairro-input-content">
                <p className="topicos-input-endereco">Bairro</p>
                <input type="text" placeholder='Ingleses do Rio Vermelho' />
              </div>
            </div>
            <div className="ponto-de-refe-input-content">
              <p className="topicos-input-endereco">Ponto de Referência</p>
              <input type="text" placeholder='Brasil Atacadista' />
            </div>
          </div>
          <div className="salvar-endereco-content">
            <button>Salvar Endereço</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUp_mudar_Endereco
