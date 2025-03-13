import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {

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
          <div className="menu-content">
            <h3>Menu</h3>
            <Link>Início</Link>
            <Link>Explorar brechós</Link>
            <Link>Doações</Link>
            <Link>Buscar</Link>
          </div>
          <div className="ajuda-content">
            <h3>Ajuda</h3>
            <Link>Quem somos nós?</Link>
            <Link>Contato</Link>
            <Link>Termos & Condições </Link>
            <Link>Política de Privacidade</Link>
          </div>
          <div className="FAQ-content">
            <h3>FAQ</h3>
            <Link>Vender no Fly</Link>
            <Link>Como doar roupas</Link>
            <Link>Comprar</Link>
            <Link>Pagamentos</Link>
          </div>
        </div>
        <div className="parte-de-baixo-content">

        </div>
      </div>
    </div>
  )
}

export default Footer
