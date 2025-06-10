import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Footer from '../../components/Footer'
import '../Perfil_Brecho/Perfil_Brecho.css'
import Header from '../../components/Header'
import Pop_up_de_excluir_perfil from '../../components/Pop_up_de_excluir_perfil'
import { GlobalContext } from '../../contexts/GlobalContext'

function Perfil_Brecho() {
  const [divAtiva, setDivAtiva] = useState("informacoes")
  const [mostrarPopUpExcluir, setMostrarPopUpExcluir] = useState(false)

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)
  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)

  const { array_brechos, set_array_brechos } = useContext(GlobalContext)

  const [ naoEBrecho, setNaoEBrecho] = useState(false)


 const brecho_logado = array_brechos.find(   // ve se o usuario logado é um brecho e puxa o tbm o brecho q esta logado atualmente
      (brecho) => brecho._id === usuario_logado._id
    )

  useEffect(() => {
    
    
    if (!brecho_logado) {
      setNaoEBrecho(true)
    } else {
      setNaoEBrecho(false)
    }
  }, [array_brechos, usuario_logado, brecho_logado])

  useEffect(() => {
    if (usuario_logado) {
      setEnderecoDoBrecho({
        cep: usuario_logado.cep || '',
        bairro: usuario_logado.bairro || '',
        logradouro: usuario_logado.logradouro || '',
        cidade: usuario_logado.cidade || '',
        estado: usuario_logado.estado || '',
        numero: usuario_logado.numero || '',
        complemento: usuario_logado.complemento || '',
      })
    }
  }, [usuario_logado])


  // assim que logar e entrar na tela do perfil as informações vao estar sendo exibidas
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
        confirmar_senha: '',
      })
    }
  }, [usuario_logado])

  const abrirPopUpExcluir = () => {
    setMostrarPopUpExcluir(true)
  }

  const fecharPopUpExcluir = () => {
    setMostrarPopUpExcluir(false)
  }

  return (

    <div className="toda-tela-content">
      <Header tipo='brecho' />
      <div className="depois-da-navbar-content">
        <div className="perfil-brecho-content">
          <div className="parte-esquerda-content">
            <div className="logo-brecho-perfil-content">
              <img src="" alt="logo-do-brecho" />
            </div>
            <div className="infos-horario-endereco-cadastrou-brecho-content">
              <div className="endereco-e-horarios-contents">
                <div className="endereco-brecho-content">
                  <p className="titulo-endereco">Endereço:</p>
                  <span className="endereco-cadastrado">{`${enderecoDoBrecho.logradouro }${enderecoDoBrecho.numero}/${enderecoDoBrecho.bairro}/${enderecoDoBrecho.cidade}/${enderecoDoBrecho.estado}`}</span>
                </div>
                <div className="horario-brecho-content">
                  <p className="titulo-horario">Horário de Funcionamento:</p>
                  <p className="horario-cadastrado">
                    {formCadastroBrecho.horario_funcionamento || 'Não informado'}
                  </p>
                </div>
              </div>
              <div className="data-cadastrouSe-content">
                <p>Cadastrou-se em </p>
              </div>
            </div>
          </div>
          <div className="parte-direita-content">
            <div className="parte-superior-div-direita-content">
              <div className="nome-brecho-icons-content">
                <h1>{formCadastroBrecho.nome_brecho}</h1>

                {!naoEBrecho && <div className="icons-edicao-excluir-content">

                  <Link to={"/Edicao_perfil_brecho"} className="editar-content">
                    <img src="./public/img/icons/lapis-editar-icon.svg" alt="" />
                    <span className="editar-opcao-palavra">Editar</span>
                  </Link>

                  <Link onClick={() => setMostrarPopUpExcluir(true)} className="excluir-content">
                    <img src="./public/img/icons/lixeira-vermelha-icon.svg" alt="" />
                    <span className="excluir-opcao-palavra">Excluir</span>
                  </Link>
                </div>}
              </div>

              <div className="entrar-em-contato-content">
                <div className="mensagem-content">
                  <a href="">
                    <img src="./public/img/icons/envelope-mensagem-icon.svg" alt="Icone-Email" />
                  </a>
                  <p>Envie uma Mensagem</p>
                </div>
                <div className="ligar-content">
                  <a href={'/contato'}>
                    <img src="./public/img/icons/telefone-icon.svg" alt="Icone-Ligar" />
                  </a>
                  <p>Ligue para Nós</p>
                </div>
              </div>
            </div>
            <div className="parte-inferior-div-direita-content">
              <div className="topicos-infos-grandeContent">
                <div className="topicos-infos-subContent">
                  <button onClick={() => setDivAtiva("informacoes")}>Informações</button>
                  <button onClick={() => setDivAtiva("sobre")}>Sobre</button>
                  <button onClick={() => setDivAtiva("produtos")}>Produtos</button>
                </div>
              </div>
              <div className="infos-exibidas-content">
                {divAtiva === "informacoes" && (
                  <>
                    <div className="titulo-topico-exibido">
                      <p>Informações de Contato</p>
                    </div>
                    <div className="infos-cadastradas-sub-div">

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">Nome:</label>
                        <span className="dados-cadastradas-exibidos">
                          {formCadastroBrecho.nome_vendedor}
                        </span>
                      </div>

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">Email:</label>
                        <span className="dados-cadastradas-exibidos">
                          {formCadastroBrecho.email}
                        </span>
                      </div>

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">Telefone:</label>
                        <span className="dados-cadastradas-exibidos">
                          {formCadastroBrecho.telefone}
                        </span>
                      </div>

                      <div className="labels-e-dados-cadastrados-content">
                        <label className="labels-infos">CNPJ:</label>
                        <span className="dados-cadastradas-exibidos">
                          {formCadastroBrecho.cnpj || 'Não informado'}
                        </span>
                      </div>

                    </div>
                  </>
                )}

                {divAtiva === "sobre" && (
                  <>
                    {/* <div className="titulo-topico-exibido">
                      <p>Sobre o Brechó</p>
                    </div> */}
                    <div className="infos-cadastradas-descricao-sub-div">
                      <span className="descricao-brecho-cadastrado">Brechó focado em moda sustentável, com peças selecionadas e de qualidade.</span>
                    </div>
                  </>
                )}

                {divAtiva === "produtos" && (
                  <>
                    <div className="infos-cadastradas-sub-div">
                      <p>Produtos disponíveis do brechó</p>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {mostrarPopUpExcluir && (
        <Pop_up_de_excluir_perfil fecharPopUpExcluir={() => setMostrarPopUpExcluir(false)} />
      )}
      <Footer />
    </div>

  )
}

export default Perfil_Brecho




