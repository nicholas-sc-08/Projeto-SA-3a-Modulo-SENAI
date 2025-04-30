import React, { useRef, useState } from 'react';
import HeaderUsuario from '../../components/HeaderUsuario';
import Footer from '../../components/Footer';
import "./Sobre_nos.css";

export default function Sobre_nos() {
  const carrosselRef = useRef(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const equipe = [
    { nome: "Maria Eduarda Wolf", 
      funcao: "Desenvolvedora front-end", 
      foto: "./public/img/Ale.jpg", 
      linkedin: "https://www.linkedin.com/in/maria-eduarda-wolf-luiz-051825344/", 
      instagram: "https://www.instagram.com/wolf_eduarda12?igsh=MTFqY3Nncm02dDZyYw==", 
      github: "https://github.com/dudawl18" },


    { nome: "Mayara Storl", 
      funcao: "Desenvolvedora front-end", 
      foto: "./public/img/May.jpg", 
      linkedin: "https://www.linkedin.com/in/mayara-storl-315ab9346", 
      instagram: "https://www.instagram.com/storl_may/?igsh=ZzdpZHFlbXNjYzNn#", 
      github: "https://github.com/MayaraStorl" },


    { nome: "Rinmarys Alejandra", 
      funcao: "Desenvolvedora front-end", 
      foto: "./public/img/Dudinha.jpg", 
      linkedin: "#", 
      instagram: "#", 
      github: "https://github.com/dudawl18" },


    { nome: "Gabriel Fernandes", 
      funcao: "Desenvolvedor back-end", 
      foto: "./public/img/Gabriel.jpg", 
      linkedin: "#", 
      instagram: "#", 
      github: "https://github.com/dudawl18" },


    { nome: "Nicholas Serencovich", 
      funcao: "Desenvolvedor back-end", 
      foto: "./public/img/Nicholas.jpeg", 
      linkedin: "#", 
      instagram: "#", 
      github: "https://github.com/dudawl18" }
  ];

  function mudarSlide(index) {
    const { current } = carrosselRef;
    const larguraSlide = current.offsetWidth;
    current.scrollTo({ left: larguraSlide * index, behavior: "smooth" });
    setIndiceAtual(index);
  }

  return (
    <div>
      {/* <HeaderUsuario /> */}

      <div className='bibliografia-fly'>
        <div className='sobre'>
          <h1>Nossa História</h1>
          <p>A plataforma Fly foi criada com o objetivo de conectar brechós a um público mais amplo, proporcionando uma experiência de compra prática, eficiente e consciente. 
            A ideia surgiu a partir da experiência de um dos membros do nosso time, cuja mãe é dona de um brechó e enfrenta, todos os dias, a dificuldade de alcançar novos 
            clientes e dar visibilidade ao seu negócio. Motivados por essa realidade, decidimos criar uma solução tecnológica que beneficie tanto pequenos empreendedores quanto 
            consumidores que buscam opções mais acessíveis e sustentáveis no mundo da moda.</p>
          <p> O Fly tem como missão transformar a forma como as pessoas descobrem e interagem com brechós, incentivando o consumo consciente e valorizando peças únicas e cheias de 
            história. Ao facilitar o acesso a essas alternativas, queremos não apenas apoiar pequenos negócios, mas também promover a moda sustentável, oferecendo uma maneira mais 
            prática de encontrar e comprar peças com personalidade. Acreditamos que, com essa plataforma, podemos gerar um impacto positivo tanto na indústria da moda quanto na forma 
            como as pessoas consomem de maneira mais responsável.</p>
        </div>
        <img className='imgEmGrupo' src="./public/img/notebook.jpeg" alt="Equipe reunida" />
      </div>

      <div className='apresentando-equipe'>
        <div className='carrossel-container'>
          <div className='carrossel-scroll' ref={carrosselRef}>
            {equipe.map((membro, index) => (
              <div className='card-membro' key={index}>
                <img src={membro.foto} alt={membro.nome} />
                <h3>{membro.nome}</h3>
                <p>{membro.funcao}</p>
                <div className='icons-redesSociais'>
                  <a href={membro.linkedin} target="_blank" rel="noreferrer">
                    <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
                  </a>
                  <a href={membro.instagram} target="_blank" rel="noreferrer">
                    <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
                  </a>
                  <a href={membro.github} target="_blank" rel="noreferrer">
                    <img src="./public/img/Github-icon.svg" alt="Github" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* BOLINHAS DE NAVEGAÇÃO */}
          <div className='bolinhas-navegacao'>
            {equipe.map((_, index) => (
              <span
                key={index}
                className={indiceAtual === index ? "bolinha ativa" : "bolinha"}
                onClick={() => mudarSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
