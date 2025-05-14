import '../components/Pop_up_de_excluir_perfil.css'

function Pop_up_de_excluir_perfil() {

  return (

    <div className="toda-a-tela-inteira">

      <div className="pop-up-excluir-perfil-content">
        <img src="./img/Ponto_de_interrogacao.svg" alt="" />
        <p>Tem certeza que deseja excluir esse perfil?</p>
        <div className="botoes-pop-up-exluir-perfil-content">
          <button>Sair</button>
          <button>Excluir</button>
        </div>
      </div>

    </div>
  )
}

export default Pop_up_de_excluir_perfil
