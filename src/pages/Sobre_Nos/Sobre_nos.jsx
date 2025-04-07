import React from 'react'
import HeaderUsuario from '../../components/HeaderUsuario'
import Footer from '../../components/Footer';
import "./Sobre_nos.css";

export default function Sobre_nos() {
  return (
    <div>
        <HeaderUsuario />
        <div className='bibliografia-fly'>
          <div className='sobre'>
            <h1>Nossa História</h1>
            <p>Somos a equipe de desenvolvimento do site Fly, composta por Mayara, Alejandra, Maria Eduarda, Nicholas e Gabriel. Cada um de nós trouxe suas habilidades e dedicação para criar e aprimorar este projeto, com o objetivo de entregar uma experiência única para os nossos usuários.
            A jornada até aqui não foi fácil, mas foi repleta de aprendizado, colaboração e muito esforço. Cada linha de código, cada ajuste e cada decisão tomada foram resultado do esforço conjunto dessa equipe talentosa. Trabalhamos muito para que o site Fly chegasse aonde está agora, e estamos orgulhosos do que conseguimos construir. Estamos apenas começando e seguimos comprometidos em melhorar continuamente a experiência de nossos usuários</p>
          </div>
            <img src="./public/img/fotoEmGrupo.png" alt="" />          

        </div>
        <div className='apresentando-equipe'>
          <div className='equipe'>
              <img src="./public/img/Ale.jpg" alt="" />
              <h3>Maria Eduarda Wolf</h3>
              <p>Gestora e desenvolvedora front-end</p>
              {/* <a href="#">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a> */}
          </div>

          <div className='equipe'>
              <img src="./public/img/May.jpg" alt="" />
              <h3>Mayara Storl</h3>
              <p>Desenvolvedora front-end e marketing digital</p>
                           {/* <a href="#">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a> */}
          </div>

          <div className='equipe'>
            <img src="./public/img/Dudinha.jpg" alt="" />
            <h3>Rinmarys Alejandra Monagas</h3>
            <p>Desenvolvedora front-end e UX</p>
                               {/* <a href="#">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a> */}
          </div>

          <div className='equipe'>
            <img src="./public/img/Gabriel.jpg" alt="" />
            <h3>Gabriel Fernandes</h3>
            <p>Desenvolvedor back-end</p>
          </div>

          <div className='equipe'>

            <h3>Nicholas Serencovich</h3>
            <p>Desenvolvedor back-end</p>
          </div>

        </div>
        <Footer />  
    </div>
  )
}
