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
   const [mensagemErro, setMensagemErro] = useState(``)

  const fecharExibirPopUp = () => {
    setExibirPopUp(false);
  };

  const enviarEmail = (e) => {
    e.preventDefault();

    //Verificação do email feita ANTES do envio
    const email = form.current.from_email.value;

    // Verifica se o e-mail contém um "@" e termina com domínio válido
    const emailValido =
      email.includes("@") &&
      (email.endsWith("@gmail.com") || email.endsWith("@hotmail.com"));

    if (!emailValido) {
      setMensagemErro(`O email deve conter "gmail.com" ou "hotmail.com"`);
      return; // Impede o envio
    }

    // Se o email estiver ok, continua com o envio normal
    emailjs
      .sendForm(
        'service_Flyo0c7jha',
        'template_z8w6r3j',
        form.current,
        'FuV2-NbGYGtcHk_ha'
      )
      .then((result) => {
        console.log('Email enviado', result.text);
        setExibirPopUp(true); // Só mostra pop-up se deu tudo certo
        form.current.reset(); // Limpa o form
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
        <div className='container-info-contato'>
          <div className='cabecario-info-contato'>
            <div className='circulo-icon-contato'><img src="./img/telefone.svg" alt="" /></div>
            <h3 className='ligue-contato'>Ligue Para Nós</h3>
          </div>
          <p>Estamos disponíveis 24 horas por dia, 7 dias por semana.</p>
          <div className='detalhe-entre-em-contato'>
            <h3>Telefone:</h3>
            <h4>+55 (48) 9974-9819</h4>
          </div>
          <hr />
          <div className='cabecario-info-contato'>
            <div className='circulo-icon-contato'><img src="./img/icons/envelope-mensagem-icon.svg" alt="" /></div>
            <h3 className='ligue-contato'>Envie um Email</h3>
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
                <input 
                type="text" 
                name="from_name" 
                placeholder='Mariazinha da Silva'
                required />
              </div>
              <div className='email-entre-em-contato'>
                <label>Email</label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>
              <div className='telefone-entre-em-contato'>
                <label>Telefone</label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  unmask="typed"
                  placeholder='(DD) 90000-0000'
                  required
                  name="phone"
                />
              </div>
            </div>

            <div className='menssagem-cliente-entre-em-contato'>
              <input type="text" name="message" placeholder='Escreva sua Mensagem' required />
            </div>

            <button type="submit" className='but-entre-em-contato'>Enviar Mensagem</button>
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
