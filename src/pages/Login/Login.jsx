import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import "./Login.css";

function Login() {
 
    //  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    //  const navegar = useNavigate(); 
    
    //  useEffect(() => {

    //      informacoes_clientes();
    //  }, []);
    
    //  const informacoes_clientes = async () => {
        
    //      try {
            
    //          const resultado = await axios.get(`http://localhost:3000/clientes`);
    //          set_array_clientes(resultado.data);
    //          console.log(resultado.data);
            
    //      } catch (erro) {
            
    //          console.log(erro);
    //      };
    //  };
    
    //  async function lidar_sucesso(res) {
        
    //      const cliente_a_logar = jwtDecode(res.credential);
    //      let email_ja_cadastrado = false;
    //      console.log(cliente_a_logar);
        

    //    for(let i = 0; i < array_clientes.length; i++){
  
    //      if(array_clientes[i].email == cliente_a_logar.email){

    //         email_ja_cadastrado = true;
    //      };
    //    };

    //    if(email_ja_cadastrado){

    //        console.log('Login bem-sucedido:', cliente_a_logar);
    //        navegar('/'); 
    //    } else {

    //      try {

    //          const novo_cliente = {

    //              nome: cliente_a_logar.name,
    //              email: cliente_a_logar.email,
    //              senha: `123`,
    //              telefone: ``,
    //              cpf: ``,
    //              data_de_nascimento: `2000-01-01`,
    //              imagem_de_perfil: cliente_a_logar.picture
    //          };

    //          const cadastrar_cliente = await axios.post(`http://localhost:3000/clientes`, novo_cliente);
    //          set_array_clientes([...array_clientes, novo_cliente]);
                  
    //          navegar('/'); 
        
    //      } catch (erro) {
          
    //          console.error(erro);
    //      };
    //    };
      
    //  };
  
    //  function lidar_falha(erro) {
    //    console.error('Erro no login:', erro);
    //  };
 
    return (
    <div className='container-corpo-login'>
        <div className='ladoEsquerdo-container'>
          <img src="./img/logo-verdeCamadinha2.svg" alt="" />
          <h1>Sua conta te espera</h1>
          <div className='info-login'>
          <label>Nome</label>
          <input type="text" />

          <label>Email</label>
          <input type="email" />

          <label>Senha</label>
          <input type="password" />
          </div>
          <button>Fazer Login</button>
        </div>
        <div className='ladoDireito-container'>
          <img src="./img/estrelaGrande.png" alt="" />
          <div className='info-ladoDireito'>
          <h1>Novo por aqui? Crie sua conta!</h1>
          <p>A moda circular nunca para! Que tal fazer parte desse movimento? Cadastre-se no Fly!</p>
          <button>Cadastrar-se</button>
          </div>
          <img src="./img/estrelaMenor.png" alt="" />
        </div>
         {/* <GoogleLogin onSuccess={lidar_sucesso} onError={lidar_falha}/> */}

    </div>
  )
}

export default Login