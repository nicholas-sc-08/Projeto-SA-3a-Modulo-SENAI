export function autenticacaoLogin(email, senha, array_clientes, array_brechos) {
  if (!email.trim() || !senha.trim()) {
    return { erro: 'Não esqueça de preencher todos os campos!' };
  }

  if (!email.includes('@')) {
    return { erro: 'O email deve conter "@"' };
  }

  const [antesDoArroba] = email.split('@');

  if (!antesDoArroba) {
    return { erro: 'O email precisa conter caracteres antes do @' };
  }

  const cliente = array_clientes.find(cliente => cliente.email === email && cliente.senha === senha);
  const brecho = array_brechos.find(brecho => brecho.email === email && brecho.senha === senha);

  if (cliente || brecho) {
    return { erro: null, usuario: cliente || brecho };
  }

  return { erro: 'Usuário ou senha estão incorretos!' };
}
