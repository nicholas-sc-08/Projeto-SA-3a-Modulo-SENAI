import React from 'react'
import "./Contato.css";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

export default function Contato() {
  return (
    <div>
      <Header tipo='usuario' />
      <div className='cabecalho-tela-contato'>
      <Link className='link-tela-contato' to={"/."}>Início</Link>
        <p>/Contato</p>
      </div>
      <div className='corpo-contato'>

      <div className='container-info-contato'>
        <div className='cabecario-info-contato'>
          <div className='circulo-icon-contato'><img src="./img/telefone.svg" alt="" /></div>
          <h3>Ligue Para Nós</h3>
        </div>
          <p>Estamos disponíveis 24 horas por dia, 7 dias por semana.</p>
          <div className='detalhe-entre-em-contato'>
            <h3>Telefone:</h3>
            <h4>+55 (48) 9999-9999</h4>
          </div>
          <hr />
          <div className='cabecario-info-contato'>
          <div className='circulo-icon-contato'><img src="./img/icons/envelope-mensagem-icon.svg" alt="" /></div>
          <h3>Ligue Para Nós</h3>
        </div>
        <p>Preencha nosso formulário e entraremos em contato com você em até 24 horas.</p>
          <div className='detalhe-entre-em-contato'>
            <h3>Emails:</h3>
            <h4>customer@exclusive.com</h4>
          </div>
      </div>

      <div className='container-entre-em-contato'>
      <div className='info-importante-entre-em-contato'>
      <div className='nome-entre-em-contato'>
        <label>Nome Completo</label>
        <input type="text" />
      </div>
      <div className='email-entre-em-contato'>
        <label>Email</label>
        <input type="text" />
      </div>
      <div className='telefone-entre-em-contato'>
        <label>Telefone</label>
        <input type="number" />
      </div>
      </div>

      <div className='menssagem-cliente-entre-em-contato'>
        <input type="text" placeholder='Escreva sua Menssagem'/>
      </div>

      <button className='but-entre-em-contato'>Enviar Menssagem</button>
      </div>
      </div>
      <Footer />

    </div>
  )
}


