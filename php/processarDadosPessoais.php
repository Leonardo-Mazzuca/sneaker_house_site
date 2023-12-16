<?php

session_start();
include ("conexao.php");
header('Content-Type: application/json'); 

try {
    if ($mysql->connect_error) {
        die("Erro de Conexão: " . $mysql->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {


        $primeiroNome = $_POST["nome-principal"];
        $sobrenome = $_POST["sobrenome"];
        $cpf = $_POST["cpf"];
        $rg = $_POST["rg"];
        $estado = $_POST["estado"];
        $cidade = $_POST["cidade"];
        $cep = $_POST["cep"];
        $logradouro = $_POST["logradouro"];
        $endereco = $_POST["endereco"];
        $complemento = $_POST["complemento"];
        $telefone = $_POST["telefone"];
        $email = $_POST["email"];

        
        $sql = "INSERT INTO DadosPessoais (PrimeiroNome, Sobrenome, CPF, RG, Estado, Cidade, CEP, Logradouro, Endereco, Complemento, Telefone, Email) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $mysql->prepare($sql);
        $stmt->bind_param("ssssssssssss", $primeiroNome, $sobrenome, $cpf, $rg, $estado, $cidade, $cep, $logradouro, $endereco, $complemento, $telefone, $email);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }

        $stmt->close();
    }

    $conexao->close();

} catch (PDOException $e) {
    echo json_encode(["error" => "Erro no servidor"]);
}
?>
