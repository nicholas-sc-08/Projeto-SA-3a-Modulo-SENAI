import { useContext, useEffect } from 'react';
import './Pop_up_de_excluir_perfil.css'
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Pop_up_de_excluir_perfil({ fecharPopUpExcluir }) {

  const { array_brechos, set_array_brechos } = useContext(GlobalContext)
  const { array_enderecos, set_array_enderecos } = useContext(GlobalContext)
  const { array_produtos, set_array_produtos } = useContext(GlobalContext)
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext)

  async function buscar_brechos() {

    try {

      const brechos = await api.get(`/brechos`)
      set_array_brechos(brechos.data)

    } catch (erro) {

      console.error(erro)
    }
  }

  async function buscar_enderecos() {

    try {

      const enderecos = await api.get(`/enderecos`)
      set_array_enderecos(enderecos.data)

    } catch (erro) {

      console.error(erro)
    }
  }

  useEffect(() => {

    buscar_brechos()
    buscar_enderecos()

  }, [])


  async function excluir_todo_o_brecho() {

    try {
      await api.delete(`/brechos/${usuario_logado._id}`)

      console.log("Brechó logado excluído com sucesso!")

    } catch (erro) {

      console.error("Erro ao excluir o brechó", erro)
    }

    try {

      const endereco_brecho = array_enderecos.find(
      endereco => endereco._fk_id_brecho === usuario_logado._id)

      console.log("passou por aquiii", endereco_brecho);

      if (endereco_brecho) {
        
        console.log("passou por aqui");

        await api.delete(`/enderecos/${endereco._fk_id_brecho}`)

        console.log("Endereço do brecho excluído com sucesso!")
      }
    } catch (erro) {

      console.error("Erro ao excluir o endereco do brechó", erro)
    }

    // try {

    //   const produtosAExcluir = array_produtos.filter(
    //   produto => produto._fk_id_brecho !== usuario_logado._id)

    //   if (produtosAExcluir){
    //     await api.delete(`/produtos/${}`)
    //   }

    // } catch (erro) {

    //   console.error("Erro ao excluir os produtos do brechó", erro)
    // }

    set_usuario_logado([])
    navigate(`/`)

  }


  return (

    <div className="toda-a-tela-inteira">

      <div className="pop-up-excluir-perfil-content">

        <img src="./img/Ponto_de_interrogacao.svg" alt="Bolinha com um ponto de interrogação dentro" />
        <p>Tem certeza que deseja excluir essa conta?</p>

        <div className="botoes-pop-up-exluir-perfil-content">

          <button onClick={fecharPopUpExcluir} className="sair-button-excluir-perfil">Sair</button>
          <button onClick={excluir_todo_o_brecho} className="excluir-button-excluir-perfil">Excluir</button>

        </div>
      </div>

    </div>
  )
}

export default Pop_up_de_excluir_perfil
