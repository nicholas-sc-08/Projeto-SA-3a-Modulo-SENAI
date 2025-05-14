import '../components/PopUp_mudar_Endereco.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom'

function PopUp_mudar_Endereco({ fecharPopUp }) {

  const [enderecoDoBrecho, setEnderecoDoBrecho] = useState({cep: ``, bairro: ``, logradouro: ``, estado: ``, cidade: ``, numero: ``, complemento: ``})
  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext)
  const navegar = useNavigate(``)

  useEffect(() => {

    if (enderecoDoBrecho.cep.length === 8) {

      buscar_cep();
    };

  }, [enderecoDoBrecho.cep]);

  async function buscar_cep() {

    try {

      const resposta = await fetch(`https://viacep.com.br/ws/${enderecoDoBrecho.cep}/json/`);
      const dados_do_endereco = await resposta.json();

      setEnderecoDoBrecho({
        ...enderecoDoBrecho,
        bairro: dados_do_endereco.bairro,
        logradouro: dados_do_endereco.logradouro,
        estado: dados_do_endereco.uf,
        cidade: dados_do_endereco.localidade,
        numero: dados_do_endereco.numero,
        complemento: dados_do_endereco.complemento
      })

    } catch (erro) {

      console.error(erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    }
  }


  return (
    <div className="tela-inteira-content">
      <div className="divs-centrais-content">
        
        <div className="voltar-e-menu-content">
          <img src="./img/icons/Voltar-icone-verde.svg" alt="Voltar" onClick={fecharPopUp} />
          {/* <img src="./img/icons/Menu-hamburguer-verde-escuro.svg" alt="Menu" /> */}
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
                <input type="text" placeholder='Rua das Flores' 
                value={enderecoDoBrecho.logradouro} 
                onChange={(event) => setEnderecoDoBrecho ( {... enderecoDoBrecho, logradouro: event.target.value}) }
                />
              </div>

              <div className="numero-input-content">
                <p className="topicos-input-endereco">Número</p>
                <input type="text" placeholder='200' value={enderecoDoBrecho.numero} onChange={(event) => setEnderecoDoBrecho ( {... enderecoDoBrecho, numero: event.target.value}) }/>
              </div>
            </div>

            <div className="complemento-input-content">
              <p className="topicos-input-endereco">Complemento</p>
              <input type="text" placeholder='Apartamento 02' value={enderecoDoBrecho.complemento} onChange={(event) => setEnderecoDoBrecho ( {... enderecoDoBrecho, complemento: event.target.value}) }/>
            </div>

            <div className="juncao-cep-e-bairro-content">
              <div className="cep-input-content">
                <p className="topicos-input-endereco">CEP</p>
                <input type="text" placeholder='88011-080' maxLength={8}  value={enderecoDoBrecho.cep} onChange={(event) => setEnderecoDoBrecho ( {... enderecoDoBrecho, cep: event.target.value}) }/>
              </div>

              <div className="bairro-input-content">
                <p className="topicos-input-endereco">Bairro</p>
                <input type="text" placeholder='Rio Vermelho' value={enderecoDoBrecho.bairro} onChange={(event) => setEnderecoDoBrecho ( {... enderecoDoBrecho, bairro: event.target.value}) }/>
              </div>
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
