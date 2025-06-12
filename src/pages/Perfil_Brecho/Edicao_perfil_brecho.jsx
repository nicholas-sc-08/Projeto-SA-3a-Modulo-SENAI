import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMaskInput } from 'react-imask'
import { GlobalContext } from '../../contexts/GlobalContext'
import api from '../../services/api'

import Footer from '../../components/Footer'
import PopUp_mudar_Endereco from '../../components/PopUp_mudar_Endereco'
import '../Perfil_Brecho/Edicao_perfil_brecho.css'

function Edicao_perfil_brecho() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false)

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)
  const { imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho } = useContext(GlobalContext)
  const { array_brechos, set_array_brechos } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)

  /* Para a verificação do input de email -- se possui caracteres antes do @ e se há os dominios "gmail.com" e "hotmail.com" */
  const terminaComGmailOuHotmail = formCadastroBrecho.email.endsWith('@gmail.com') || formCadastroBrecho.email.endsWith('@hotmail.com')
  const oTextoAntesDoArroba = formCadastroBrecho.email.indexOf('@') > 0   /* se tiver algo antes do @, vai retornar como errado, porque o index do @ tem q ser igual a 0 */
  const [mensagemErro, setMensagemErro] = useState(``)

  const abrirPopUp = () => {
    setMostrarPopUp(true)
  }

  const fecharPopUp = () => {
    setMostrarPopUp(false)
  }

  // ---- essa separação já esta sendo feita no login ----
  // const brecho_logado = array_brechos.find(   // ve se o usuario logado é um brecho e puxa o tbm o brecho q esta logado atualmente
  //   (brecho) => brecho._id === usuario_logado._id
  // )


  // essa parte ocorre somente uma vez, ela verifica se o array_brechos esta vazio, se ele estiver vazio, a função pegarInfoBrecho entra em ação.
  useEffect(() => {
    if (!array_brechos.length) {
      pegarInfoBrecho();
    }
  }, [])

  useEffect(() => {
    if (usuario_logado) {
      setFormCadastroBrecho({
        nome_vendedor: usuario_logado.nome_vendedor || '',
        data_de_nascimento_vendedor: usuario_logado.data_de_nascimento_vendedor || '',
        nome_brecho: usuario_logado.nome_brecho || '',
        telefone: usuario_logado.telefone || '',
        email: usuario_logado.email || '',
        cnpj: usuario_logado.cnpj || '',
        horario_funcionamento: usuario_logado.horario_funcionamento || '',
        nova_senha: '',
        confirmar_senha: usuario_logado.confirmarSenha || '',
      })
    }


  }, [usuario_logado, array_brechos])

  async function pegarInfoBrecho() {  // pega as informações do backend
    try {
      const resultado = await api.get('/brechos');

      set_array_brechos(resultado.data);
      console.log('As informações do brechó foram encontradas!');

    } catch (erro) {
      console.log('Erro ao tentar achar as informações do brechó:', erro);
    }
  }

  // ---- resolve o problema do valor da data de nascimento do vendedor vir com horario e fuso horario -----

  // // 
  // const data_nasc_vendedor_formatada = new Date(dataNascimento).toISOString().split("T")[0]

  function formatarDataParaInput(dataISO) {
    if (!dataISO)   // aqui ele tá verificando se o dataISO não veio um valor ou se ele é undefined (indefinido), ou null etc
    return ""    // e se ele for uma das definições acima ele para a execução aqui.
     const data = new Date(dataISO)  // nessa linha, um objeto é criado se baseando na string do DataISO.
    if (isNaN(data.getTime())) // o data.getTime vai verificar se a data é válida, se for inválida, vai retornar como NaN. o isNaN verifica se náo é um número.
    return "" // se for inválida, retorna ""
     return data.toISOString().split("T")[0] // inicialmente a data de nascimento vem com ano/mes/dia e também o horário e fuso horário (Exp:  2006-09-15T00:00:00.000Z). Aqui ele vai tirar a partir do T até o Z e então vai converter para um array [  ]
  }                               // o 0 é porque ele ta pegando a primeira parte do array, ou seja, a data de nascimento.


  async function atualizarBrecho() {
    try {
      await api.put(`/brechos/${usuario_logado._id}`, formCadastroBrecho) // faz com que as informações sejam atualizadas no backend

      console.log('Brechó atualizado com sucesso!');

      // aqui ele atualiza as informações no array dos brechos
      const novosBrechos = array_brechos.map(brecho =>
        brecho._id === usuario_logado._id ? { ...brecho, ...formCadastroBrecho } : brecho
      );
      set_array_brechos(novosBrechos)

    } catch (error) {
      console.error('Erro ao atualizar o brechó:', error)
    }
  }


  useEffect(() => { // precisa ser posto em um useEffect porque se não o setMensagemErroo vai ficar em loop

    if (!formCadastroBrecho.email.includes('@')) {
      setMensagemErro('O email deve conter "@"')
      return
    }
    else if (!terminaComGmailOuHotmail) {
      setMensagemErro(`O email deve conter "gmail.com" ou "hotmail.com"`);
      return
    }
    else if (!oTextoAntesDoArroba) {
      setMensagemErro(`O email deve conter caracteres antes do @`);
      return
    } else {
      setMensagemErro('')  // deixa a mensagem vazia para ajudar a não ficar sempre aparecendo na tela esse erro
    }


  }, [formCadastroBrecho.email])

  return (

    <div className="toda-a-tela">

      <div className="tela-antes-da-div-central">

        <div className="edicao-perfil-brecho-content" >


          <div className="parte-esquerda-div-central">

            <div className="icone-voltar-verde-content">
              <Link to={'/perfil_brecho'}>
                <img src="./public/img/icons/Voltar-icone-verde.svg" className="icone-voltar-edicao-brecho" alt="Voltar" />
              </Link>
            </div>

            <div className="logo-brecho-geral-content">
              <div className="perfil-brecho-logo">
                <img
                  src="./img/fotoPerfil.png"
                  alt="" />
              </div>
            </div>

            <div className="info-horario-perfil-brecho">
              <textarea
                name="horario_funcionamento"
                className="horario-preenchido-brecho"
                placeholder={`Segunda à Sexta: 08:00 - 16:00\nSábado à Domingo: 10:00 - 17:00`}
                value={formCadastroBrecho.horario_funcionamento}
                onChange={(e) =>
                  setFormCadastroBrecho({
                    ...formCadastroBrecho,
                    horario_funcionamento: e.target.value
                  })
                }
                rows={4}>
              </textarea>
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
                  <input
                    type="text"
                    name="nome_vendedor"
                    className="inputs-pequenos-infos"
                    placeholder='Nome do Vendedor'
                    value={formCadastroBrecho.nome_vendedor}
                    onChange={(e) =>
                      setFormCadastroBrecho({
                        ...formCadastroBrecho,
                        nome_vendedor: e.target.value
                      })
                    }
                  />
                </div>
                <div className="input-info-vendedor-subDiv">
                  <label className="titulo-do-input">Data de Nascimento</label>
                  <input
                    type="date"
                    name="data_de_nascimento_vendedor"
                    className="inputs-pequenos-infos"
                    value={formatarDataParaInput(formCadastroBrecho.data_de_nascimento_vendedor)}
                    onChange={(e) =>
                      setFormCadastroBrecho({
                        ...formCadastroBrecho,
                        data_de_nascimento_vendedor: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="brecho-info-content">
              <div className="titulo-brecho-infos">
                <p>Informações do Brechó</p>
              </div>

              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">Nome</label>
                <input
                  type="text"
                  name="nome_brecho"
                  className="inputs-pequenos-infos"
                  placeholder='Nome do Brechó'
                  value={formCadastroBrecho.nome_brecho}
                  onChange={(e) =>
                    setFormCadastroBrecho({
                      ...formCadastroBrecho,
                      nome_brecho: e.target.value
                    })
                  }
                />
              </div>

              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">Telefone</label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  // unmask="typed"
                  name="telefone"
                  placeholder='(DD) 90000-0000'
                  className="inputs-pequenos-infos"
                  value={formCadastroBrecho.telefone}
                  onChange={(e) =>
                    setFormCadastroBrecho({
                      ...formCadastroBrecho,
                      telefone: e.target.value
                    })
                  }
                />
              </div>

              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">Email</label>
                <input
                  type="text"
                  name="email"
                  className="inputs-pequenos-infos"
                  placeholder='brecho@gmail.com'
                  value={formCadastroBrecho.email}
                  onChange={(e) =>
                    setFormCadastroBrecho({
                      ...formCadastroBrecho,
                      email: e.target.value
                    })
                  }
                />
              </div>

              <div className="inputs-pequenos-infos-brecho">
                <label className="titulo-do-input">CNPJ</label>
                <IMaskInput
                  mask="00.000.000/0000-00"
                  // unmask="typed"
                  name="cnpj"
                  placeholder='00.000.000/0000-00'
                  className="inputs-pequenos-infos"
                  value={formCadastroBrecho.cnpj}
                  onChange={(e) =>
                    setFormCadastroBrecho({
                      ...formCadastroBrecho,
                      cnpj: e.target.value
                    })
                  }
                />
              </div>

            </div>
            <div className="endereco-e-senha-infos-content">
              <label className="titulo-do-input">Endereço</label>
              <button onClick={() => setMostrarPopUp(true)}>Clique para alterar</button>
              <label className="titulo-do-input">Mudança de Senha</label>
              <input
                type="password"
                name="nova_senha"
                placeholder="Nova Senha"
                value={formCadastroBrecho.nova_senha}
                onChange={(e) =>
                  setFormCadastroBrecho({
                    ...formCadastroBrecho,
                    nova_senha: e.target.value
                  })
                }
              />
              <input
                type="password"
                name="confirmar_senha"
                placeholder='Confirme sua senha'
                value={formCadastroBrecho.confirmar_senha}
                onChange={(e) =>
                  setFormCadastroBrecho({
                    ...formCadastroBrecho,
                    confirmar_senha: e.target.value
                  })
                }
              />
            </div>
            <div className="botao-editar-content">
              {mensagemErro && <p>{mensagemErro}</p>}
              <button onClick={atualizarBrecho}>Editar</button>
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
