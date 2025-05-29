import '../components/Pop_up_de_excluir_perfil.css'

function Pop_up_de_excluir_perfil({ fecharPopUpExcluir }) {

  return (

    <div className="toda-a-tela-inteira">

      <div className="pop-up-excluir-perfil-content">

        <img src="./img/Ponto_de_interrogacao.svg" alt="Bolinha com um ponto de interrogação dentro" />
        <p>Tem certeza que deseja excluir essa conta?</p>

        <div className="botoes-pop-up-exluir-perfil-content">

          <button onClick={fecharPopUpExcluir} className="sair-button-excluir-perfil">Sair</button>
          <button className="excluir-button-excluir-perfil">Excluir</button>
          
        </div>
      </div>

    </div>
  )
}

export default Pop_up_de_excluir_perfil
