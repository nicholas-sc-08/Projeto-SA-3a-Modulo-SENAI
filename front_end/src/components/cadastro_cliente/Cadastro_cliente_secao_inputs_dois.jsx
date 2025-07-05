import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import '../../pages/Cadastro/Cadastro_cliente.css';

import { IMaskInput } from 'react-imask';

function Cadastro_cliente_secao_inputs_dois() {

  const { form_de_cadastro_cliente, set_form_de_cadastro_cliente } = useContext(GlobalContext);

  return (
    <div className='container_inputs_secao_um_e_dois'>

      <label>Número de Telefone<span>*</span></label>
      <IMaskInput
        type="text"
        mask="(00) 00000-0000" 
        // unmask="typed"
        placeholder='(DD) 90000-0000'
        required
        value={form_de_cadastro_cliente.telefone}
        onAccept={(value) => set_form_de_cadastro_cliente({ ...form_de_cadastro_cliente, telefone: value || '' })} // o onAccept é o método recomendado pela documentação do react-imask
        // onChange={e => set_form_de_cadastro_cliente({...form_de_cadastro_cliente, telefone: e.target.value})}
      />

      <label>CPF<span>*</span></label>
      <IMaskInput
        type="text"
        mask="000.000.000-00" 
        // unmask="typed"
        placeholder='000.000.000-00'
        value={form_de_cadastro_cliente.cpf}
        onAccept={(value) => set_form_de_cadastro_cliente({ ...form_de_cadastro_cliente, cpf: value || '' })}
        // onChange={e => set_form_de_cadastro_cliente({ ...form_de_cadastro_cliente, cpf: e.target.value })}
      />

      <label>Data de Nascimento<span>*</span></label>
      <input
        type="date"
        required value={form_de_cadastro_cliente.data_de_nascimento}
        onChange={e => set_form_de_cadastro_cliente({ ...form_de_cadastro_cliente, data_de_nascimento: e.target.value })}
      />

    </div>
  )
}

export default Cadastro_cliente_secao_inputs_dois