import React from 'react'
import HeaderUsuario from '../../components/HeaderUsuario'
import Footer from '../../components/Footer';
import "./Sobre_nos.css";

export default function Sobre_nos() {
  return (
    <div>
        <HeaderUsuario />
        <div className='bibliografia-fly'>
          <div>
            
          </div>
            <h2>Nossa História</h2>
            <p>Somos a equipe de desenvolvimento do site Fly, composta por Mayara, Alejandra, Maria Eduarda, Nicholas e Gabriel. Cada um de nós trouxe suas habilidades e dedicação para criar e aprimorar este projeto, com o objetivo de entregar uma experiência única para os nossos usuários.
            A jornada até aqui não foi fácil, mas foi repleta de aprendizado, colaboração e muito esforço. Cada linha de código, cada ajuste e cada decisão tomada foram resultado do esforço conjunto dessa equipe talentosa. Trabalhamos muito para que o site Fly chegasse aonde está agora, e estamos orgulhosos do que conseguimos construir. Estamos apenas começando e seguimos comprometidos em melhorar continuamente a experiência de nossos usuários</p>
            <img src="./public/img/fotoEmGrupo.png" alt="" />
        </div>
        <div className='apresentando-equipe'>

        </div>
        <Footer />  
    </div>
  )
}
