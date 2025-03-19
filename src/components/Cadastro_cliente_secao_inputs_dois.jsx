import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import '../pages/Cadastro/Cadastro_cliente.css';

function Cadastro_cliente_secao_inputs_dois() {

  const { form_de_cadastro_cliente, set_form_de_cadastro_cliente } = useContext(GlobalContext);
  
  return (
    <div className='container_inputs_secao_um_e_dois'>

        <label>Número de Telefone<span>*</span></label>
        <input type="text" placeholder='(DD) 99123-4567' required value={form_de_cadastro_cliente.telefone} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, telefone: e.target.value})}/>

        <label>CPF<span>*</span></label>
        <input type="text" placeholder='000.000.000-00' value={form_de_cadastro_cliente.cpf} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, cpf: e.target.value})}/>

        <label>Data de Nascimento<span>*</span></label>
        <input type="date" required value={form_de_cadastro_cliente.data_de_nascimento} onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, data_de_nascimento: e.target.value})}/>
        
    </div>
  )
}

export default Cadastro_cliente_secao_inputs_dois