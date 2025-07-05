import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'

import { IMaskInput } from 'react-imask';

function CadastroBrechoSecaoInputsTres() {

  const { enderecoDoBrecho, setEnderecoDoBrecho } = useContext(GlobalContext);

  useEffect(() => {

    if (enderecoDoBrecho.cep.length == 8) {
      buscarCep();
      console.log(enderecoDoBrecho);

    };

  }, [enderecoDoBrecho.cep]);

  async function buscarCep() {

    const resposta = await fetch(`https://viacep.com.br/ws/${enderecoDoBrecho.cep}/json/`);
    const dadosDoEndereco = await resposta.json();

    try {
      setEnderecoDoBrecho({
        ...enderecoDoBrecho,
        bairro: dadosDoEndereco.bairro,
        logradouro: dadosDoEndereco.logradouro,
        estado: dadosDoEndereco.uf,
        cidade: dadosDoEndereco.localidade
      });
      console.log(enderecoDoBrecho);

    } catch (erro) {

      console.error(erro);
    };
  };

  return (
    <div>
      <div className="container-inputs-cadastro-brecho-tres">

        <label>CEP<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
        <IMaskInput 
        mask="00000-000" 
        unmask="typed"
        placeholder='00000-000' 
        required 
        value={enderecoDoBrecho.cep} 
        onAccept={(value) => setEnderecoDoBrecho({ ...enderecoDoBrecho, cep: value })} // o onAccept é o método recomendado pela documentação do react-imask
        // onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, cep: e.target.value })} 
        />

        <label>Bairro</label>
        <input type="text" placeholder='Digite seu bairro' required value={enderecoDoBrecho.bairro} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, bairro: e.target.value })} />

        <label>Logradouro</label>
        <input type="text" required placeholder='Digite sua rua, avenida, etc..' value={enderecoDoBrecho.logradouro} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, logradouro: e.target.value })} />
      </div>

      <div className="container-estado-cidade-cadastro-tres">

        <div className="input-estado-cidade-cadastro-tres">
          <label>Estado</label>
          <input type="text" placeholder='Digite o estado' required value={enderecoDoBrecho.estado} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, estado: e.target.value })} />
        </div>

        <div className="input-estado-cidade-cadastro-tres">
          <label>Cidade</label>
          <input type="text" placeholder='Digite sua cidade' required value={enderecoDoBrecho.cidade} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, cidade: e.target.value })} />
        </div>

      </div>

      <div className="container-numero-complemento-cadastro-tres">

        <div className="input-numero-complemento-cadastro-tres">
          <label>Número<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
          <input type="text" placeholder='Número da residência' required value={enderecoDoBrecho.numero} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, numero: e.target.value })} />
        </div>

        <div className="input-numero-complemento-cadastro-tres">
          <label>Complemento<span className='span-obrigatorio-cadastro-brecho-tres'>*</span></label>
          <input type="text" placeholder='( Opcional )' value={enderecoDoBrecho.complemento} onChange={e => setEnderecoDoBrecho({ ...enderecoDoBrecho, complemento: e.target.value })} />
        </div>

      </div>

    </div>
  )
}

export default CadastroBrechoSecaoInputsTres
