import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';

function Cadastro_cliente_secao_inputs_um() {
  
  const { form_de_cadastro_cliente, set_form_de_cadastro_cliente } = useContext(GlobalContext);
  const [tipo_do_inpt_senha, set_tipo_do_inpt_senha] = useState(`password`);
  const [tipo_senha, set_tipo_senha] = useState(true);

  useEffect(() => {

    if(tipo_senha){

      set_tipo_do_inpt_senha(`password`);
    } else {
      
      set_tipo_do_inpt_senha(`text`);
    };

  }, [tipo_senha]);

  return (
    <div>

        <label>Nome Completo<span>*</span></label>
        <input type="text" required value={form_de_cadastro_cliente.nome} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, nome: e.target.value})}/>

        <label>Email<span>*</span></label>
        <input type="email" required value={form_de_cadastro_cliente.email} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, email: e.target.value})}/>

        <label>Senha<span>*</span></label>
        <input type={tipo_do_inpt_senha} required value={form_de_cadastro_cliente.senha} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, senha: e.target.value})}/>

        <label>Confirmar senha:<span>*</span></label>
        <input type={tipo_do_inpt_senha} required value={form_de_cadastro_cliente.confirmar_senha} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, confirmar_senha: e.target.value})}/>
        <button type='button' onClick={() => set_tipo_senha(!tipo_senha)}>Mostrar senha</button>
    </div>
  )
}

export default Cadastro_cliente_secao_inputs_um