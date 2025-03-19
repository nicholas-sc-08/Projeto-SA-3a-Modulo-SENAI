import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';
import '../pages/Cadastro/Cadastro_brecho.css';

function CadastroBrechoSecaoInputsUm() {

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext);

  return (
    <div>
      <div className="container-formulario-um-cadastro-brecho">
        <h1>Crie a sua conta Fly!</h1>
        <p>Complete os dados abaixo e comece a compartilhar seus produtos com o mundo!</p>

        <label>Número de Telefone<span>*</span></label>
        <input type="text" placeholder='(DDD) 99123-4567' required value={formCadastroBrecho.nome} onChange={e => setFormCadastroBrecho({...formCadastroBrecho, nome: e.target.value})}/>

      </div>
    </div>
  )
}

export default CadastroBrechoSecaoInputsUm
