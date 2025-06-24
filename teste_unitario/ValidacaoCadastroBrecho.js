function validarCadastroParteUm({ nome, nascimento, senha, confirmarSenha, idade }) {
  if (!nome || !nascimento || !senha) return "Favor preencher todos os campos!";
  if (senha !== confirmarSenha) return "As senhas devem ser iguais!";
  if (idade < 18) return "Você precisa ser maior de idade para criar uma conta de vendedor no Fly!";
  return null;
}

function validarCadastroParteDois(form, brechos, clientes) {
  const { logo, nome_brecho, email, telefone, cnpj } = form;

  if (!logo || !nome_brecho || !email || !telefone) {
    return "Por favor preencher todos os dados!";
  }
  if (!email.includes("@")) return 'O email deve conter "@"';
  if (!email.endsWith("gmail.com") && !email.endsWith("hotmail.com")) {
    return 'O email deve conter "gmail.com" ou "hotmail.com"';
  }
  if (email.startsWith("@")) return "O email deve conter caracteres antes do @";

  const emailJaCadastrado = brechos.some(b => b.email === email) || clientes.some(c => c.email === email);
  const telefoneJaCadastrado = brechos.some(b => b.telefone === telefone) || clientes.some(c => c.telefone === telefone);
  const CNPJJaCadastrado = brechos.some(b => b.cnpj === cnpj);
  const nomeBrechoJaCadastrado = brechos.some(b => b.nome_brecho === nome_brecho);

  if (!emailJaCadastrado && !telefoneJaCadastrado && !CNPJJaCadastrado && !nomeBrechoJaCadastrado) return null;

  if (emailJaCadastrado && telefoneJaCadastrado && CNPJJaCadastrado && nomeBrechoJaCadastrado) return "Dados já cadastrados!";
  if (emailJaCadastrado && telefoneJaCadastrado) return "Telefone e email já cadastrado!";
  if (emailJaCadastrado && nomeBrechoJaCadastrado) return "Nome e email já cadastrados!";
  if (emailJaCadastrado && CNPJJaCadastrado) return "Email e CNPJ já cadastrados!";
  if (telefoneJaCadastrado && CNPJJaCadastrado) return "Telefone e CNPJ já cadastrados!";
  if (telefoneJaCadastrado && nomeBrechoJaCadastrado) return "Telefone e nome já cadastrados!";
  if (CNPJJaCadastrado && nomeBrechoJaCadastrado) return "CNPJ e nome já cadastrados!";

  if (emailJaCadastrado) return "Email já cadastrado!";
  if (telefoneJaCadastrado) return "Telefone já cadastrado!";
  if (CNPJJaCadastrado) return "CNPJ já cadastrado!";
  if (nomeBrechoJaCadastrado) return "Nome do brechó já cadastrado!";

  return null;
}

module.exports = { validarCadastroParteUm, validarCadastroParteDois };