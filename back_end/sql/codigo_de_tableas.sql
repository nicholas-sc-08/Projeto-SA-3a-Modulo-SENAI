DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS brechos CASCADE;
DROP TABLE IF EXISTS enderecos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS produto CASCADE;
DROP TABLE IF EXISTS EstoqueProduto CASCADE;

CREATE TABLE clientes(

	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(200) NOT NULL,
	senha VARCHAR(12) NOT NULL,
	telefone VARCHAR(20),
	cpf VARCHAR(20),
	data_de_nascimento DATE,
	imagem_de_perfil VARCHAR(5000) NOT NULL
);

CREATE TABLE chat(

	id SERIAL PRIMARY KEY,
	mensagem TEXT,
	hora CHAR(5),
	data_da_mensagem CHAR(10),
	
	id_dono_mensagem INT,
	FOREIGN KEY (id_dono_mensagem) REFERENCES clientes(id),

	id_quem_recebeu_mensagem INT,
	FOREIGN KEY (id_quem_recebeu_mensagem) REFERENCES clientes(id)

);

CREATE TABLE brechos(

	id SERIAL PRIMARY KEY,
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
	FOREIGN KEY (fk_id) REFERENCES clientes(id),
	id_brecho INT,
	FOREIGN KEY (id_brecho) REFERENCES brechos(id)
);

CREATE TABLE categorias(

	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

CREATE TABLE marcas(

	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

CREATE TABLE Produto (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	descricao VARCHAR(200) NOT NULL,
	preco TEXT NOT NULL, 
	codigo VARCHAR(14) NULL, 
	condicao VARCHAR(14) NULL, 
	imagem TEXT, 
	tamanho VARCHAR(3) NOT NULL,
	cor VARCHAR(50),
	marca VARCHAR(50),

	fk_id_categoria INT,
	FOREIGN KEY (fk_id_categoria) REFERENCES categorias(id)
);

CREATE TABLE EstoqueProduto (
	id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,

	produto_id INT NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES Produto(id) 
);