// src/components/Pop_up_erro_cadastro/Pop_up_erro_cadastro.jsx
import React, { useEffect, useContext } from "react";
import "../Pop_up_cadastro_produto/Pop_up_cadastro_produto.css"; // Reutiliza o CSS
import { GlobalContext } from "../../contexts/GlobalContext";

 function Pop_up_cadastro_produto() {
  const { set_pop_up_erro_cadastro } = useContext(GlobalContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      set_pop_up_erro_cadastro(false);
    }, 3000); // Tempo igual à animação

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="pop-up-notificacao erro">
      <div className="conteudo">
        <img
          src="/img/icons/Logout.svg"
          alt="sucesso"
          className="icone-notificacao"
        />
        <p>Produto cadastrado!</p>
      </div>
    </div>
  );
}

export default Pop_up_cadastro_produto;
