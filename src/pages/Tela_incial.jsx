import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import HeaderUsuario from '../components/HeaderUsuario';
import HeaderBrecho from '../components/HeaderBrecho';
import Footer from '../components/Footer';
import Chat from '../components/chat/Chat';
import Chat_conversa from '../components/chat/Chat_conversa';
import './Tela_inicial.css'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


function Tela_incial() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { chat_aberto, set_chato_aberto } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);

  const [startIndex, setStartIndex] = useState(0); // Brechos
  const [startIndexLancamentos, setStartIndexLancamentos] = useState(0);
  const [startIndexFeedback, setStartIndexFeedback] = useState(0);
  const itemsToShow = 4;

  useEffect(() => {

    informacoes_clientes();

  }, []);

  async function informacoes_clientes() {

    try {

      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  const brechos = [
    { nome: "Brechó Moda Sustentavel", nota: "4.5/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Carla Dias Brechó", nota: "3.5/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Brechó da Su", nota: "4.5/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Brechó Diferenciado", nota: "4.5/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Brechó da Luli", nota: "4.2/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Achadinhos da Pri", nota: "4.7/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Garimpo da Ju", nota: "4.3/5", img: "./img/img_perfil_provisorio.svg" },
    { nome: "Closet da Bella", nota: "4.8/5", img: "./img/img_perfil_provisorio.svg" },
  ];

  const lancamentos = Array.from({ length: 8 }).map((_, i) => ({
    nome: `Produto ${i + 1}`,
    preco: `R$ ${(20 + i * 5).toFixed(2)}`,
    img: "./img/img_perfil_provisorio.svg",
    brecho: "Brecho sustentável"
  }));

  const feedbacks = Array.from({ length: 6 }).map((_, i) => ({
    nome: `Cliente ${i + 1}`,
    comentario: `Comentário exemplo número ${i + 1}.`,
    img: "./img/img_perfil_provisorio.svg"
  }));

  const next = (indexSetter, currentIndex, listLength) => {
    if (currentIndex + itemsToShow < listLength) {
      indexSetter(currentIndex + 1);
    }
  };

  const prev = (indexSetter, currentIndex) => {
    if (currentIndex > 0) {
      indexSetter(currentIndex - 1);
    }
  };

  return (
    <div>

      <HeaderUsuario />

      {/* home page seção um */}
      <div className="home-page-secao-um-container">
        <div className="secao-um-texto-container">
          <h1>ENCONTRE ROUPAS QUE COMBINAM COM SEU ESTILO</h1>
          <p>Explore nossa seleção exclusiva de roupas em brechós cuidadosamente curados, onde cada peça reflete personalidade e estilo único. Encontre itens que combinam com você e expressam sua individualidade de forma autêntica.</p>
          <button>Compre Já</button>
        </div>

        <div className="container-imagem-roupas-numero-um">
        </div>

        <img className='estrela-verde-home-page' src="img/Estrela_dois_cadastro.svg" alt="estrela verde grande" />
        <img className='estrela-amarela-home-page' src="img/Estrela_um_cadastro.svg" alt="estrela amarela pequena" />
      </div>

      <div className="line-home-page-secao-um">
      </div>
      {/* home page seção um */}

      {/* home page seção dois */}
      <div className="home-page-secao-dois-container">
        <div className="container-sinalizacao-brechos-home-page">
          <div className="icon-quadrado-brechos-home-page"></div>
          <p>Brechós</p>
        </div>

        <div className="container-titulo-brechos-home-page">
          <p>BRECHÓS</p>
        </div>

        <div className="buttons-anterior-proximo">
          <button className='button-anterior-carrossel' onClick={prev}><img src="./img/icons/CarrosselAnteriorMarrom.svg" alt="Anterior" /></button>
          <button className='button-proximo-carrossel' onClick={next}><img src="./img/icons/CarrosselProximoMarrom.svg" alt="Anterior" /></button>
        </div>

        <AnimatePresence mode="wait">
          <div className="carousel-wrapper">
            <motion.div
              animate={{ x: -startIndex * 478 }} // ajuste se o card for 270px, inclua margens
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="container-brechos-cards-home-page"
            >
              {brechos.map((b, i) => (
                <div className="card-brecho-home-page" key={i}>
                  <div className="container-imagem-brecho-cinza">
                    <div className="container-imagem-brecho">
                      <img src={b.img} alt={b.nome} />
                    </div>
                  </div>
                  <h2 className="nome-brecho">{b.nome}</h2>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatePresence>

        <div className="button-ver-todos-os-brechos-home-page">
          <button>Ver todos</button>
        </div>
      </div>
      {/* home page seção dois */}

      {/* home page seção tres */}
      <div className="home-page-secao-tres-container">
        <div className="container-sinalizacao-destaques-home-page">
          <div className="icon-quadrado-destaques-home-page"></div>
          <p>Destaques</p>
        </div>

        <div className="home-page-titulo-secao-tres">
          <p>LANÇAMENTOS</p>
        </div>

        <div className="buttons-anterior-proximo">
          <button className='button-anterior-carrossel' onClick={() => prev(setStartIndexLancamentos, startIndexLancamentos)}><img src="./img/icons/CarrosselAnteriorMarrom.svg" alt="Anterior" /></button>
          <button className='button-proximo-carrossel' onClick={() => next(setStartIndexLancamentos, startIndexLancamentos, lancamentos.length)}><img src="./img/icons/CarrosselProximoMarrom.svg" alt="Anterior" /></button>
        </div>

        <AnimatePresence mode="wait">
          <div className="carousel-wrapper">
            <motion.div
              animate={{ x: -startIndexLancamentos * 478 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="container-cards-alinhamento-lancamentos-secao-tres"
            >
              {lancamentos.map((l, i) => (
                <div className="card-lancamento-secao-tres" key={i}>
                  <div className="alinhamento-img-perfil-nome-usuario-secao-tres">
                    <img src={l.img} alt="" />
                    <Link to={'/perfil_brecho'} className='nome-brech-card-lancamento'>{l.brecho}</Link>
                  </div>
                  <div className="container-card-imagem-roupa-lancamentos">
                    <img src={l.img} alt="" />
                  </div>
                  <div className="alinhamento-preco-roupa-card-lancamento">
                    <p className='nome-roupa-lancamentos-card'>{l.nome}</p>
                    <p className='preco-roupa-lancamentos-card'>{l.preco}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatePresence>

        <div className="alinhamento-buttons-secao-tres-lancamentos">
          <button>Ver todos</button>
        </div>
      </div>
      {/* home page seção tres */}

      {/* home page seção quatro */}
      <div className="home-page-container-secao-quatro">
        <div className="container-titulo-secao-quatro">
          <p>ENCONTRE O QUE PROCURA</p>
        </div>

        <div className="alinhamento-cards-secao-quatro">
          <div className="container-um-cards-secao-quatro">
            <div className="card-um-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemUmTelaInicial.svg" alt="Roupas" /> */}
              <p>Roupas</p>
            </div>

            <div className="card-dois-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemDoisTelaInicial.svg" alt="Accesórios" /> */}
              <p>Acessórios</p>
            </div>
          </div>

          <div className="container-dois-cards-secao-quatro">
            <div className="card-tres-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemTresTelaInicial.svg" alt="Doações" /> */}
              <p>Doações</p>
            </div>

            <div className="card-quatro-secao-quatro">
              {/* <img src="./img/imagens_telaInicial/CardImagemQuatroTelaInicial.svg" alt="Calçados" /> */}
              <p>Calçados</p>
            </div>
          </div>
        </div>
      </div>
      {/* home page seção quatro */}

      {/* home page seção cinco */}
      <div className="home-page-secao-cinco-container">
        <div className="container-sinalizacao-avalicacoes-home-page">
          <div className="icon-quadrado-avaliacoes-home-page"></div>
          <p>Avaliações</p>
        </div>

        <div className="container-titulo-secao-cinco">
          <p>NOSSOS FEEDBACKS</p>
        </div>

        <div className="alinhamento-buttons-anterior-proximo">
          <button className='button-anterior-carrossel'><img src="./img/icons/CarrosselAnteriorMarrom.svg" alt="Anterior" /></button>
          <button className='button-proximo-carrossel'><img src="./img/icons/CarrosselProximoMarrom.svg" alt="Anterior" /></button>
        </div>

        <div className="container-alinhamento-avaliacoes">
          <div className="home-page-card-avaliacoes">
            <div className="alinhamento-imagem-perfil-usuario-nome-usuario">
              <img src="./img/img_perfil_provisorio.svg" alt="" />
              <p className="nome-pessoa-avaliacoes">Sarah M.</p>
            </div>

            <p className="comentario-avaliacao">
              "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
            </p>
          </div>
        </div>
      </div>
      {/* home page seção cinco */}

      <Footer />

      {usuario_logado != `` && !conversa_aberta && <Chat />}
      {conversa_aberta && <Chat_conversa />}

    </div>
  )
}
export default Tela_incial
