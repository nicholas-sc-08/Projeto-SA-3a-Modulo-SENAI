import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'

function CadastroBrechoSecaoInputsTres() {

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext)

  return (
    <div>
      <div className="container-inputs-cadastro-brecho-tres">

        <label>CEP<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
        <input type="text" placeholder='00000-000' required value={formCadastroBrecho.cep} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, cep: e.target.value })} />

        <label>Bairro</label>
        <input type="text" required value={formCadastroBrecho.bairro} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, bairro: e.target.value })} />

        <label>Logradouro</label>
        <input type="text" required value={formCadastroBrecho.logradouro} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, logradouro: e.target.value })} />
      </div>

      <div className="container-estado-cidade-cadastro-tres">

        <div className="input-estado-cidade-cadastro-tres">
          <label>Estado</label>
          <input type="text" required value={formCadastroBrecho.estado} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, estado: e.target.value })} />
        </div>

        <div className="input-estado-cidade-cadastro-tres">
          <label>Cidade</label>
          <input type="text" required value={formCadastroBrecho.cidade} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, cidade: e.target.value })} />
        </div>

      </div>

      <div className="container-numero-complemento-cadastro-tres">

        <div className="input-numero-complemento-cadastro-tres">
          <label>Número<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
          <input type="text" required value={formCadastroBrecho.estado} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, estado: e.target.value })} />
        </div>

        <div className="input-numero-complemento-cadastro-tres">
          <label>Complemento<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
          <input type="text" required value={formCadastroBrecho.cidade} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, cidade: e.target.value })} />
        </div>
        
      </div>

    </div>
  )
}

export default CadastroBrechoSecaoInputsTres
