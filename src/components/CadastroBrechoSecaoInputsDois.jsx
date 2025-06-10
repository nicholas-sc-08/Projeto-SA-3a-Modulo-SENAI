import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';
import '../pages/Cadastro/Cadastro_brecho.css';

import { IMaskInput } from 'react-imask';

function CadastroBrechoSecaoInputsDois() {

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext);
  const { imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho } = useContext(GlobalContext)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemPerfilCadastroBrecho(imageUrl);
      setFormCadastroBrecho({...formCadastroBrecho, logo: imageUrl})
    }
  };

  useEffect( () => {

    console.log(formCadastroBrecho)

  }, [formCadastroBrecho])

  return (
    <div>
      <div className="container-formulario-um-cadastro-brecho">

        <div className="inputs-formulario-dois-cadastro-brecho">

          <div className="adicionar-imagem-perfil-cadastro-brecho">

            <label className="imagem-perfil-cadastro-brecho">
              <input type="file" onChange={handleImageChange} hidden />
              {imagemPerfilCadastroBrecho ? (
                <img src={imagemPerfilCadastroBrecho} alt="Imagem de perfil" className="imagem" />
              ) : (
                <img src="./public/img/icons/inserirImagemCadastroBrecho.svg" className="icon-upload" />
              )}
            </label>
            <label className="descricao">Como gostaria de ser lembrado? Insira a sua logo<span>*</span></label>

          </div>

          <label>Nome do seu brechó<span className='span-obrigatoria-cadastro-brecho-dois'>*</span></label>
          <input type="text" placeholder='Digite o nome do brechó' required value={formCadastroBrecho.nome_brecho} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, nome_brecho: e.target.value })} />

          <label>Email do brechó<span className='span-obrigatoria-cadastro-brecho-dois'>*</span></label>
          <input type="email" placeholder='brechó@gmail.com' required value={formCadastroBrecho.email} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, email: e.target.value })} />

          <label>Telefone do brechó<span className='span-obrigatoria-cadastro-brecho-dois'>*</span></label>
          <IMaskInput 
          mask="(00) 00000-0000" 
          // unmask="typed" 
          placeholder='(DD) 90000-0000' 
          required 
          value={formCadastroBrecho.telefone} 
          onAccept={(value) => setFormCadastroBrecho({ ...formCadastroBrecho, telefone: value })} // o onAccept é o método recomendado pela documentação do react-imask
          // onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, telefone: e.target.value })} 
          />



          <label>CNPJ<span className='span-opcional-cadastro-brecho'>(opcional)</span></label>
          <IMaskInput
          mask="00.000.000/0000-00" 
          // unmask="typed" 
          placeholder='00.000.000/0000-00' 
          value={formCadastroBrecho.cnpj}
          onAccept={(value) => setFormCadastroBrecho({ ...formCadastroBrecho, cnpj: value })}
          // onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, cnpj: e.target.value })} 
          />

        </div>

      </div>
    </div>
  )
}

export default CadastroBrechoSecaoInputsDois
