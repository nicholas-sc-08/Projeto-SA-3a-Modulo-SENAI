import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

import Footer from '../../components/Footer/Footer'
import '../Perfil_Brecho/Perfil_Brecho.css'
import Header from '../../components/Header/Header'
import Pop_up_de_excluir_perfil from '../../components/pop_up_usuario/Pop_up_de_excluir_perfil'
import { GlobalContext } from '../../contexts/GlobalContext'
import api from '../../services/api';

function Perfil_Brecho() {
  const [divAtiva, setDivAtiva] = useState("informacoes")
  const [mostrarPopUpExcluir, setMostrarPopUpExcluir] = useState(false)

  const referencia_perfil = useRef(null);

  const { brecho_selecionado, set_brecho_selecionado } = useContext(GlobalContext);
  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)
  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext)
  const { imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)
  const { array_brechos, set_array_brechos } = useContext(GlobalContext)
  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext)

  // const { array_produtos, set_array_produtos } = useContext(GlobalContext)
  // const [produtos_embaralhados, set_produtos_embaralhados] = useState([])


  const navegar = useNavigate(``)

  const [naoEBrecho, setNaoEBrecho] = useState(true)

  useEffect(() => {

    referencia_perfil.current.scrollIntoView();

    pegarEnderecoBrecho()

    buscar_produtos()
    buscar_brechos()

  }, [brecho_selecionado])


  useEffect(() => {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id)

    if (encontrar_brecho && brecho_selecionado._id == encontrar_brecho._id) {

      setNaoEBrecho(false)
      return

    } else {
      setNaoEBrecho(true)
      return
    }
  }, [usuario_logado])

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

  useEffect(() => {

    if (brecho_selecionado) {

      setFormCadastroBrecho({ nome_vendedor: brecho_selecionado.nome_vendedor, data_de_nascimento_vendedor: brecho_selecionado.data_de_nascimento_vendedor, nome_brecho: brecho_selecionado.nome_brecho, telefone: brecho_selecionado.telefone, email: brecho_selecionado.email, cnpj: brecho_selecionado.cnpj, logo: brecho_selecionado.logo, horario_funcionamento: brecho_selecionado.horario_funcionamento });
      setEnderecoDoBrecho({ bairro: brecho_selecionado.bairro, cidade: brecho_selecionado.cidade, estado: brecho_selecionado.estado })
    };

  }, [brecho_selecionado]);


  useEffect(() => {

    if (usuario_logado && usuario_logado._id && array_enderecos.length > 0) {

      const endereco = array_enderecos.find(endereco => endereco.id_brecho === usuario_logado._id)

      if (endereco) {
        setEnderecoDoBrecho(endereco)
      }
    }
  }, [usuario_logado, array_enderecos])

  const abrirPopUpExcluir = () => {
    setMostrarPopUpExcluir(true)
  }

  const fecharPopUpExcluir = () => {
    setMostrarPopUpExcluir(false)
  }


  async function buscar_brechos() {

    try {

      const brechos = await api.get(`/brechos`);
      set_array_brechos(brechos.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_produtos() {

    try {

      const produtos = await api.get(`/produtos`);
      set_array_produtos(produtos.data);

    } catch (erro) {

      console.error(erro);
    };
  }


  return (

    <div className="toda-tela-content" ref={referencia_perfil}>
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
                  <span className="endereco-cadastrado">{`${enderecoDoBrecho.bairro}/${enderecoDoBrecho.cidade}/${enderecoDoBrecho.estado}`}</span>
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
                    <img src="./img/icons/lapis-editar-icon.svg" alt="" />
                    <span className="editar-opcao-palavra">Editar</span>
                  </Link>

                  <Link onClick={() => setMostrarPopUpExcluir(true)} className="excluir-content">
                    <img src="./img/icons/lixeira-vermelha-icon.svg" alt="" />
                    <span className="excluir-opcao-palavra">Excluir</span>
                  </Link>
                </div>}
              </div>

              <div className="entrar-em-contato-content">
                <div className="mensagem-content" onClick={() => navegar(`/contato`)}>
                  <a href="">
                    <img src="./img/icons/envelope-mensagem-icon.svg" alt="Icone-Email" />
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
                  {/* {!naoEBrecho && <button onClick={() => setDivAtiva("produtos")}>Produtos</button>} */}
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

                {/* {divAtiva === "produtos" &&  !naoEBrecho && (
                  <>
                    <div className="infos-cadastradas-sub-div">
                     <div className="gestao-estoque-button-content" onClick={() => navegar(`/gestao_estoque`)}>
                        <a href="">
                          <img src="./img/icons/bx--box.svg" alt="Icone-Estoque" />
                        </a>
                        <p>Estoque</p>
                      </div>
                    </div>
                  </>
                )} */}

              </div>
            </div>
          </div>
        </div>


       {/* <div className="container_voce_tambem_pode_gostar">

                    <div className="container_voce_tambem_pode_gostar_titulo">

                        <h2>Produtos</h2>

                    </div>

                    <div className="container_produtos_embaralhados">

                        {produtos_embaralhados.map((produto_embaralhado, i) => (

                            <div key={i} className='container_produto_embaralhado' onClick={() => ir_para_produto_selecionado(produto_embaralhado)}>

                                <div className="container_imagem_do_produto">

                                    <img src={produto_embaralhado.imagem[0]} alt="" />

                                </div>

                                <div className="container_produto_embaralhado_info">

                                    <div className="contianer_produto_embaralhado_titulo">

                                        <h5>{produto_embaralhado.nome}</h5>
                                        <img src={imagem_do_brecho(produto_embaralhado.fk_id_brecho)} alt="" />

                                    </div>

                                    <div className="container_produto_embaralhado_preco">

                                        <span>{exibir_preco(produto_embaralhado.preco)}</span>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

            </div>*/}

      </div>

      {mostrarPopUpExcluir && (
        <Pop_up_de_excluir_perfil fecharPopUpExcluir={() => setMostrarPopUpExcluir(false)} />
      )}
      <Footer />
    </div>

  )
}

export default Perfil_Brecho




