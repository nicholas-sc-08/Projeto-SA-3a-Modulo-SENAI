import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import '../../pages/Cadastro/Cadastro_brecho.css';
import { IMaskInput } from 'react-imask';
import api from '../../services/api';

function CadastroBrechoSecaoInputsDois() {

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext);
  const { imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho } = useContext(GlobalContext)

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Mostrar imagen local inmediatamente:
    const imageUrl = URL.createObjectURL(file);
    setImagemPerfilCadastroBrecho(imageUrl);

    // Crear formData para enviar a Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho"); // esse nome deve bater com o preset criado no Cloudinary

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/fly-cloud-name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ Imagem enviada para Cloudinary:", data);
      
      if (data.secure_url) {
        // Guardar la URL pública en el estado global
        setFormCadastroBrecho({ ...formCadastroBrecho, logo: data.secure_url });

        // Actualizar la imagen perfil para mostrar la URL final (puedes cambiar si quieres seguir mostrando la local)
        setImagemPerfilCadastroBrecho(data.secure_url);

        // Liberar URL local para evitar leaks
        URL.revokeObjectURL(imageUrl);
      } else {
        console.error("Upload failed", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {

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
