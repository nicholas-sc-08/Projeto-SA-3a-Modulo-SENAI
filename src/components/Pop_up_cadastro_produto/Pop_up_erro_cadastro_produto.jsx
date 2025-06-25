import React, { useEffect, useContext } from "react";
import "../Pop_up_cadastro_produto/Pop_up_erro_cadastro_produto.css";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

function Pop_up_erro_cadastro() {
  const { set_pop_up_erro_cadastro } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      set_pop_up_erro_cadastro(false);
      navigate('/gestao_estoque');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, set_pop_up_erro_cadastro]);

  return (
    <div className="pop-up-notificacao erro">
      <div className="conteudo">
        <img
          src="/img/icons/icone_de_erro.svg"
          alt="Erro"
          className="icone-notificacao"
        />
        <p>Erro ao cadastrar produto.</p>
      </div>
    </div>
  );
}

export default Pop_up_erro_cadastro;
