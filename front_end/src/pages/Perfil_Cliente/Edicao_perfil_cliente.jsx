import { useContext, useState, useRef, useEffect } from 'react';
import "./Edicao_perfil_cliente.css";
import Footer from '../../components/Footer/Footer';
import Pop_up_mudar_endereco_cliente from '../../components/pop_up_usuario/Pop_up_mudar_endereco_cliente';
import Pop_up_menu_cliente from '../../components/pop_up_usuario/Pop_up_menu_cliente';
import { IMaskInput } from 'react-imask';
import { GlobalContext } from '../../contexts/GlobalContext';

function Edicao_perfil_cliente() {
  const {
    usuario_logado,
    endereco_do_cliente,
    set_usuario_logado
  } = useContext(GlobalContext);

  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [exibirPopUp, setExibirPopUp] = useState(false);
  const inputFileRef = useRef(null);
  const [imgPerfil, setImgPerfil] = useState(usuario_logado?.imagem_de_perfil || './img/fotoPerfil.png');

  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    if (usuario_logado) {
      setForm({
        nome: usuario_logado.nome || '',
        telefone: usuario_logado.telefone || '',
        email: usuario_logado.email || '',
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
      setImgPerfil(usuario_logado.imagem_de_perfil || './img/fotoPerfil.png');
    }
  }, [usuario_logado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async () => {
    try {
      const dadosAtualizados = {
        nome: form.nome,
        telefone: form.telefone,
        email: form.email,
        imagem_de_perfil: imgPerfil
      };

      // Só envia nova senha se ela tiver sido preenchida
      if (form.novaSenha && form.novaSenha === form.confirmarSenha) {
        dadosAtualizados.novaSenha = form.novaSenha;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/${usuario_logado._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados)
      });

      if (!response.ok) throw new Error("Erro ao atualizar cliente");

      const clienteAtualizado = await response.json();
      set_usuario_logado(clienteAtualizado);
      alert("Alterações salvas com sucesso! ✨");

    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao salvar. Tenta de novo 😢");
    }
  };

  const handleImageClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImgPerfil(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className='sideBar-edicao-perfil-cliente'>
        <p>Bem-vindo(a)</p>
        <h4>{form.nome || 'Nome do usuário'}</h4>
        <img
          src={mostrarPopUp ? "./img/close.svg" : "./img/Justifyc-icon.svg"}
          alt="Ícone de menu"
          onClick={() => setMostrarPopUp(prev => !prev)}
        />
      </div>

      <div className='container-edicao-perfil-cliente'>
        <div className='foto-edicao-perfil-cliente'>
          <img
            className='foto-base-perfil-cliente'
            src={imgPerfil}
            alt="Foto de perfil"
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
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
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome de usuário"
              />
            </div>
            <div className='edicao-telefone-cliente'>
              <label>Telefone</label>
              <IMaskInput
                name="telefone"
                mask="(00) 00000-0000"
                unmask="typed"
                value={form.telefone}
                onAccept={(value) => setForm(prev => ({ ...prev, telefone: value }))}
                placeholder='(DD) 90000-0000'
              />
            </div>
          </div>

          <div className='info02'>
            <div className='edicao-email-cliente'>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="usuario@gmail.com"
              />
            </div>
            <div className="edicao-rua-cliente">
              <label>Endereço</label>
              <button onClick={() => setExibirPopUp(true)}>Clique para alterar</button>
              <p style={{ fontSize: '0.9rem' }}>
                {endereco_do_cliente?.logradouro || "Endereço não cadastrado"}
              </p>
            </div>
          </div>

          <div className='edicao-mudanca-senha'>
            <label>Mudança de senha</label>
            <input
              type="password"
              name="senhaAtual"
              value={form.senhaAtual}
              onChange={handleChange}
              placeholder="Senha atual"
              min={7}
              maxLength={12}
            />
            <input
              type="password"
              name="novaSenha"
              value={form.novaSenha}
              onChange={handleChange}
              placeholder="Nova senha"
              min={7}
              maxLength={12}
            />
            <input
              type="password"
              name="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirmar senha"
              min={7}
              maxLength={12}
            />
            <div className='botoes-edicao-cliente'>
              <button className='but-cancelar-edicao-cliente'>Cancelar</button>
              <button className='but-salvar-edicao-cliente' onClick={handleSalvar}>
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarPopUp && <Pop_up_menu_cliente onClose={() => setMostrarPopUp(false)} />}
      {exibirPopUp && <Pop_up_mudar_endereco_cliente onClose={() => setExibirPopUp(false)} />}
      <Footer />
    </div>
  );
}

export default Edicao_perfil_cliente;
