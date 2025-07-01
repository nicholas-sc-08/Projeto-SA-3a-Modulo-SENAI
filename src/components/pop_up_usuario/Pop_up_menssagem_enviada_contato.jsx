import "./Pop_up_menssagem_enviada_contato.css";

function Pop_up_menssagem_enviada_contato({ onClose }) {
  return (
    <div className="tela-toda">
      <div className="container-mensagem-enviada">
        <img
          src="/img/Ponto_de_interrogacao.svg"
          alt="Bolinha com um ponto de interrogação dentro"
        />
        <p>
          Recebemos sua mensagem. <br />
          Ficaremos felizes em ajudar e entraremos em contato o mais breve possível.
        </p>
        <button className="fechar-popup" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Pop_up_menssagem_enviada_contato;
