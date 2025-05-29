import React from 'react'
import "./Contato.css";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

export default function Contato() {
  return (
    <div>
      <Header tipo='usuario' />

      <div className='cabecalho-tela-contato'>
      <Link className='link-tela-contato' to={"/."}>Início</Link>
        <p>/Contato</p>
      </div>

      <div className='container-info-contato'>
        <div className='cabecario-info-contato'>
          <div className='circulo-icon-contato'><img src=".img/telefone" alt="" /></div>
          <h3>Ligue Para Nós</h3>
        </div>
      </div>

      <div className='container-entre-em-contato'>

      </div>

    </div>
  )
}
