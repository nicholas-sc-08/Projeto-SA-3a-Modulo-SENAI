import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Footer.css'

function Footer() {


  // *** Quando funcionava as divs ficavam duas fechadas tanto no mobile quanto na desktop (provavelmente nao vou usar mais, porém, se deer erro volto a utilizar esse código) ***

  // const [divAberta, setDivAberta] = useState('menu')   // A div menu é definida para começar sempre aberta

  // const alternarDiv = (div) => {
  //   setDivAberta(div)            // Faz com que tenha somente uma div (menu, ajuda, faq) aberta
  // }


   // *** Código para as divs na desktop ficarem 'abertas' e no mobile (tela a partir de 914px) apenas uma fica 'aberta' ***
  
  const [divAberta, setDivAberta] = useState('menu')  // A div "menu" vai começar sempre aberta
  const [isMobile, setIsMobile] = useState(false)  // const que verifica se a tela ta em mobile (responsiva)

  useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 914px)")  // Aqui ele verifica se a tela do pc é menor ou igual a 914px (a largura dela)

    const verificarTamanhoTela = () => {
      setIsMobile(mediaQuery.matches)      // Retorna true se a tela for menor ou igual a 914px. Senão, ela retorna false.
    }

    verificarTamanhoTela()
    mediaQuery.addEventListener("change", verificarTamanhoTela)  // Vai atualizar a variável is Mobile sempre que houver uma mudança no tamanho

    return () => {
      mediaQuery.removeEventListener("change", verificarTamanhoTela)  // Remove o evento anterior pra ele não ser chamado de forma desnecessária 
    }
  }, [])

  const alternarDiv = (div) => {
    if (isMobile) {
      setDivAberta(div) // Na tela mobile/responsiva, faz com que tenha somente uma div (menu, ajuda, faq) aberta
    }
  }

  return (

    <div className="footer-content">
      <div className="conteudo-geral-meio">
        <div className="parte-de-cima-content">
          <div className="logo-mais-descricao-content">
            <div className="logo-e-titulo">
              <img className='logo-footer' src="/img/logo-verdeCamadinha2.svg" alt="" />
              <h3>FLY</h3>
            </div>
            <div className="descricao-footer">
              <p>Roupas com história, estilo com propósito. Encontre seu próximo garimpo!</p>
            </div>
          </div>
          <div className="menu-content" onClick={() => alternarDiv('menu')} style={{ height: isMobile ? (divAberta === 'menu' ? '35%' : '7%') : 'auto' }}>
            <h3>MENU</h3>
            {(divAberta === 'menu' || !isMobile) && (
              <>
                <Link to={"/"}>Início</Link>
                <Link>Explorar brechós</Link>
                <Link to={"/estamosChegando"}>Doações</Link>
                <Link to={"/buscarProdutos"}>Buscar</Link>
              </>

            )}

          </div>
          <div className="ajuda-content" onClick={() => alternarDiv('ajuda')} style={{ height: isMobile ? (divAberta === 'ajuda' ? '35%' : '7%') : 'auto' }}> 
            <h3>AJUDA </h3>
            {(divAberta === 'ajuda' || !isMobile) && (
              <>
                <Link to={"/sobre_nos"}>Quem somos nós?</Link>
                <Link to={"/estamosChegando"}>Contato</Link>
                <Link to={'/termosDeUso'}>Termos & Condições </Link>
                <Link to={'/PoliticaDePrivacidade'}>Política de Privacidade</Link>
              </>
            )}

          </div>
          <div className="FAQ-content" onClick={() => alternarDiv('faq')} style={{ height: !isMobile ? (divAberta === 'faq' ? '35%' : '51%') : 'auto' }}>
            <h3>FAQ</h3>
            {(divAberta == 'faq' || !isMobile) && (
              <>
                <Link to={"/estamosChegando"}>Vender no Fly</Link>
                <Link to={"/estamosChegando"}>Como doar roupas</Link>
                <Link to={"/buscarProdutos"}>Comprar</Link>
                <Link to={"/estamosChegando"}>Pagamentos</Link>
              </>
            )}

          </div>
        </div>
        <div className="linha-footer"></div>
        <div className="parte-de-baixo-content">
          <div className="rede-social-footer-content">
            <Link to="https://www.linkedin.com/in/fly-circular-76a172352/?locale=pt_BR" target='_blank'>
              <img src="/img/LinkedIn-icon.svg" alt="Linkedin" />
            </Link>

            <Link to="https://www.instagram.com/fly.circular/" target='_blank'>
              <img src="/img/Instagram-icon.svg" alt="Instagram" />
            </Link>

            <Link to="https://github.com/nicholas-sc-08/Projeto-SA-3a-Modulo-SENAI" target='_blank'>
              <img src="/img/Github-icon.svg" alt="Github" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
