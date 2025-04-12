import React from 'react'
import HeaderUsuario from '../../components/HeaderUsuario'
import Footer from '../../components/Footer';
import "./Sobre_nos.css";

export default function Sobre_nos() {

  function mudarSlide(direcao) {
    const slides = document.querySelector('.equipe');
    const numSlides = document.querySelectorAll('.equipe img').length;
    
    indiceAtual += direcao;
    
    if (indiceAtual < 0) {
        indiceAtual = numSlides - 1;
    } else if (indiceAtual >= numSlides) {
        indiceAtual = 0;
    }
    
    slides.style.transform = `translateX(-${indiceAtual * 100}%)`;
}
                
  return (
    <div>
        {/* <HeaderUsuario /> */}
        <div className='bibliografia-fly'>
          <div className='sobre'>
            <h1>Nossa História</h1>
            <p> A ideia do Fly surgiu da experiência pessoal de um dos membros do nosso grupo de desenvolvedores. Sua mãe é dona de um brechó e, 
              diariamente, enfrenta o desafio de alcançar novos clientes e tornar seu negócio mais conhecido. Essa realidade nos motivou a criar 
              uma solução tecnológica que beneficie tanto pequenos empreendedores quanto consumidores que buscam alternativas mais acessíveis e 
              ecológicas no mundo da moda. Com isso, estamos desenvolvendo o Fly, um aplicativo pensado para conectar brechós a um público maior, 
              incentivando o consumo consciente e valorizando peças cheias de história. Acreditamos que, com essa iniciativa, poderemos transformar 
              a forma como as pessoas descobrem e interagem com o universo dos brechós.</p>
          </div>
            <img className='imgEmGrupo' src="./public/img/fotoEmGrupo.png" alt="" />          

        </div>
        <div className='apresentando-equipe'>
          <div className='equipe'>
              <img src="./public/img/Ale.jpg" alt="" />
              <h3>Maria Eduarda Wolf</h3>
              <p>Gestora e desenvolvedora front-end</p>
              <div className='icons-redesSociais'>
              <a href="https://www.linkedin.com/in/maria-eduarda-wolf-luiz-051825344/">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="https://www.instagram.com/wolf_eduarda12?igsh=MTFqY3Nncm02dDZyYw==">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a>
              </div>
          </div>

          <div className='equipe'>
              <img src="./public/img/May.jpg" alt="" />
              <h3>Mayara Storl</h3>
              <p>Desenvolvedora front-end e gestora de midia</p>
              <div className='icons-redesSociais'>
              <a href="www.linkedin.com/in/mayara-storl-315ab9346">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="https://www.instagram.com/storl_may/?igsh=ZzdpZHFlbXNjYzNn#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/MayaraStorl">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a>
              </div>

          </div>

          <div className='equipe'>
            <img src="./public/img/Dudinha.jpg" alt="" />
            <h3>Rinmarys Alejandra</h3>
            <p>Desenvolvedora front-end e gestora de midia</p>
            <div className='icons-redesSociais'>
              <a href="#">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a>
            </div>
          </div>

          <div className='equipe'>
            <img src="./public/img/Gabriel.jpg" alt="" />
            <h3>Gabriel Fernandes</h3>
            <p>Desenvolvedor back-end e gestor de dados</p>
            <div className='icons-redesSociais'>
            <a href="#">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a>
            </div>
          </div>

          <div className='equipe'>
            <img src="./public/img/Nicholas.jpeg" alt="" />
            <h3>Nicholas Serencovich</h3>
            <p>Desenvolvedor back-end e gestor de dados</p>
            <div className='icons-redesSociais'>
            <a href="#">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="#">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/dudawl18">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a>
            </div>
            <button class="prev" onclick="mudarSlide(-1)">&#10094;</button>
            <button class="next" onclick="mudarSlide(1)">&#10095;</button>
          </div>

        </div>
        <Footer />  
    </div>
  )
}
