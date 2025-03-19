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

        <div className='inputs-formulario-um-cadastro-brecho'>

            <label>Nome Completo<span>*</span></label>
            <input type="text" placeholder='Digite seu nome completo' required value={formCadastroBrecho.nome_vendedor} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, nome_vendedor: e.target.value })} />

            <label>Data de Nascimento<span>*</span></label>
            <input type="date" required value={formCadastroBrecho.data_de_nascimento_vendedor} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, data_de_nascimento_vendedor: e.target.value })} />

            <label>Senha<span>*</span></label>
            <input type="password" placeholder='Digite a sua senha' required value={formCadastroBrecho.senha} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, senha: e.target.value })} />

            <label>Confirmar Senha<span>*</span></label>
            <input type="password" placeholder='Confirme a sua senha' required value={formCadastroBrecho.confirmarSenha} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, confirmarSenha: e.target.value })} />

        </div>
      </div>
    </div >
  )
}

export default CadastroBrechoSecaoInputsUm
