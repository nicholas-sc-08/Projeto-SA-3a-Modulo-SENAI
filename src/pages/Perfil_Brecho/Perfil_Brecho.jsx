import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/Footer/Footer'
import '../Perfil_Brecho/Perfil_Brecho.css'
import Header from '../../components/Header/Header'
import Pop_up_de_excluir_perfil from '../../components/pop_up_usuario/Pop_up_de_excluir_perfil'
import { GlobalContext } from '../../contexts/GlobalContext'

function Perfil_Brecho() {
  const [divAtiva, setDivAtiva] = useState("informacoes")
  const [mostrarPopUpExcluir, setMostrarPopUpExcluir] = useState(false)

  const { brecho_selecionado, set_brecho_selecionado } = useContext(GlobalContext);
  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)
  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext)
  const { imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)
  const { array_brechos, set_array_brechos } = useContext(GlobalContext)

  const navegar = useNavigate(``)

  const [naoEBrecho, setNaoEBrecho] = useState(true)



  useEffect(() => {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id)

    if (encontrar_brecho) {
      setNaoEBrecho(false)
      return

    } else {
      setNaoEBrecho(true)
      return
    }
  }, [usuario_logado])

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

  useEffect(() => {

    if (brecho_selecionado) {

      setFormCadastroBrecho({ nome_vendedor: brecho_selecionado.nome_vendedor, data_de_nascimento_vendedor: brecho_selecionado.data_de_nascimento_vendedor, nome_brecho: brecho_selecionado.nome_brecho, telefone: brecho_selecionado.telefone, email: brecho_selecionado.email, cnpj: brecho_selecionado.cnpj, logo: brecho_selecionado.logo, horario_funcionamento: brecho_selecionado.horario_funcionamento });
    };

  }, [brecho_selecionado]);

  // assim que logar e entrar na tela do perfil as informações vao estar sendo exibidas
  useEffect(() => {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

    if (encontrar_brecho) {
      setFormCadastroBrecho({
        nome_vendedor: usuario_logado.nome_vendedor || '',
        data_de_nascimento_vendedor: usuario_logado.data_de_nascimento_vendedor || '',
        nome_brecho: usuario_logado.nome_brecho || '',
        telefone: usuario_logado.telefone || '',
        email: usuario_logado.email || '',
        cnpj: usuario_logado.cnpj || '',
        logo: usuario_logado.logo || '',
        horario_funcionamento: usuario_logado.horario_funcionamento || '',
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
              <img src={formCadastroBrecho.logo} alt="" />
            </div>
            <div className="infos-horario-endereco-cadastrou-brecho-content">
              <div className="endereco-e-horarios-contents">
                <div className="endereco-brecho-content">
                  <p className="titulo-endereco">Endereço:</p>
                  <span className="endereco-cadastrado">{`${enderecoDoBrecho.logradouro}${enderecoDoBrecho.numero}/${enderecoDoBrecho.bairro}/${enderecoDoBrecho.cidade}/${enderecoDoBrecho.estado}`}</span>
                </div>
                <div className="horario-brecho-content">
                  <p className="titulo-horario">Horário de Funcionamento:</p>
                  <p className="horario-cadastrado">
                    {formCadastroBrecho.horario_funcionamento}
                  </p>
                </div>
              </div>
              {/* <div className="data-cadastrouSe-content">
                <p>Cadastrou-se em </p>
              </div> */}
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
              </div>
            </div>
            <div className="parte-inferior-div-direita-content">
              <div className="topicos-infos-grandeContent">
                <div className="topicos-infos-subContent">
                  <button onClick={() => setDivAtiva("informacoes")}>Informações</button>
                  {/* <button onClick={() => setDivAtiva("sobre")}>Sobre</button> */}
                  {!naoEBrecho && <button onClick={() => setDivAtiva("produtos")}>Produtos</button>}
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

                {/* {divAtiva === "sobre" && (
                  <>
                    <div className="infos-cadastradas-descricao-sub-div">
                      <span className="descricao-brecho-cadastrado">Brechó focado em moda sustentável, com peças selecionadas e de qualidade.</span>
                    </div>
                  </>
                )} */}

                {divAtiva === "produtos" &&  !naoEBrecho && (
                  <>
                    <div className="infos-cadastradas-sub-div">
                      <div className="gestao-estoque-button-content" onClick={() => navegar(`/gestao_estoque`)}>
                        <a href="">
                          <img src="./public/img/icons/bx--box.svg" alt="Icone-Estoque" />
                        </a>
                        <p>Estoque</p>
                      </div>
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




