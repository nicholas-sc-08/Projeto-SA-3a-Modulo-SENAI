import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useMask } from '@react-input/mask';

function Cadastro_cliente_secao_inputs_dois() {

  const { form_de_cadastro_cliente, set_form_de_cadastro_cliente } = useContext(GlobalContext);
  
  return (
    <div>

        <label>Número de Telefone<span>*</span></label>
        <input type="text" required value={form_de_cadastro_cliente.telefone} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, telefone: e.target.value})}/>

        <label>CPF<span>*</span></label>
        <input type="text" value={form_de_cadastro_cliente.cpf} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, cpf: e.target.value})}/>

        <label>Data de Nascimento<span>*</span></label>
        <input type="date" required value={form_de_cadastro_cliente.data_de_nascimento} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, data_de_nascimento: e.target.value})}/>
        
    </div>
  )
}

export default Cadastro_cliente_secao_inputs_dois