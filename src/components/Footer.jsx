import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Footer.css'

function Footer() {

  const [divAberta, setDivAberta] = useState('menu')   // A div menu é definida para começar sempre aberta

  const alternarDiv = (div) => {
    setDivAberta(div)            // Faz com que tenha somente uma div (menu, ajuda, faq) aberta
  }

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
          <div className="menu-content" onClick={() => alternarDiv('menu')} style={{ height: divAberta === 'menu' ? '35%' : '7%' }}>
            <h3>MENU</h3>
            {divAberta === 'menu' && (
              <>
                <Link to={"/"}>Início</Link>
                <Link>Explorar brechós</Link>
                <Link>Doações</Link>
                <Link>Buscar</Link>
              </>

            )}

          </div>
          <div className="ajuda-content" onClick={() => alternarDiv('ajuda')} style={{ height: divAberta === 'ajuda' ? '35%' : '7%' }}> {/*style={{ height: alturaTopicosFt.ajuda }}*/}
            <h3>AJUDA </h3>
            {divAberta === 'ajuda' && (
              <>
                <Link>Quem somos nós?</Link>
                <Link>Contato</Link>
                <Link>Termos & Condições </Link>
                <Link>Política de Privacidade</Link>
              </>
            )}

          </div>
          <div className="FAQ-content" onClick={() => alternarDiv('faq')} style={{height: divAberta === 'faq' ? '35%' : '7%' }}>
            <h3>FAQ</h3>
            {divAberta == 'faq' && (
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
