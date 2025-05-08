import '../components/PopUp_mudar_Endereco.css'

function PopUp_mudar_Endereco() {

  return (
    <div className="tela-inteira-content">
      <div className="divs-centrais-content">
        <div className="voltar-e-menu-content">
          
        </div>
        <div className="popUp-mudar-endereco-content">
          <div className="titulo-e-subtitulo-content">
            <p className="titulo-endereco-popUp">Modificar meu endereço</p>
            <p>De onde você deseja enviar os seus produtos?</p>
          </div>
          <div className="inputs-do-popUp">
            <div className="rua-logra-input-content">
              <p>Rua/Logradouro</p>
              <input type="text" placeholder='Rua do Vasco'/>
            </div>
            <div className="numero-input-content">
              <p>Número</p>
              <input type="text" placeholder='283'/>
            </div>
            <div className="complemento-input-content">
              <p>Complemento</p>
              <input type="text" placeholder='Apartamento 07'/>
            </div>
            <div className="cep-input-content">
              <p>CEP</p>
              <input type="text" placeholder='88058-080'/>
            </div>
            <div className="bairro-input-content">
              <p>Bairro</p>
              <input type="text" placeholder='Ingleses do Rio Vermelho'/>
            </div>
            <div className="ponto-de-refe-input-content">
              <p>Ponto de Referência</p>
              <input type="text" placeholder='Brasil Atacadista'/>
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
