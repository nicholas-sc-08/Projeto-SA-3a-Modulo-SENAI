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
                <div className='cabecario-ft'>
                <div className='telefoneCirculo'><i class="bi bi-telephone"></i></div>
                <h3>Ligue para nós</h3>
                </div>

                <p>Estamos disponíveis 24 horas por dia, 7 dias por semana.</p>
                <h4>Telefone: +55 (48) 9999-9999</h4>
                <div className='linha-contato'></div>

                <div className='cabecario-ft'>
                <div className='telefoneCirculo'><i class="bi bi-telephone"></i></div>
                <h3>Escreva para nós</h3>
                </div>

                <p>Preencha nosso formulário e entraremos em contato com você em até 24 horas.</p>
                <h4>Emails: customer@exclusive.com</h4>
            </div>

        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
