import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import '../pages/Cadastro/Cadastro_cliente.css';

function Cadastro_cliente_secao_inputs_tres() {
    
    const { endereco_do_cliente, set_endereco_do_cliente } = useContext(GlobalContext);
    useEffect(() => {

        if(endereco_do_cliente.cep.length === 9){

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

        <div className="secao_inputs_tres_p_um">

            <label>CEP<span>*</span></label>
            <input type="text" placeholder='00000-000' required value={endereco_do_cliente.cep} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, cep: e.target.value})}/>

            <label>Bairro<span>*</span></label>
            <input type="text" placeholder='Digite seu bairro' value={endereco_do_cliente.bairro} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, bairro: e.target.value})}/>

            <label>Logradouro<span>*</span></label>
            <input type="text" placeholder='Digite sua rua, avenida, etc..' required value={endereco_do_cliente.logradouro} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, logradouro: e.target.value})}/>
        
       </div>

        <div className="container_cadastro_cliente_secao_inputs_tres_alinhamento">
        
            <div className="container_cadastro_cliente_secao_inputs_tres_coluna_um">

                <label>Estado<span>*</span></label>
                <input type="text" placeholder='Digite o estado' maxLength={2} value={endereco_do_cliente.estado} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, estado: e.target.value})}/>

                <label>Número<span>*</span></label>
                <input type="text" placeholder='Número da residência' required value={endereco_do_cliente.numero} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, numero: e.target.value})}/>
                
            </div>

            <div className="container_cadastro_cliente_secao_inputs_tres_coluna_dois">

                <label>Cidade<span>*</span></label>
                <input type="text" placeholder='Digite sua cidade' value={endereco_do_cliente.cidade} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, cidade: e.target.value})}/>

                <label>Complemento</label>
                <input type="text" placeholder='( Opcional )' value={endereco_do_cliente.complemento} onChange={e => set_endereco_do_cliente({...endereco_do_cliente, complemento: e.target.value})}/>
                
            </div>

        </div>
    </div>
  )
}

export default Cadastro_cliente_secao_inputs_tres