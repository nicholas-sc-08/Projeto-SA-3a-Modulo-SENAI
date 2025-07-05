import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Sobre_nos.css';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

function Sobre_nos() {

  const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}>
        <Header tipo={tipo_de_header} />

        <div className="alinhamento-all-page-sobrenos">
          <div className="alinhamento-sobre-a-fly-sobrenos">
            <div className="alinhamento-container-um-sobre-a-fly">
              <h2>Sobre a Fly</h2>

              <p>A Fly é uma plataforma criada para conectar brechós a um público maior, tornando a experiência de compra mais prática, acessível e consciente. A ideia surgiu da vivência de um dos nossos membros, cuja mãe, dona de brechó, enfrentava dificuldades para alcançar novos clientes.</p>

              <p>Inspirados por essa realidade, desenvolvemos uma solução que apoia pequenos empreendedores e promove a moda sustentável. Nossa missão é transformar a forma como as pessoas descobrem e consomem moda, valorizando peças únicas, cheias de história e com impacto positivo.</p>
            </div>

            <img src="./img/imagem_grupal.jpeg" alt="Imagem com os integrantes de grupo" />
          </div>

          <div className="alinhamento-nossa-misao-sobrenos">

            <h2>Nossa Missão</h2>

            <div className="alinhamento-container-dois-nossa-misao">

              <div className="container-um-nossa-misao">
                <img src="./img/icons/consumo_consciente.svg" alt="" />

                <h3>Consumo com consciência</h3>

                <p>Valorizar o que já existe e incentivar a moda circular.</p>
              </div>

              <div className="container-dois-nossa-misao">
                <img src="./img/icons/estrela_nossa_missao.svg" alt="" />

                <h3>Estilo acessível</h3>

                <p>Facilitar o acesso à moda sustentável para todos.</p>
              </div>

              <div className="container-tres-nossa-misao">
                <img src="./img/icons/apoio_aos_pequenos.svg" alt="" />

                <h3>Apoio Local</h3>

                <p>Dar visibilidade a brechós locais e empreendedores independentes.</p>
              </div>

              <div className="container-quatro-nossa-misao">
                <img src="./img/icons/moda_com_proposito.svg" alt="" />

                <h3>Moda com propósito</h3>

                <p>Conectar estilo e significado em cada escolha.</p>
              </div>
            </div>
          </div>

          <div className="container-quem-esta-por-tras">

            <h2>Quem está por trás?</h2>

            <div class="container-equipe-quem-esta-por-tras-sobrenos">

              <div class="membro-da-equipe">
                <img src="./img/maria_eduarda.svg" alt="Maria Eduarda" />
                <div class="hover-redes-nome-dos-membros">
                  <div className='redes-sociais'>
                    <p className='nome-do-membro'>Maria Eduarda</p>
                    <a href="https://www.linkedin.com/in/maria-eduarda-wolf-luiz-051825344/"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/wolf_eduarda12?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><i class="fab fa-instagram"></i></a>
                    <a href="https://github.com/dudawl18"><i class="fab fa-github"></i></a>
                  </div>
                </div>
              </div>

              <div class="membro-da-equipe">
                <img src="./img/gabriel.svg" alt="Gabriel Lacerda" />
                <div class="hover-redes-nome-dos-membros">
                  <div className='redes-sociais'>
                    <p className='nome-do-membro'>Gabriel Lacerda</p>
                    <a href="https://www.linkedin.com/in/gabriel-fernandes-a90649329/"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/_.lac.z?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><i class="fab fa-instagram"></i></a>
                    <a href="https://github.com/GabrielFerLacerda"><i class="fab fa-github"></i></a>
                  </div>
                </div>
              </div>

              <div class="membro-da-equipe">
                <img src="./img/mayara.svg" alt="Mayara" />
                <div class="hover-redes-nome-dos-membros">
                  <div className='redes-sociais'>
                    <p className='nome-do-membro'>Mayara Storl</p>
                    <a href="https://www.linkedin.com/in/mayara-storl-315ab9346/"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/storl_may?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><i class="fab fa-instagram"></i></a>
                    <a href="https://github.com/MayaraStorl"><i class="fab fa-github"></i></a>
                  </div>
                </div>
              </div>

              <div class="membro-da-equipe">
                <img src="./img/nicholas.svg" alt="Nicholas" />
                <div class="hover-redes-nome-dos-membros">
                  <div className='redes-sociais'>
                    <p className='nome-do-membro'>Nicholas Serencovich</p>
                    <a href="https://www.linkedin.com/in/nicholas-carvalho-2b73a5297/"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/nchls.08/"><i class="fab fa-instagram"></i></a>
                    <a href="https://github.com/nicholas-sc-08"><i class="fab fa-github"></i></a>
                  </div>
                </div>
              </div>

              <div class="membro-da-equipe">
                <img src="./img/alejandra.svg" alt="Alejandra" />
                <div class="hover-redes-nome-dos-membros">
                  <div className='redes-sociais'>
                    <p className='nome-do-membro'>Rinmarys Alejandra</p>
                    <a href="https://www.linkedin.com/in/rinmarys-monagas-a30083316/"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/rinmarys/"><i class="fab fa-instagram"></i></a>
                    <a href="https://github.com/rinmarys"><i class="fab fa-github"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default Sobre_nos

