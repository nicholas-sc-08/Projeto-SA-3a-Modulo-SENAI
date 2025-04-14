import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'

function CadastroBrechoSecaoInputsTres() {

  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext)

    useEffect(() => {

        if(enderecoDoBrecho.cep.length === 9){

            buscarCep();
        };

    }, [enderecoDoBrecho.cep]);
    
    const buscarCep = async () => {

            try {
                
                const resposta = await fetch(`https://viacep.com.br/ws/${enderecoDoBrecho.cep}/json/`);
                const dadosDoEndereco = await resposta.json();

                setEnderecoDoBrecho({
                    ...enderecoDoBrecho, 
                    bairro: dadosDoEndereco.bairro,
                    logradouro: dadosDoEndereco.logradouro,
                    estado: dadosDoEndereco.uf,
                    cidade: dadosDoEndereco.localidade
                });

            } catch (erro) {
              
                console.error(erro);
            };
        };

  return (
    <div>
      <div className="container-inputs-cadastro-brecho-tres">

        <label>CEP<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
        <input type="text" placeholder='00000-000' required value={enderecoDoBrecho.cep} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, cep: e.target.value })} />

        <label>Bairro</label>
        <input type="text" required value={enderecoDoBrecho.bairro} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, bairro: e.target.value })} />

        <label>Logradouro</label>
        <input type="text" required value={enderecoDoBrecho.logradouro} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, logradouro: e.target.value })} />
      </div>

      <div className="container-estado-cidade-cadastro-tres">

        <div className="input-estado-cidade-cadastro-tres">
          <label>Estado</label>
          <input type="text" required value={enderecoDoBrecho.estado} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, estado: e.target.value })} />
        </div>

        <div className="input-estado-cidade-cadastro-tres">
          <label>Cidade</label>
          <input type="text" required value={enderecoDoBrecho.cidade} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, cidade: e.target.value })} />
        </div>

      </div>

      <div className="container-numero-complemento-cadastro-tres">

        <div className="input-numero-complemento-cadastro-tres">
          <label>Número<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
          <input type="text" required value={enderecoDoBrecho.numero} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, numero: e.target.value })} />
        </div>

        <div className="input-numero-complemento-cadastro-tres">
          <label>Complemento<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
          <input type="text" required value={enderecoDoBrecho.complemento} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, complemento: e.target.value })} />
        </div>
        
      </div>

    </div>
  )
}

export default CadastroBrechoSecaoInputsTres
