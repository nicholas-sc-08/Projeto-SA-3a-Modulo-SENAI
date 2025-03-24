import React, { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';
import '../pages/Cadastro/Cadastro_brecho.css';

function CadastroBrechoSecaoInputsDois() {

  const { formCadastroBrecho, setFormCadastroBrecho } = useContext(GlobalContext);
  const [previewImage, setPreviewImage] = useState(`./img/estrelaGrande.png`);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormCadastroBrecho({ ...formCadastroBrecho, fotoPerfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="container-formulario-um-cadastro-brecho">

        <div className="inputs-formulario-dois-cadastro-brecho">

          <div className="cadastrar-imagem-perfil-brecho">

            <div className="alinhamento-cadastrar-imagem-perfil-brecho">

              <label>Como gostaria de ser lembrado? Insira a sua logo!<span>*</span></label>
              <input type="file" accept="image/*" onChange={handleImageChange} />

            </div>
            
            {previewImage && <img src={previewImage} alt="Prévia da Foto" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />}
          </div>

          <label>Nome do seu brechó<span className='span-obrigatoria-cadastro-brecho-dois'>*</span></label>
          <input type="text" placeholder='Digite o nome do brechó' required value={formCadastroBrecho.nome_brecho} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, nome_brecho: e.target.value })} />

          <label>Email do brechó<span className='span-obrigatoria-cadastro-brecho-dois'>*</span></label>
          <input type="email" placeholder='brechó@gmail.com' required value={formCadastroBrecho.email} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, email: e.target.value })} />

          <label>Telefone do brechó<span className='span-obrigatoria-cadastro-brecho-dois'>*</span></label>
          <input type="text" placeholder='(DD) 99123-4567' required value={formCadastroBrecho.telefone} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, telefone: e.target.value })} />

          <label>CNPJ<span className='span-opcional-cadastro-brecho'>(opcional)</span></label>
          <input type="text" placeholder='00.000.000/0000-00' value={formCadastroBrecho.CNPJ} onChange={e => setFormCadastroBrecho({ ...formCadastroBrecho, CPNJ: e.target.value })} />
        </div>

      </div>
    </div>
  )
}

export default CadastroBrechoSecaoInputsDois
