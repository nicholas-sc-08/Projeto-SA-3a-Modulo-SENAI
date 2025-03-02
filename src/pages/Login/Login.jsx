import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useContext } from 'react';
import { useEffect } from 'react';

function Login() {
 
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const [ email_ja_cadastrado, set_email_ja_cadastrado ] = useState(false);
    const navegar = useNavigate(); 
    
    useEffect(() => {

        informacoes_clientes();
    }, []);
    
    const informacoes_clientes = async () => {
        
        try {
            
            const resultado = await axios.get(`http://localhost:3000/usuarios`);
            set_array_clientes(resultado.data);
            console.log(resultado.data);
            
        } catch (erro) {
            
            console.log(erro);
        };
    };
    
    const lidar_sucesso = async (res) => {
        
        const cliente_a_logar = jwtDecode(res.credential);
      
      for(let i = 0; i < array_clientes.length; i++){
  
        if(array_clientes[i].email == cliente_a_logar.email){

            set_email_ja_cadastrado(true);
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
                senha: `123`
            };

            const cadastrar_cliente = await axios.post(`http://localhost:3000/usuarios`, novo_cliente);
            set_array_clientes([...array_clientes, novo_cliente]);
                  
            navegar('/'); 
        
        } catch (erro) {
          
            console.error(erro);
        };
      };
      
    };
  
    const lidar_falha = (erro) => {
      console.error('Erro no login:', erro);
    };
 
    return (
    <div>
        <GoogleLogin onSuccess={lidar_sucesso} onError={lidar_falha}/>
    </div>
  )
}

export default Login