import { useState, useRef } from 'react';
import "./Edicao_perfil_cliente.css";
import Footer from '../../components/Footer/Footer';
import Pop_up_mudar_endereco_cliente from '../../components/pop_up_usuario/Pop_up_mudar_endereco_cliente';
import Pop_up_menu_cliente from '../../components/pop_up_usuario/Pop_up_menu_cliente';
import { IMaskInput } from 'react-imask';

function Edicao_perfil_cliente() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [exibirPopUp, setExibirPopUp] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);

  // Definindo uma imagem para padrão no perfil cliente
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
          {/* Input que fica escondido até passar o mouse em cima e atraves dele o cliente consegue trocar foto*/}
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {/* Balão de escolha de foto que aparece ao passar o mouse */}
          <div className='busca-img-galeria' onClick={handleImageClick}>
            <div className='aviso-mudar-img'>
              <img src="./img/edit.svg" alt="Editar" />
              <h3>Escolher foto</h3>
            </div>
          </div>
        </div>

        <div className='info-edicao-cliente'>
          <div className='cabecario-edicao-cliente'><p>Edite seu Perfil</p></div>
          <div className='info01'>
            <div className='edicao-nome-cliente'>
              <label>Nome</label>
              <input type="text" placeholder='Nome de usuario'/>
            </div>
            <div className='edicao-telefone-cliente'>
              <label>Telefone</label>
              <IMaskInput
                  mask="(00) 00000-0000"
                  unmask="typed"
                  placeholder='(DD) 90000-0000'
                //onAccept
                />
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
            <input type="password" placeholder="Atual Senha" min={7} maxLength={12}/>
            <input type="password" placeholder="Nova Senha" min={7} maxLength={12}/>
            <input type="password" placeholder="Confirmar Senha" min={7} maxLength={12} />
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
