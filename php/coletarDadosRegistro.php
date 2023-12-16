<?php

session_start();

include "conexao.php";
header('Content-Type: application/json'); 

if ($mysql->connect_error) {
    die("Erro de Conexão: " . $mysql->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_user = $_POST["criar-username"];
    $senha_user = $_POST["criar-senha"];
    $email_user = $_POST["criar-email"];
    $data_nasc_user = $_POST["criar-data"];
    $telefone_user = $_POST["telefone"];




    


        $senha_hash = password_hash($senha_user, PASSWORD_BCRYPT);
        $data_nasc_user_formatada = date('Y-m-d', strtotime($data_nasc_user));

        $sqlCadastro = "INSERT INTO usuario (Nome, Email, Telefone, DataNascimento, Senha) VALUES (?, ?, ?, ?, ?)";
        $stmtCadastro = $mysql->prepare($sqlCadastro);
        $stmtCadastro->bind_param("sssss", $nome_user, $email_user, $telefone_user, $data_nasc_user_formatada, $senha_hash);

        if ($stmtCadastro->execute()) {
            echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso"]);
            header("Location: ../login.html");
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao cadastrar o cliente: " . $stmtCadastro->error]);
        }

        $stmtCadastro->close();
}

$mysql->close();

?>
