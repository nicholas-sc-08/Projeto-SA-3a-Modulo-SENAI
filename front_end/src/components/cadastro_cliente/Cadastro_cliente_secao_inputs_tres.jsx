import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import '../../pages/Cadastro/Cadastro_cliente.css';
import { useNavigate } from 'react-router-dom';

import { IMaskInput } from 'react-imask';
import axios from 'axios';

function Cadastro_cliente_secao_inputs_tres() {
    
    const { endereco_do_cliente, set_endereco_do_cliente } = useContext(GlobalContext);
    const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
    const navegar = useNavigate(``);

    useEffect(() => {

        if(endereco_do_cliente.cep.length == 9){

            buscar_cep();
        };

    }, [endereco_do_cliente.cep]);
    
    async function buscar_cep(){

            try {
                
                const resposta = await axios.get(`https://viacep.com.br/ws/${endereco_do_cliente.cep}/json/`);

                set_endereco_do_cliente({
                    ...endereco_do_cliente, 
                    bairro: resposta.data.bairro,
                    logradouro: resposta.data.logradouro,
                    estado: resposta.data.uf,
                    cidade: resposta.data.localidade
                });

            } catch (erro) {
              
                console.error(erro);
                set_erro_pagina(erro.massege);
                navegar(`/erro`);
            };
    };

    return (
    <div className='container-alinhamento-inputs-secao-tres'>

        <div className="secao_inputs_tres_p_um">

            <label>CEP<span>*</span></label>
            <IMaskInput 
            mask="00000-000" 
            // unmask="typed"
            placeholder='00000-000' 
            required 
            value={endereco_do_cliente.cep} 
            onAccept={(e) => set_endereco_do_cliente({ ...endereco_do_cliente, cep: e || ''})} // o onAccept é o método recomendado pela documentação do react-imask
            // onChange={e => set_endereco_do_cliente({...endereco_do_cliente, cep: e.target.value})}
            />

            <label>Bairro</label>
            <input type="text" placeholder='Digite seu bairro' required value={endereco_do_cliente.bairro} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, bairro: e.target.value})}/>

            <label>Logradouro</label>
            <input type="text" placeholder='Digite sua rua, avenida, etc..' required value={endereco_do_cliente.logradouro} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, logradouro: e.target.value})}/>
        
       </div>

        <div className="container_cadastro_cliente_secao_inputs_tres_alinhamento">
        
            <div className="container_cadastro_cliente_secao_inputs_tres_coluna_um">

                <label>Estado</label>
                <input type="text" placeholder='Digite o estado' minLength={2} maxLength={2} value={endereco_do_cliente.estado} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, estado: e.target.value})}/>

                <label>Número<span>*</span></label>
                <input type="text" placeholder='Número da residência' required value={endereco_do_cliente.numero} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, numero: e.target.value})}/>
                
            </div>

            <div className="container_cadastro_cliente_secao_inputs_tres_coluna_dois">

                <label>Cidade</label>
                <input type="text" placeholder='Digite sua cidade' value={endereco_do_cliente.cidade} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, cidade: e.target.value})}/>

                <label>Complemento<span>*</span></label>
                <input type="text" placeholder='( Opcional )' value={endereco_do_cliente.complemento} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, complemento: e.target.value})}/>
                
            </div>

        </div>
    </div>
  )
}

export default Cadastro_cliente_secao_inputs_tres