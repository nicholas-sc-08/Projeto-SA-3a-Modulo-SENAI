import './Pop_up_mudar_endereco_cliente.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

function Pop_up_mudar_endereco_cliente({ onClose }) {
  const [enderecoDoCliente, setEnderecoDoCliente] = useState({
    cep: '',
    bairro: '',
    logradouro: '',
    estado: '',
    cidade: '',
    numero: '',
    complemento: ''
  });

  const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
  const navegar = useNavigate();

  useEffect(() => {
    if (enderecoDoCliente.cep.length === 8) {
      buscar_cep();
    }
  }, [enderecoDoCliente.cep]);

  async function buscar_cep() {
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${enderecoDoCliente.cep}/json/`);
      const dados_do_endereco = await resposta.json();

      setEnderecoDoCliente({
        ...enderecoDoCliente,
        bairro: dados_do_endereco.bairro,
        logradouro: dados_do_endereco.logradouro,
        estado: dados_do_endereco.uf,
        cidade: dados_do_endereco.localidade
      });

    } catch (erro) {
      console.error(erro);
      set_erro_pagina(erro);
      navegar(`/erro`);
    }
  }

  return (
    <div className="tela-inteira-content">
      <div className="divs-centrais-content">

        <div className="voltar-e-menu-content">
          <img src="./img/icons/Voltar-icone-verde.svg" alt="Voltar" onClick={onClose} />
          {/* <img src="./img/icons/Menu-hamburguer-verde-escuro.svg" alt="Menu" /> */}
        </div>

        <div className="popUp-mudar-endereco-content">

          <div className="titulo-e-subtitulo-content">
            <p className="titulo-endereco-brecho-popUp">Modificar meu endereço</p>
            <p className="subtitulo-endereco-brecho-popUp">De onde você deseja enviar os seus produtos?</p>
          </div>

          <div className="inputs-do-popUp-content">
            <div className="juncao-rua-logra-e-numero-content">
              <div className="rua-logra-input-content">
                <label className="topicos-input-endereco">Rua/Logradouro</label>
                <input type="text" placeholder='Rua das Flores' 
                  value={enderecoDoCliente.logradouro} 
                  onChange={(event) => setEnderecoDoCliente({ 
                    ...enderecoDoCliente, 
                    logradouro: event.target.value 
                  })} 
                />
              </div>

              <div className="numero-input-content">
                <label className="topicos-input-endereco">Número</label>
                <input type="text" placeholder='200' 
                  value={enderecoDoCliente.numero} 
                  onChange={(event) => setEnderecoDoCliente({ 
                    ...enderecoDoCliente, 
                    numero: event.target.value 
                  })} 
                />
              </div>
            </div>

            <div className="complemento-input-content">
              <label className="topicos-input-endereco">Complemento</label>
              <input type="text" placeholder='Apartamento 02' 
                value={enderecoDoCliente.complemento} 
                onChange={(event) => setEnderecoDoCliente({ 
                  ...enderecoDoCliente, 
                  complemento: event.target.value 
                })} 
              />
            </div>

            <div className="juncao-cep-e-bairro-content">
              <div className="cep-input-content">
                <label className="topicos-input-endereco">CEP</label>
                <IMaskInput
                  mask="00000-000"
                  unmask="typed"
                  placeholder='00000-000'
                  value={enderecoDoCliente.cep} 
                  onAccept={(value) => setEnderecoDoCliente({ ...enderecoDoCliente, cep: value })} // o onAccept é o método recomendado pela documentação do react-imask
                
                />
              </div>

              <div className="bairro-input-content">
                <label className="topicos-input-endereco">Bairro</label>
                <input type="text" placeholder='Rio Vermelho' 
                  value={enderecoDoCliente.bairro} 
                  onChange={(event) => setEnderecoDoCliente({ 
                    ...enderecoDoCliente, 
                    bairro: event.target.value 
                  })} 
                />
              </div>
            </div>
          </div>

          <div className="salvar-endereco-content">
            <button>Salvar Endereço</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Pop_up_mudar_endereco_cliente;
