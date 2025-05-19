import '../components/Pop_up_menu_cliente.css'
import { Link } from 'react-router-dom';

function Pop_up_menu_cliente() {
  return (
    <div className="tela-inteira-cliente">
      <div className="menu-cliente">
        <div className='popUp-inicio'>
        <img src="./img/Home.svg" alt="" />
        <Link className='link-popUp-cliente' to={"/Tela_inicial"}>Inicio</Link>
        </div>
  
    <div className='popUp-sacola'>
      <img src="./img/Sacola.svg" alt="" />
      <Link className='link-popUp-cliente' to={"./pages/#"}>Sacola</Link>
    </div>

    <div className='popUp-sairConta'>
        <img src="./img/portinha.svg" alt="" />
        <Link className='link-popUp-cliente' to={"#"}>Sair da conta</Link>
    </div>
    </div>
    </div>
  )
}

export default Pop_up_menu_cliente
