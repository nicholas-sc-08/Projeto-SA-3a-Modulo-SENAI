const { validarCadastroParteUm, validarCadastroParteDois } = require('./ValidacaoCadastroBrecho');

describe('validarCadastroParteUm', () => {
  test('retorna erro se campos obrigatórios estiverem vazios', () => {
    const resultado = validarCadastroParteUm({
      nome: '',
      nascimento: '',
      senha: '',
      confirmarSenha: '123',
      idade: 20,
    });

    expect(resultado).toBe("Favor preencher todos os campos!");
  });

  test('retorna erro se as senhas forem diferentes', () => {
    const resultado = validarCadastroParteUm({
      nome: 'Ale',
      nascimento: '2000-01-01',
      senha: '123',
      confirmarSenha: 'abc',
      idade: 23,
    });

    expect(resultado).toBe("As senhas devem ser iguais!");
  });

  test('retorna erro se idade for menor que 18', () => {
    const resultado = validarCadastroParteUm({
      nome: 'Ale',
      nascimento: '2010-01-01',
      senha: '123',
      confirmarSenha: '123',
      idade: 16,
    });

    expect(resultado).toBe("Você precisa ser maior de idade para criar uma conta de vendedor no Fly!");
  });

  test('retorna null se todos os dados forem válidos', () => {
    const resultado = validarCadastroParteUm({
      nome: 'Ale',
      nascimento: '2000-01-01',
      senha: '123',
      confirmarSenha: '123',
      idade: 25,
    });

    expect(resultado).toBe(null);
  });
});
