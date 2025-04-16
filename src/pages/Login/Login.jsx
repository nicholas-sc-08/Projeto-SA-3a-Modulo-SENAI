import React, { useState, useEffect, useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import "./Login.css";

function Login() {
  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);

  const [formulario, set_formulario] = useState({ nome: '', email: '', senha: '' });
  const [erro, set_erro] = useState('');
  const [campos_vazios, set_campos_vazios] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  const navegar = useNavigate();

  useEffect(() => {
    informacoes_clientes();
  }, []);

  const informacoes_clientes = async () => {
    try {
      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);
    } catch (erro) {
      console.log(erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    }
  };

  function lidar_com_formulario(e) {
    e.preventDefault();

    const campos_vazios_temp = {
      nome: formulario.nome.trim() === '',
      email: formulario.email.trim() === '',
      senha: formulario.senha.trim() === '',
    };

    set_campos_vazios(campos_vazios_temp);

    const algum_vazio = Object.values(campos_vazios_temp).some(vazio => vazio);
    if (algum_vazio) {
      set_erro("");
      return;
    }

    const encontrar_usuario = array_clientes.find(cliente =>
      formulario.nome === cliente.nome &&
      formulario.email === cliente.email &&
      formulario.senha === cliente.senha
    );

    if (encontrar_usuario) {
      set_usuario_logado(encontrar_usuario);
      set_erro('');
      navegar(`/`);
    } else {
      set_erro('Usuário ou senha incorretos!');
    }
  }

  async function lidar_sucesso(tokenResponse) {
    try {
      const { access_token } = tokenResponse;

      const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const cliente_a_logar = {
        nome: data.name,
        email: data.email,
        imagem_de_perfil: data.picture,
      };

      const cliente_existente = array_clientes.find(
        cliente => cliente.email === cliente_a_logar.email
      );

      if (cliente_existente) {
        set_usuario_logado(cliente_existente);
        navegar('/');
      } else {
        const novo_cliente = {
          nome: cliente_a_logar.nome,
          email: cliente_a_logar.email,
          senha: `123`,
          telefone: ``,
          cpf: ``,
          data_de_nascimento: `2000-01-01`,
          imagem_de_perfil: cliente_a_logar.imagem_de_perfil
        };

        await axios.post(`http://localhost:3000/clientes`, novo_cliente);
        set_array_clientes([...array_clientes, novo_cliente]);
        set_usuario_logado(novo_cliente);
        set_erro('');
        navegar('/');
      }
    } catch (erro) {
      console.error("Erro ao logar com Google:", erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    }
  }

  function lidar_falha(erro) {
    console.error('Erro no login:', erro);
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: lidar_sucesso,
    onError: lidar_falha
  });

  return (
    <div className='container-corpo-login'>
      <form onSubmit={lidar_com_formulario}>
        <img className='logo-camadinha' src="./img/logo-verdeCamadinha2.svg" alt="" />
        <div className='ladoEsquerdo-container'>
          <h1>Sua conta te espera!</h1>
          <div className='info-login'>
            <label>Nome</label>
            <input
              type="text"
              className={campos_vazios.nome ? 'input-erro' : ''}
              value={formulario.nome}
              onChange={e => set_formulario({ ...formulario, nome: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              className={campos_vazios.email ? 'input-erro' : ''}
              value={formulario.email}
              onChange={e => set_formulario({ ...formulario, email: e.target.value })}
            />

            <label>Senha</label>
            <input
              type="password"
              className={campos_vazios.senha ? 'input-erro' : ''}
              value={formulario.senha}
              onChange={e => set_formulario({ ...formulario, senha: e.target.value })}
            />
          </div>

          <button type="button" onClick={loginGoogle} className="botao-google-custom">
            <img src="/img/google-icon.png" alt="Google" />
            Continuar com o Google
          </button>

          <button type='submit' className='fazer_login_butao'>Fazer login</button>

          {(campos_vazios.nome || campos_vazios.email || campos_vazios.senha) && (
            <p className="erro-campo">Todos os campos são obrigatórios</p>
          )}

          {erro && <p className='erro-campo erro-geral'>{erro}</p>}
        </div>

        <div className='ladoDireito-container'>
          <img className='estrelaMenor' src="./img/estrelaMenor.png" alt="" />
          <div className='info-ladoDireito'>
            <h1>Novo por aqui? Crie sua conta!</h1>
            <p>A moda circular nunca para! Que tal fazer parte desse movimento? <br /> Cadastre-se no Fly!</p>
            <button onClick={() => navegar('/cadastro_cliente')} type='button'>Cadastrar-se</button>
          </div>
          <img className='estrelaGrande' src="./img/estrelaGrande.png" alt="" />
        </div>
      </form>
    </div>
  );
}

export default Login;
