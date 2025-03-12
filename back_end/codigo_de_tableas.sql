CREATE TABLE clientes(

	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(200) NOT NULL,
	senha VARCHAR(12) NOT NULL,
	telefone VARCHAR(14),
	cpf VARCHAR(14),
	data_de_nascimento DATE
	imagem_de_perfil VARCHAR(5000) NOT NULL,
);

CREATE TABLE enderecos(

	id SERIAL PRIMARY KEY,
	cep VARCHAR(9) NOT NULL,
	bairro VARCHAR(100) NOT NULL,
	logradouro VARCHAR(100) NOT NULL,
	estado CHAR(2) NOT NULL,
	cidade VARCHAR(80) NOT NULL,
	numero VARCHAR(10) NOT NULL,
	complemento VARCHAR(200) NOT NULL,

	fk_id INT,
	FOREIGN KEY (fk_id) REFERENCES clientes(id)
);