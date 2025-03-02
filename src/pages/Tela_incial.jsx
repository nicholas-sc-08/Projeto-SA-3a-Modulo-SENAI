import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';

function Tela_incial() {

  const { array_usuarios, set_array_usuarios } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  
  useEffect(() => {

    fecth_usuarios();
  }, []);

  const fecth_usuarios = async () => {
    
    try {
      
      const resultado = await axios.get(`http://localhost:3000/usuarios`);
      set_array_usuarios(resultado.data);  

    } catch (erro) {
      
      console.log(erro);      
    };
  };

  return (
    <div>
      <p>Sou a tela inicial</p>

      {array_usuarios.map((usuario, i) => (

        <div key={i}>

          <p>Id: {usuario.id}</p>
          <p>Nome: {usuario.nome}</p>
          <p>Email: {usuario.email}</p>
          <p>Senha: {usuario.senha}</p>

        </div>
      ))}
    </div>
  )
}

export default Tela_incial
