import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import api from '../../services/api';
import './Pop_up_cadastrar_marca.css'

function Pop_up_cadastrar_marca() {

  const { array_marcas, set_array_marcas } = useContext(GlobalContext);
  const { imagemLogoMarca, setImagemLogoMarca } = useContext(GlobalContext)
  const { pop_up_de_cadastrar_marca, set_pop_up_de_cadastrar_marca } = useContext(GlobalContext)
  const { pop_up_notificacao_cadastro_marca, set_pop_up_notificacao_cadastro_marca } = useContext(GlobalContext);

  const [marca_a_cadastrar, set_marca_a_cadastrar] = useState({ nome: ``, logoMarca: `` })
  const [erro, set_erro] = useState(false);
  const [mensagem_de_erro, set_mensagem_de_erro] = useState(`Marca já cadastrada!`);

  async function buscar_marcas() {

    try {

      const marcas = await api.get(`/marcas`);
      set_array_marcas(marcas.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;


    // Pré-visualizar (opcional)
    const imageUrlTemp = URL.createObjectURL(file);
    setImagemLogoMarca(imageUrlTemp); // mostra imagem local temporária
    console.log(imagemLogoMarca)

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho"); // nome correto do preset no Cloudinary

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/fly-cloud-name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        console.log("Imagem carregada com sucesso:", data.secure_url);

        // Mostra imagem final da URL do Cloudinary
        setImagemLogoMarca(data.secure_url);

        // Atualiza logoMarca no estado da marca
        set_marca_a_cadastrar(prev => ({
          ...prev,
          logoMarca: data.secure_url,
        }));

        // Libera a URL local da imagem
        URL.revokeObjectURL(imageUrlTemp);
      } else {
        console.error("Erro ao subir imagem:", data);
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  async function cadastrar_marca() {

    try {

      const encontrar_marca_cadastrada = array_marcas.findIndex(marca => marca.nome.toUpperCase() === marca_a_cadastrar.nome.toUpperCase());

      console.log("Marca a cadastrar:", marca_a_cadastrar);

      if (encontrar_marca_cadastrada == -1) {

        await api.post(`/marcas`, marca_a_cadastrar);
        buscar_marcas();

        set_pop_up_de_cadastrar_marca(false);
        set_erro(false);
        set_pop_up_notificacao_cadastro_marca(true);

      } else {

        set_erro(true);
      };

    } catch (erro) {

      console.error(erro);
    };
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
              value={marca_a_cadastrar.nome}
              onChange={(e) => set_marca_a_cadastrar({ ...marca_a_cadastrar, nome: e.target.value })}
            />
          </div>

          <div className="conatainer-button-cadastrar-marca">
            <button onClick={cadastrar_marca}>Cadastrar</button>
            <p>{erro && mensagem_de_erro}</p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Pop_up_cadastrar_marca
