import { autenticacaoLogin } from './AutenticacaoLogin';

describe('Função autenticacaoLogin', () => {
  const clientes = [{ email: 'cliente@email.com', senha: '123456' }];
  const brechos = [{ email: 'brecho@email.com', senha: 'abcdef' }];

  test('Login válido - cliente', () => {
    const resultado = autenticacaoLogin('cliente@email.com', '123456', clientes, brechos);
    expect(resultado.erro).toBeNull();
    expect(resultado.usuario).toEqual(clientes[0]);
  });

  test('Login válido - brechó', () => {
    const resultado = autenticacaoLogin('brecho@email.com', 'abcdef', clientes, brechos);
    expect(resultado.erro).toBeNull();
    expect(resultado.usuario).toEqual(brechos[0]);
  });

  test('Campos vazios', () => {
    const resultado = autenticacaoLogin('', '', clientes, brechos);
    expect(resultado.erro).toBe('Não se esqueça de preencher todos os campos!');
  });

  test('Email sem @', () => {
    const resultado = autenticacaoLogin('emailsemarroba.com', '123456', clientes, brechos);
    expect(resultado.erro).toBe('O email deve conter "@"');
  });

  test('Email sem parte antes do @', () => {
    const resultado = autenticacaoLogin('@dominio.com', '123456', clientes, brechos);
    expect(resultado.erro).toBe('O email precisa conter caracteres antes do @');
  });

  test('Senha incorreta', () => {
    const resultado = autenticacaoLogin('cliente@email.com', 'errada', clientes, brechos);
    expect(resultado.erro).toBe('Usuário ou senha estão incorretos!');
  });

  test('Usuário inexistente', () => {
    const resultado = autenticacaoLogin('naoexiste@email.com', '123456', clientes, brechos);
    expect(resultado.erro).toBe('Usuário ou senha estão incorretos!');
  });

  test('Espaços em branco nos campos', () => {
    const resultado = autenticacaoLogin('   ', '   ', clientes, brechos);
    expect(resultado.erro).toBe('Favor preencher todos os campos!');
  });
})