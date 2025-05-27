import { useState, useRef } from 'react';
import "./Edicao_perfil_cliente.css";
import Footer from '../../components/Footer';
import Pop_up_mudar_endereco_cliente from '../../components/Pop_up_mudar_endereco_cliente';
import Pop_up_menu_cliente from '../../components/Pop_up_menu_cliente';

function Edicao_perfil_cliente() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [exibirPopUp, setExibirPopUp] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);

  // Estado para a imagem do perfil
  const [imgPerfil, setImgPerfil] = useState('./img/fotoPerfil.png');
  // Referência para o input file
  const inputFileRef = useRef(null);

  const alternarPopUpMenu = () => {
    setMostrarPopUp(prev => !prev);
    setExibirPopUp(false);
    console.log("Alternando pop-up de menu:", !mostrarPopUp);
  }

  const fecharPopUp = () => {
    setMostrarPopUp(false);
    console.log("Fechando pop-up de menu");
  }

  const fecharExibirPopUp = () => {
    setExibirPopUp(false);
    console.log("Fechando pop-up de endereço");
  };

  // Função para abrir o seletor de arquivos ao clicar na imagem
  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  // Função para ler o arquivo selecionado e atualizar a imagem
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgPerfil(e.target.result); // Atualiza a imagem com o conteúdo do arquivo
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className='sideBar-edicao-perfil-cliente'>
        <p>Bem-vindo(a)</p><h4>Nome do usuario</h4>

        <img 
          src={mostrarPopUp ? "./img/close.svg" : "./img/Justifyc-icon.svg"} 
          alt="Ícone de menu"
          onClick={alternarPopUpMenu} 
        />
      </div>

      <div className='container-edicao-perfil-cliente'>
        <div className='foto-edicao-perfil-cliente'>
          <img 
            src={imgPerfil} 
            alt="Foto de perfil"
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
          {/* Input file escondido */}
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <div className='info-edicao-cliente'>
          <div className='cabecario-edicao-cliente'><h2>Edite seu Perfil</h2></div>
          <div className='info01'>
            <div className='edicao-nome-cliente'>
              <label>Nome</label>
              <input type="text" placeholder='Nome de usuario'/>
            </div>
            <div className='edicao-telefone-cliente'>
              <label>Telefone</label>
              <input type="text" placeholder='+55 (DD) 99999-9999'/>
            </div>
          </div>

          <div className='info02'>
            <div className='edicao-email-cliente'>
              <label>Email</label>
              <input type="text" placeholder='usuario@gmail.com'/>
            </div>
            <div className="edicao-rua-cliente">
              <label>Endereço</label>
              <button onClick={() => setExibirPopUp(true)}>Clique para alterar</button>
            </div>
          </div>

          <div className='edicao-mudanca-senha'>
            <label>Mudança de senha</label>
            <input type="text" placeholder='Senha atual'/>
            <input type="text" placeholder='Nova senha'/>
            <input type="text" placeholder='Confirmar senha' />
            <div className='botoes-edicao-cliente'>
              <button className='but-cancelar-edicao-cliente'>Cancelar</button>
              <button className='but-salvar-edicao-cliente'>Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>

      {/* Componentes de pop-up */}
      {mostrarPopUp && <Pop_up_menu_cliente onClose={fecharPopUp} />}
      {exibirPopUp && <Pop_up_mudar_endereco_cliente onClose={fecharExibirPopUp} />}

      <Footer />
    </div>
  );
}

export default Edicao_perfil_cliente;
