import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import Secao_inputs_um from '../../components/Cadastro_cliente_secao_inputs_um.jsx';
import Secao_inputs_dois from '../../components/Cadastro_cliente_secao_inputs_dois.jsx';
import Secao_inputs_tres from '../../components/Cadastro_cliente_secao_inputs_tres.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Cadastro_cliente() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { form_de_cadastro_cliente, set_form_de_cadastro_cliente } = useContext(GlobalContext);
  const { cadastro_parte_um_cliente, set_cadastro_parte_um_cliente } = useContext(GlobalContext);
  const { cadastro_parte_dois_cliente, set_cadastro_parte_dois_cliente } = useContext(GlobalContext);
  const { cadastro_parte_tres_cliente, set_cadastro_parte_tres_cliente } = useContext(GlobalContext);
  const [exibir_botao_de_cadastro, set_exibir_botao_de_cadastro] = useState(false);
  const [mensagem_de_erro, set_mensagem_de_erro] = useState(``);
  const mudar_de_pagina = useNavigate(``);
  const dia_de_hoje = new Date();
  const [idade, set_idade] = useState(``);
  let email_ja_cadastrado = false;
  let cpf_ja_cadastrado = false;
  let telefone_ja_cadastrado = false;
  let senhas_iguais = false;

  useEffect(() => {

    informacoes_clientes();
    console.log(idade);
    
  }, [form_de_cadastro_cliente]);
  
  const lidar_com_formulario = async e => {

    e.preventDefault();

    try {
      
      const resposta = axios.post(`http://localhost:3000/usuarios`, form_de_cadastro_cliente);
      
      set_form_de_cadastro_cliente({nome: ``, email: ``, senha: ``, telefone: ``, cpf: ``, data_de_nascimento: ``, confirmar_senha: ``});
      informacoes_clientes();

    } catch (erro) {
      
      console.error(erro);
    };
  };

  useEffect(() => {

    if(cadastro_parte_um_cliente == false && cadastro_parte_dois_cliente == false && cadastro_parte_tres_cliente){

      set_exibir_botao_de_cadastro(true);
    } else {

      set_exibir_botao_de_cadastro(false);
    };

  }, [cadastro_parte_um_cliente, cadastro_parte_dois_cliente, cadastro_parte_tres_cliente]);

  const etapa_seguinte = () => {


    if(cadastro_parte_um_cliente == true && cadastro_parte_dois_cliente == false){

      for(let i = 0; i < array_clientes.length; i++){

        if(array_clientes[i].email == form_de_cadastro_cliente.email){

          email_ja_cadastrado = true;
        };
      };

      if(form_de_cadastro_cliente.senha == form_de_cadastro_cliente.confirmar_senha){

        senhas_iguais = true;
      } else {

        senhas_iguais = false;
      };
      
      switch(true){

        case senhas_iguais == true && email_ja_cadastrado == false:

        set_cadastro_parte_um_cliente(false);
        set_cadastro_parte_dois_cliente(true);
        set_mensagem_de_erro(``);
        break;

        case senhas_iguais == false && email_ja_cadastrado == true:

        set_mensagem_de_erro(`Email já cadastrado! As senhas devem ser iguais.`);
        break;

        case senhas_iguais == true && email_ja_cadastrado == true:

        set_mensagem_de_erro(`Email já cadastrado!`);
        break;

        case senhas_iguais == false && email_ja_cadastrado == false:

        set_mensagem_de_erro(`As senhas devem ser iguais!`);
        break;
      };

    } else if(cadastro_parte_dois_cliente == true && cadastro_parte_tres_cliente == false){

      // cpf, telefone e a data de nascimento

      for(let i = 0; i < array_clientes.length; i++){

        if(array_clientes[i].cpf == form_de_cadastro_cliente.cpf){

          cpf_ja_cadastrado = true;
        };

        if(array_clientes[i].telefone == form_de_cadastro_cliente.telefone){

          telefone_ja_cadastrado = true;
        };
      };

      set_idade(dia_de_hoje.getFullYear() - new Date(form_de_cadastro_cliente.data_de_nascimento).getFullYear());

      switch(true){

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == false && idade >= 18:

        set_mensagem_de_erro(``);
        set_cadastro_parte_dois_cliente(false);
        set_cadastro_parte_tres_cliente(true);
        break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == false && idade >= 18:

        set_mensagem_de_erro(`CPF já cadastrado!`);
        break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == true && idade >= 18:

        set_mensagem_de_erro(`CPF e Telefone já cadastrados!`);
        break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == true && idade < 18:

        set_mensagem_de_erro(`CPF e Telefone já cadastrados! Você deve ser maior de idade.`);
        break;

        case cpf_ja_cadastrado == true && telefone_ja_cadastrado == false && idade < 18:

        set_mensagem_de_erro(`CPF já cadastrado! Você deve ser maior de idade!`);
        break;

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == true && idade < 18:

        set_mensagem_de_erro(`Telefone já cadastrado! Você deve ser maior de idade!`);
        break;

        case cpf_ja_cadastrado == false && telefone_ja_cadastrado == false && idade < 18:

        set_mensagem_de_erro(`Você deve ser maior de idade!`);
        break;

        default:

        set_mensagem_de_erro(`Telefone já cadastrado!`);
        break;
      };

    };
  };

  const informacoes_clientes = async () => {
        
    try {
        
        const resultado = await axios.get(`http://localhost:3000/usuarios`);
        set_array_clientes(resultado.data);
        console.log(resultado.data);
        
    } catch (erro) {
        
        console.log(erro);
    };
};

  return (
    <div>

        <div className="container_ir_para_login_cliente">

          <button onClick={() => mudar_de_pagina(`/login`)}>Entrar</button>

        </div>

        <div className="container_formulario_cliente">

        <form onSubmit={lidar_com_formulario}>

          <div className="container_logo_etapa_cliente">

            <div className="container_etapa_cliente">



            </div>

            <div className="container_logo_fly_cliente">

            </div>

          </div>

          <div className="container_cadastro_cliente_titulo">

            <h1>Cadastro de usuário</h1>
            <p>asdasdasdasd</p>
          </div>

            {cadastro_parte_um_cliente && <Secao_inputs_um/>}
            {cadastro_parte_dois_cliente && <Secao_inputs_dois/>}
            {cadastro_parte_tres_cliente && <Secao_inputs_tres/>}

              {!exibir_botao_de_cadastro && <button type='button' onClick={etapa_seguinte}>Seguinte</button>}
              {exibir_botao_de_cadastro && <button type='submit'>Cadastrar-se</button>}
        </form>
        {mensagem_de_erro}
        </div>
    </div>
  );
}

export default Cadastro_cliente;
