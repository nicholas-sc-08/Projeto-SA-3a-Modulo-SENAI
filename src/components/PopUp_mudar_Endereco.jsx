import '../components/PopUp_mudar_Endereco.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { IMaskInput } from 'react-imask';

function PopUp_mudar_Endereco({ fecharPopUp }) {

  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext)
  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext)
  const [mensagemErro, setMensagemErro] = useState(``)
  const navegar = useNavigate(``)

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)

  const { array_brechos, set_array_brechos } = useContext(GlobalContext)

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

  async function atualizarEnderecoBrecho() {
      try {
        await api.put(`/Enderecos/${usuario_logado._id}`, enderecoDoBrecho) // faz com que as informações sejam atualizadas no backend
  
        console.log('Endereço do brechó atualizado com sucesso!');
  
        // aqui ele atualiza as informações no array dos brechos
        const novosEnderecos = array_brechos.map(brecho =>
          brecho._id === usuario_logado._id ? { ...brecho, ...enderecoDoBrecho } : brecho
        );
        set_array_brechos(novosEnderecos)
  
      } catch (error) {
        console.error('Erro ao atualizar o endereço do brechó:', error)
      }
    }

    const brecho_logado = array_brechos.find(   // ve se o usuario logado é um brecho e puxa o tbm o brecho q esta logado atualmente
      (brecho) => brecho._id === usuario_logado._id
    )

useEffect(() => {
   

    if (!brecho_logado) {
      setNaoEBrecho(true)
    } else {
      setNaoEBrecho(false)
    }
  }, [brecho_logado])

  // useEffect(() => {
  //   if (usuario_logado) {
  //     setEnderecoDoBrecho({
  //       cep: usuario_logado.cep || '',
  //       bairro: usuario_logado.bairro || '',
  //       logradouro: usuario_logado.logradouro || '',
  //       cidade: usuario_logado.ciadade || '',
  //       estado: usuario_logado.estado || '',
  //       numero: usuario_logado.numero || '',
  //       complemento: usuario_logado.complemento || '',
  //     })
  //   }
  // }, [usuario_logado])


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
                <label className="topicos-input-endereco">Rua/Logradouro</label>
                <input
                  type="text"
                  placeholder='Rua das Flores'
                  value={enderecoDoBrecho.logradouro}
                  onChange={(event) => 
                    setEnderecoDoBrecho({ 
                      ...enderecoDoBrecho, 
                      logradouro: event.target.value 
                    })
                  }
                />
              </div>

              <div className="numero-input-content">
                <label className="topicos-input-endereco">Número</label>
                <input type="text" 
                placeholder='200' 
                value={enderecoDoBrecho.numero} 
                onChange={(event) => 
                setEnderecoDoBrecho({ 
                  ...enderecoDoBrecho, 
                  numero: event.target.value 
                  })
                  } 
                  />
              </div>
            </div>

            <div className="complemento-input-content">
              <label className="topicos-input-endereco">Complemento</label>
              <input type="text" 
              placeholder='Apartamento 02' 
              value={enderecoDoBrecho.complemento} 
              onChange={(event) => setEnderecoDoBrecho({ 
                ...enderecoDoBrecho, 
                complemento: event.target.value 
                })
                } 
                />
            </div>

            <div className="juncao-cep-e-bairro-content">
              <div className="cep-input-content">
                <label className="topicos-input-endereco">CEP</label>
                <IMaskInput
                  mask="00000-000"
                  unmask="typed"
                  placeholder='00000-000'
                  value={enderecoDoBrecho.cep}
                  onAccept={(value) => setEnderecoDoBrecho({  // o onAccept é o método recomendado pela documentação do react-imask
                    ...enderecoDoBrecho, 
                    cep: value })
                  } 
                // onChange={(e) => setEnderecoDoBrecho({ ...enderecoDoBrecho, cep: event.target.value })}
                />
              </div>

              <div className="bairro-input-content">
                <label className="topicos-input-endereco">Bairro</label>
                <input type="text" 
                placeholder='Rio Vermelho' 
                value={enderecoDoBrecho.bairro} 
                onChange={(event) => setEnderecoDoBrecho({ 
                  ...enderecoDoBrecho, 
                  bairro: event.target.value })
                  } 
                  />
              </div>
            </div>

          </div>

          <div className="salvar-endereco-content">
            {mensagemErro && <p>{mensagemErro}</p>}
            <button onClick={atualizarEnderecoBrecho}>Salvar Endereço</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PopUp_mudar_Endereco
