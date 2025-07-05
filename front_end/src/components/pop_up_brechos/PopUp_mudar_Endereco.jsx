import './PopUp_mudar_Endereco.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { IMaskInput } from 'react-imask'
import { AnimatePresence, motion } from 'framer-motion';
import api from '../../services/api'

function PopUp_mudar_Endereco({ fecharPopUp }) {

  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext)
  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext)
  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext)
  const [mensagemErro, setMensagemErro] = useState(``)

  const navegar = useNavigate(``)
  const [mostrarPopUp, setMostrarPopUp] = useState(false)

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)

  const { array_brechos, set_array_brechos } = useContext(GlobalContext)

  const brecho_logado = array_brechos.find(brecho => brecho._id == usuario_logado._id) // aqui verifica se o usuario logado é um brecho, comparando o id do brecho no array de brecho com o do usuario_logado



  // junto com a const acima, é verificado se é um brecho que está logado, caso seja, a função pegarEnderecoBrecho entra em ação.
  useEffect(() => {

    if (brecho_logado) {

      pegarEnderecoBrecho()
    }

  }, [brecho_logado])

  // aqui a função pega os dados dos endereços no backend
  async function pegarEnderecoBrecho() {

    try {
      const resultado = await api.get('/enderecos')

      set_array_enderecos(resultado.data);
      console.log('As informações do endereço do brechó foram encontradas!')

    } catch (erro) {
      console.log('Erro ao tentar achar as informações do endereço do brechó:', erro)
    }
  }

  // essa parte encontra o endereço do brecho comparando se o id_brecho q esta no model do backend for igual ao id do brecho_logado
  useEffect(() => {

    if (brecho_logado && array_enderecos.length > 0) {    // mas só realiza isso se for um brechó logado e o array_enderecos não estiver vazio

      const enderecoEncontrado = array_enderecos.find(endereco => endereco.id_brecho === brecho_logado._id)

      if (enderecoEncontrado) {
        setEnderecoDoBrecho(enderecoEncontrado)
      }
    }

  }, [brecho_logado, array_enderecos])


  // -- não mexer nessa parte de buscar o cep -- //
  useEffect(() => {
    const cepLimpo = enderecoDoBrecho.cep.replace(/\D/g, '') // remove tudo que não for número

    if (cepLimpo.length === 8) {
      buscar_cep(cepLimpo)
    }
  }, [enderecoDoBrecho.cep])

  async function buscar_cep() {

    try {

      const resposta = await fetch(`https://viacep.com.br/ws/${enderecoDoBrecho.cep}/json/`);
      const dados_do_endereco = await resposta.json();

      setEnderecoDoBrecho((prev) => ({
        ...prev,
        bairro: dados_do_endereco.bairro,
        logradouro: dados_do_endereco.logradouro,
        estado: dados_do_endereco.uf,
        cidade: dados_do_endereco.localidade,
        numero: dados_do_endereco.numero,
        complemento: dados_do_endereco.complemento
      }))

    } catch (erro) {

      console.error(erro);
      setMensagemErro('Erro ao buscar o CEP digitado. Verifique se ele está correto.');
      set_erro_pagina(erro);
      navegar(`/erro`);
    }
  }


  // atualiza o endereço do brecho enviando as informações ao backend
  async function atualizarEnderecoBrecho({ }) {

    const enderecoAtual = array_enderecos.find(endereco => endereco.id_brecho === brecho_logado._id)

    try {
      await api.put(`/enderecos/${enderecoAtual._id}`, enderecoDoBrecho) // faz com que as informações sejam atualizadas no backend

      console.log('Endereço do brechó atualizado com sucesso!')

      // aqui ele atualiza as informações no array dos brechos
      const novosEnderecos = array_enderecos.map(endereco =>
        endereco._id === enderecoAtual._id ? { ...endereco, ...enderecoDoBrecho } : endereco
      )
      set_array_enderecos(novosEnderecos)

    } catch (error) {
      console.error('Erro ao atualizar o endereço do brechó:', error)
    }

    navegar(`/perfil_brecho`)
  }

  return (

    <div className="tela-inteira-content">


      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
          }} className="divs-centrais-content">


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
                    // unmask="typed"
                    placeholder='00000-000'
                    value={enderecoDoBrecho.cep}
                    onAccept={(value) => setEnderecoDoBrecho({  // o onAccept é o método recomendado pela documentação do react-imask
                      ...enderecoDoBrecho,
                      cep: value
                    })
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
                      bairro: event.target.value
                    })
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


        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PopUp_mudar_Endereco
