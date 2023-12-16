<?php

include "conexao.php";
error_reporting(0);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["novo-nome"];
    $email = $_POST["email"];
    $telefoneOriginal = $_POST["telefone-original"]; 
    $telefoneNovo = $_POST["novo-telefone"];

    $emailOriginal = $_POST["email-original"];
    $emailNovo = $_POST["email-novo"];

    $successEmail = atualizarEmailUsuario($emailOriginal, $emailNovo);
    $successName = atualizarNomeUsuario($email, $name);
    $successTelefone = atualizarTelefoneUsuario($telefoneOriginal, $telefoneNovo); 

    $updateSuccess = $successEmail || $successName || $successTelefone;

    if ($updateSuccess) {
        echo json_encode(["success" => true, "updateSuccess" => true, "message" => "Dados atualizados com sucesso."]);
    } else {
        echo json_encode(["success" => false, "updateSuccess" => false, "message" => "Nenhum campo fornecido para atualização."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método não permitido."]);
}

function atualizarEmailUsuario($emailOriginal, $novoEmail) {
    global $mysql;

    if ($emailOriginal !== $novoEmail) {

        $stmtUsuario = $mysql->prepare("UPDATE usuario SET email = ? WHERE email = ?");
        $stmtUsuario->bind_param("ss", $novoEmail, $emailOriginal);
        $stmtUsuario->execute();
        $stmtUsuario->close();

 
        $stmtDadosPessoais = $mysql->prepare("UPDATE DadosPessoais SET Email = ? WHERE Email = ?");
        $stmtDadosPessoais->bind_param("ss", $novoEmail, $emailOriginal);
        $stmtDadosPessoais->execute();
        $stmtDadosPessoais->close();

        return true;
    } else {
        return false;
    }
}

function atualizarNomeUsuario($email, $novoNome) {
    global $mysql;


    $stmtUsuario = $mysql->prepare("UPDATE usuario SET nome = ? WHERE email = ?");
    $stmtUsuario->bind_param("ss", $novoNome, $email);
    $stmtUsuario->execute();
    $stmtUsuario->close();


    $stmtDadosPessoais = $mysql->prepare("UPDATE DadosPessoais SET PrimeiroNome = ? WHERE Email = ?");
    $stmtDadosPessoais->bind_param("ss", $novoNome, $email);
    $stmtDadosPessoais->execute();
    $stmtDadosPessoais->close();

    return true;
}

function atualizarTelefoneUsuario($telefoneOriginal, $novoTelefone) {
    global $mysql;


    $stmtUsuario = $mysql->prepare("UPDATE usuario SET Telefone = ? WHERE Telefone = ?");
    $stmtUsuario->bind_param("ss", $novoTelefone, $telefoneOriginal);
    $stmtUsuario->execute();
    $stmtUsuario->close();

 
    $stmtDadosPessoais = $mysql->prepare("UPDATE DadosPessoais SET Telefone = ? WHERE Telefone = ?");
    $stmtDadosPessoais->bind_param("ss", $novoTelefone, $telefoneOriginal);
    $stmtDadosPessoais->execute();
    $stmtDadosPessoais->close();

    return true;
}
