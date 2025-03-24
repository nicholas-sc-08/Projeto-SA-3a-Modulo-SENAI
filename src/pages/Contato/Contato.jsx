import React from 'react'
import "./Contato.css";
import Footer from '../../components/Footer';
import HeaderUsuario from '../../components/HeaderUsuario';

export default function Contato() {
  return (
    <div>
      <HeaderUsuario />
      <div className='container-contato'>
        <p className='p-bege'>Início </p><p>/</p><p> Contato</p>
        <div className='info-contato'>
            <div className='info-para-contato'>
                <div className='telefoneCirculo'><i class="bi bi-telephone"></i></div>
            </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
