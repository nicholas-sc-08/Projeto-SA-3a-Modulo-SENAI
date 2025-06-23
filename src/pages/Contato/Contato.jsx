 import React, { useRef, useState } from 'react';
 import "./Contato.css";
 import Footer from '../../components/Footer/Footer';
 import Header from '../../components/Header/Header';
 import { Link } from 'react-router-dom';
 import emailjs from "emailjs-com";
 import { IMaskInput } from 'react-imask';
 import Pop_up_menssagem_enviada_contato from '../../components/pop_up_usuario/Pop_up_menssagem_enviada_contato';

 export default function Contato() {
   const form = useRef();
   const [exibirPopUp, setExibirPopUp] = useState(false);

   const fecharExibirPopUp = () => {
     setExibirPopUp(false);
   };

   const enviarEmail = (e) => {
     e.preventDefault();

     emailjs.sendForm(
       'service_Flyo0c7jha',
       'template_z8w6r3j',
       form.current,
       'FuV2-NbGYGtcHk_ha'
     )
     .then((result) => {
       console.log('Email enviado', result.text);
       setExibirPopUp(true);  // Só aqui que o pop-up aparece
       form.current.reset();  // Limpa o formulário depois do sucesso
     })
     .catch((error) => {
       console.log('Erro ao enviar', error.text);
     });
   };

   return (
     <div>
       <Header tipo='usuario' />

       <div className='cabecalho-tela-contato'>
         <Link className='link-tela-contato' to={"/."}>Início</Link>
         <p>/Contato</p>
       </div>

    <div className='corpo-contato'>
    {/* Informações de contato */}
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
            <h3>Envie um Email</h3>
          </div>
          <p>Preencha nosso formulário e entraremos em contato com você em até 24 horas.</p>
          <div className='detalhe-entre-em-contato'>
            <h3>Emails:</h3>
            <h4>customer@exclusive.com</h4>
          </div>
        </div>

       <div className='container-entre-em-contato'>
          <form ref={form} onSubmit={enviarEmail}>
             <div className='info-importante-entre-em-contato'>
                   <div className='nome-entre-em-contato'>
                 <label>Nome Completo</label>
                 <input type="text" name="from_name" required />
               </div>
               <div className='email-entre-em-contato'>
                 <label>Email</label>
                 <input type="email" name="from_email" required />
               </div>
               <div className='telefone-entre-em-contato'>
                 <label>Telefone</label>
                 <input type="tel" name="phone" required />
               </div>
             </div>

             <div className='menssagem-cliente-entre-em-contato'>
               <input type="text" name="message" placeholder='Escreva sua Mensagem' required />
             </div>

             <button onClick={() => setExibirPopUp(true)} type="submit" className='but-entre-em-contato'>Enviar Mensagem</button>
           </form>
         </div>
       </div>

       <Footer />

       {/* Pop-up só aparece no sucesso */}
       {exibirPopUp && (
         <Pop_up_menssagem_enviada_contato onClose={fecharExibirPopUp} />
       )}
     </div>
   );
 }

