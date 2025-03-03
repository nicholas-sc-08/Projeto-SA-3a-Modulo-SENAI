import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function Cadastro_cliente_secao_inputs_tres() {
    
    const { endereco_do_cliente, set_endereco_do_cliente } = useContext(GlobalContext);
    useEffect(() => {

        if(endereco_do_cliente.cep.length === 8){

            buscar_cep();
        };

    }, [endereco_do_cliente.cep]);
    
    const buscar_cep = async () => {

            try {
                
                const resposta = await fetch(`https://viacep.com.br/ws/${endereco_do_cliente.cep}/json/`);
                const dados_do_endereco = await resposta.json();

                set_endereco_do_cliente({
                    ...endereco_do_cliente, 
                    bairro: dados_do_endereco.bairro,
                    logradouro: dados_do_endereco.logradouro,
                    estado: dados_do_endereco.uf,
                    cidade: dados_do_endereco.localidade
                });

            } catch (erro) {
              
                console.error(erro);
            };
        };

    return (
    <div>

        <label>CEP<span>*</span></label>
        <input type="text" required value={endereco_do_cliente.cep} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, cep: e.target.value})}/>

        <label>Bairro<span>*</span></label>
        <input type="text" value={endereco_do_cliente.bairro} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, bairro: e.target.value})}/>

        <label>Logradouro<span>*</span></label>
        <input type="text" required value={endereco_do_cliente.logradouro} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, logradouro: e.target.value})}/>
        
        <div className="container_cadastro_cliente_secao_inputs_tres_coluna_um">

            <label>Estado<span>*</span></label>
            <input type="text" maxLength={2} value={endereco_do_cliente.estado} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, estado: e.target.value})}/>

            <label>Número<span>*</span></label>
            <input type="text" required value={endereco_do_cliente.numero} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, numero: e.target.value})}/>
            
        </div>

        <div className="container_cadastro_cliente_secao_inputs_tres_coluna_um">

            <label>Cidade<span>*</span></label>
            <input type="text" value={endereco_do_cliente.cidade} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, cidade: e.target.value})}/>

            <label>Complemento<span>*</span></label>
            <input type="text" required value={endereco_do_cliente.complemento} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, complemento: e.target.value})}/>
            
        </div>
    </div>
  )
}

export default Cadastro_cliente_secao_inputs_tres