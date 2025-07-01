import './Pop_up_menu_cliente.css';
import { Link } from 'react-router-dom';

function Pop_up_menu_cliente({ onClose }) {
  return (
    <div className="tela-inteira-cliente">
      {/* Área clicável para fechar o menu */}
      <div className="menu-cliente">

        {/* Botão de fechar no topo */}
        <button className="botao-fechar-popUp">
          <img src="./img/close.svg" alt="Fechar menu" onClick={onClose} />
        </button>

        <div className='popUp-inicio'>
          <img src="./img/Home.svg" alt="" />
          <Link className='link-popUp-cliente' to={"/."}>Início</Link>
        </div>

        <div className='popUp-sacola'>
          <img src="./img/Sacola.svg" alt="" />
          <Link className='link-popUp-cliente' to={"./Components/Sacola_geral"}>Sacola</Link>
        </div>

        <div className='popUp-sairConta'>
          <img src="./img/portinha.svg" alt="" />
          <Link className='link-popUp-cliente' to={"#"}>Sair da conta</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Pop_up_menu_cliente;
