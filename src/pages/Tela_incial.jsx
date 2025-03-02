import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';

function Tela_incial() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  
  useEffect(() => {

    informacoes_clientes();
  }, []);

  const informacoes_clientes = async () => {
    
    try {
      
      const resultado = await axios.get(`http://localhost:3000/usuarios`);
      set_array_clientes(resultado.data);  

    } catch (erro) {
      
      console.log(erro);      
    };
  };

  return (
    <div>
      <p>Sou a tela inicial</p>

      {array_clientes.map((usuario, i) => (

        <div key={i}>

          <p>Id: {usuario.id}</p>
          <p>Nome: {usuario.nome}</p>
          <p>Email: {usuario.email}</p>
          <p>Senha: {usuario.senha}</p>
          <p>Telefone: {usuario.telefone}</p>
          <p>Data de Nascimento: {usuario.data_de_nascimento}</p>
          <p>CPF: {usuario.cpf}</p>

        </div>
      ))}
    </div>
  )
}

export default Tela_incial
