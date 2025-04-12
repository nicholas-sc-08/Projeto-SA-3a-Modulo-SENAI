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
 
     const { array_clientes, set_array_clientes } = useContext(GlobalContext);
     const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
     const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
     const [ nome_cadastrado, set_nome_cadastrado ] = useState(false);
     const [ email_cadastrado, set_email_cadastrado ] = useState(false);
     const [ senha_cadastrado, set_senha_cadastrado ] = useState(false);
     const [ formulario, set_formulario ] = useState({nome: ``, email: ``, senha: ``});
     const [ erro, set_erro ] = useState(``);
     const navegar = useNavigate(); 
    
     useEffect(() => {

         informacoes_clientes();
     }, []);
    
     const informacoes_clientes = async () => {
        
         try {
            
             const resultado = await axios.get(`http://localhost:3000/clientes`);
             set_array_clientes(resultado.data);
             console.log(resultado.data);
            
         } catch (erro) {
            
             console.log(erro);
             set_erro_pagina(erro);
             navegar(`/erro`);
         };
     };

     function lidar_com_formulario(e){

      e.preventDefault();
      console.log(formulario);
    
      const encontrar_usuario = array_clientes.find(cliente => formulario.nome == cliente.nome && formulario.email == cliente.email && formulario.senha == cliente.senha);        

      if(encontrar_usuario){

        set_usuario_logado(encontrar_usuario);
        console.log(usuario_logado);
        
        set_erro(``);
        navegar(`/`);
      } else {

        set_erro(`Usuário ou senha incorretos!`);
      };

    };
    
     async function lidar_sucesso(res) {
        
         const cliente_a_logar = jwtDecode(res.credential);
         let email_ja_cadastrado = false;
         console.log(cliente_a_logar);
        

       for(let i = 0; i < array_clientes.length; i++){
  
         if(array_clientes[i].email == cliente_a_logar.email){

            email_ja_cadastrado = true;
            set_usuario_logado(array_clientes[i]);
         };
       };

       if(email_ja_cadastrado){

           console.log('Login bem-sucedido:', cliente_a_logar);
           navegar('/'); 
       } else {

         try {

             const novo_cliente = {

                 nome: cliente_a_logar.name,
                 email: cliente_a_logar.email,
                 senha: `123`,
                 telefone: ``,
                 cpf: ``,
                 data_de_nascimento: `2000-01-01`,
                 imagem_de_perfil: cliente_a_logar.picture
             };

             const cadastrar_cliente = await axios.post(`http://localhost:3000/clientes`, novo_cliente);
             set_array_clientes([...array_clientes, novo_cliente]);
             set_usuario_logado(novo_cliente);
             set_erro(``);
             navegar('/'); 
        
         } catch (erro) {
          
             console.error(erro);
             set_erro_pagina(erro);
             navegar(`/erro`);
         };
       };
      
     };
  
     function lidar_falha(erro) {
       console.error('Erro no login:', erro);
     };
 
    return (
    <div className='container-corpo-login'>
        <form onSubmit={lidar_com_formulario}>
        <div className='ladoEsquerdo-container'>
          <img className='logo-camadinha' src="./img/logo-verdeCamadinha2.svg" alt="" />
          <h1>Sua conta te espera</h1>
          <div className='info-login'>
          <label>Nome</label>
          <input type="text" placeholder='Nome Completo' value={formulario.nome} onChange={e => set_formulario({...formulario, nome: e.target.value})}/>

          <label>Email</label>
          <input type="email" placeholder='Exemplo@gmail.com' value={formulario.email} onChange={e => set_formulario({...formulario, email: e.target.value})}/>

          <label>Senha</label>
          <input type="password" placeholder='Senha' value={formulario.senha} onChange={e => set_formulario({...formulario, senha: e.target.value})}/>
          </div>
          <GoogleLogin onSuccess={lidar_sucesso} onError={lidar_falha} type='button'/>
          <button type='submit'>Fazer login</button>
          {erro}
        </div>
        <div className='ladoDireito-container'>
          <img className='estrelaMenor' src="./img/estrelaMenor.png" alt="" />
          <div className='info-ladoDireito'>
          <h1>Novo por aqui? Crie sua conta!</h1>
          <p>A moda circular nunca para! Que tal fazer parte desse movimento? Cadastre-se no Fly!</p>
          <button onClick={() => mudar_de_pagina(`#`)} type='button'>Cadastrar-se</button>
          </div>
          <img className='estrelaGrande' src="./img/estrelaGrande.png" alt="" />
        </div>
        </form>
    </div>
  )
}

export default Login