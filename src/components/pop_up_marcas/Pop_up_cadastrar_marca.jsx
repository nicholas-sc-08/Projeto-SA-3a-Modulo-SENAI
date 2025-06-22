import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import './Pop_up_cadastrar_marca.css'

function Pop_up_cadastrar_marca() {

  const { imagemLogoMarca, setImagemLogoMarca } = useContext(GlobalContext)
  const {pop_up_de_cadastrar_marca, set_pop_up_de_cadastrar_marca} = useContext(GlobalContext)

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Mostrar imagen local inmediatamente:
    const imageUrl = URL.createObjectURL(file);
    setImagemLogoMarca(imageUrl);

    // Crear formData para enviar a Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho"); // Pon tu upload_preset real aquí

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/fly-cloud-name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        // Guardar la URL pública en el estado global
        // setFormCadastroBrecho({ ...formCadastroBrecho, logo: data.secure_url });

        // Actualizar la imagen perfil para mostrar la URL final (puedes cambiar si quieres seguir mostrando la local)
        setImagemLogoMarca(data.secure_url);

        // Liberar URL local para evitar leaks
        URL.revokeObjectURL(imageUrl);
      } else {
        console.error("Upload failed", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className='container-alinhamento-pop-up-marcas'>
      <div className="container-pup-up-marcas">
        <div className="container-imagem-degrade"></div>

        <div className="container-cadastrar-marca">
          <div className="alinhamento-button-sair-pop-up">
            <button onClick={() => set_pop_up_de_cadastrar_marca(false)} ><img src="./img/Botao_sair_cadastro_categoria.svg" alt="Sair" /></button>
          </div>

          <div className="container-titulo-cadastrar-marca">
            <h2>Cadastrar marca</h2>

            <div className="titulo-line-cadastrar-marca"></div>

            <p>Crie uma nova marca para organizar seus produtos com facilidade!</p>
          </div>

          <div className="adicionar-imagem-marca">

            <label className="imagem-cadastro-marca">
              <input type="file" onChange={handleImageChange} hidden />
              {imagemLogoMarca ? (
                <img src={imagemLogoMarca} alt="Imagem de perfil" className="imagem-marca" />
              ) : (
                <img src="./public/img/icons/inserirImagemCadastroBrecho.svg" className="icon-upload-marca" />
              )}
            </label>

            <label className="descricao-inserir-imagem-marca">Insira a logo da marca que deseja cadastrar</label>

          </div>

          <div className="container-alinhamento-input-cadastrar-marcas">
            <label>Nome da marca</label>
            <input type="text"
              placeholder='Insira o nome da marca'
            />
          </div>

          <div className="conatainer-button-cadastrar-marca">
            <button>Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pop_up_cadastrar_marca
