import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Footer.css'

function Footer() {

  const [abrirMenuDiv, setAbrirMenuDiv] = useState(false)
  const [abrirAjudaDiv, setAbrirAjudaDiv] = useState(false)
  const [abrirFaqDiv, setAbrirFaqDiv] = useState(false)

  const alternarDiv = (div) => {
    setAbrirMenuDiv(div === 'menu' ? !abrirMenuDiv : false)
    setAbrirAjudaDiv(div === 'ajuda' ? !abrirAjudaDiv : false)
    setAbrirFaqDiv(div === 'faq' ? !abrirFaqDiv : false)
  }

  const [alturaTopicosFt, setAlturaTopicosFt] = useState({menu : '10%', ajuda : '10%', faq : '10%'})

  useEffect(() => {

    if(abrirMenuDiv){

      setAlturaTopicosFt({...alturaTopicosFt, menu: '30%'});
    };

  }, [abrirMenuDiv]);

  return (

    <div className="footer-content">
      <div className="conteudo-geral-meio">
        <div className="parte-de-cima-content">
          <div className="logo-mais-descricao-content">
            <div className="logo-e-titulo">
              <img className='logo-footer' src="./public/img/logo-verdeCamadinha2.svg" alt="" />
              <h3>FLY</h3>
            </div>
            <div className="descricao-footer">
              <p>Roupas com história, estilo com propósito. Encontre seu próximo garimpo!</p>
            </div>
          </div>
          <div className="menu-content" onClick={() => alternarDiv('menu')} style={{height: alturaTopicosFt.menu}}>
            <h3>MENU</h3>
            {abrirMenuDiv && (
              <>
                <Link to={"/"}>Início</Link>
                <Link>Explorar brechós</Link>
                <Link>Doações</Link>
                <Link>Buscar</Link>
              </>

            )}

          </div>
          <div className="ajuda-content" onClick={() => alternarDiv('ajuda')}>
            <h3>AJUDA</h3>
            {abrirAjudaDiv && (
              <>
                <Link>Quem somos nós?</Link>
                <Link>Contato</Link>
                <Link>Termos & Condições </Link>
                <Link>Política de Privacidade</Link>
              </>
            )}

          </div>
          <div className="FAQ-content" onClick={() => alternarDiv('faq')}>
            <h3>FAQ</h3>
            {abrirFaqDiv && (
              <>
                <Link>Vender no Fly</Link>
                <Link>Como doar roupas</Link>
                <Link>Comprar</Link>
                <Link>Pagamentos</Link>
              </>
            )}
          
          </div>
        </div>
        <div className="linha-footer"></div>
        <div className="parte-de-baixo-content">
          <div className="rede-social-footer-content">
            <a href="https://www.linkedin.com/in/fly-circular-76a172352/?locale=pt_BR">
              <img src="./public/img/LinkedIn-icon.svg" alt="Linkedin" />
            </a>

            <a href="https://www.instagram.com/fly.circular/">
              <img src="./public/img/Instagram-icon.svg" alt="Instagram" />
            </a>

            <a href="https://github.com/nicholas-sc-08/Projeto-SA-3a-Modulo-SENAI">
              <img src="./public/img/Github-icon.svg" alt="Github" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
