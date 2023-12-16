CREATE TABLE Usuario (
    UsuarioID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(150) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Telefone VARCHAR(12) UNIQUE NOT NULL,
    DataNascimento DATE NOT NULL,
    CaminhoFoto VARCHAR(255) DEFAULT '../assets/user-default.png',
    Senha VARCHAR(150)
);

-- TRUNCATE TABLE Usuario


CREATE TABLE Compras (
    CompraID INT PRIMARY KEY AUTO_INCREMENT,
    UsuarioID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuario (UsuarioID),
    corProduto VARCHAR(150) NOT NULL,
    PrecoTotal DECIMAL(10,2) NOT NULL,
    nomeProduto VARCHAR(150) NOT NULL,
    Tamanho INT NOT NULL,
    Quantidade INT NOT NULL,
    ImagemProduto VARCHAR(150) NOT NULL,
    CodigoPedido VARCHAR(150) NOT NULL,
    DataEmissao DATETIME NOT NULL
);

CREATE TABLE DadosCartao (
    CartaoID INT PRIMARY KEY AUTO_INCREMENT,
	Email VARCHAR(150) NOT NULL UNIQUE,
    FOREIGN KEY (Email) REFERENCES Usuario (Email),
    NomeTitular VARCHAR(150) NOT NULL,
    NumeroCartao VARCHAR(20) NOT NULL,
    CVV INT NOT NULL,
    DataVencimento DATE NOT NULL
);

CREATE TABLE DadosPessoais (
    UsuarioID INT AUTO_INCREMENT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuario (UsuarioID),
    PrimeiroNome VARCHAR(150) NOT NULL,
    Sobrenome VARCHAR(150) NOT NULL,
    CPF VARCHAR(20) NOT NULL,
    RG VARCHAR(20) NOT NULL,
    Estado VARCHAR(150) NOT NULL,
    Cidade VARCHAR(150) NOT NULL,
    CEP VARCHAR(20) NOT NULL,
    Logradouro VARCHAR(150) NOT NULL,
    Endereco VARCHAR(150) NOT NULL,
    Complemento VARCHAR(150) NOT NULL DEFAULT '0000',
    Telefone VARCHAR(15) UNIQUE NOT NULL,
    FOREIGN KEY (Telefone) REFERENCES Usuario(Telefone),
    Email VARCHAR(150) NOT NULL UNIQUE,
    FOREIGN KEY (Email) REFERENCES Usuario(Email)
);



SELECT * FROM usuario


SELECT * FROM DadosPessoais









