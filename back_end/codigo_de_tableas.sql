CREATE TABLE clientes(

	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(200) NOT NULL,
	senha VARCHAR(12) NOT NULL,
	telefone VARCHAR(14),
	cpf VARCHAR(14),
	data_de_nascimento DATE,
	imagem_de_perfil VARCHAR(5000) NOT NULL
);

CREATE TABLE brechos(

	id_brechos SERIAL PRIMARY KEY,
	nome_vendedor VARCHAR(50) NOT NULL,
	data_de_nascimento_vendedor DATE,
	senha VARCHAR(12) NOT NULL,
	nome_brecho VARCHAR(100) NOT NULL,
	email VARCHAR(200) NOT NULL,
	telefone VARCHAR(14),
	CNPJ VARCHAR(18),
	logo TEXT NOT NULL
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
	id_brechos INT,
	FOREIGN KEY (id_brechos) REFERENCES brechos(id_brechos)
);

CREATE TABLE categorias(

	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

	CREATE TABLE Produto (
		id SERIAL PRIMARY KEY,
		nome VARCHAR(50) NOT NULL,
		descricao VARCHAR(200) NOT NULL,
		preco DECIMAL(10,2) NOT NULL, 
		codigo VARCHAR(14) NULL, 
		condicao VARCHAR(14) NULL, 
		imagem TEXT NULL, 
		tamanho VARCHAR(3) NOT NULL,
		cor VARCHAR(50),
		marca VARCHAR(50)
	);

	CREATE TABLE EstoqueProduto (
    id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,

	produto_id INT NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES Produto(id) 
	);