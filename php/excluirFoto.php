<?php

include "conexao.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"])) {
    $emailUsuario = $_POST["email"];


    $stmtSelect = $mysql->prepare("SELECT CaminhoFoto FROM Usuario WHERE Email = ?");
    $stmtSelect->bind_param("s", $emailUsuario);
    $stmtSelect->execute();
    $stmtSelect->bind_result($caminhoFoto);
    $stmtSelect->fetch();
    $stmtSelect->close();


    $stmtUpdate = $mysql->prepare("UPDATE Usuario SET CaminhoFoto = ? WHERE Email = ?");
    $caminhoPadrao = '../assets/user-default.png';
    $stmtUpdate->bind_param("ss", $caminhoPadrao, $emailUsuario);
    
    if ($stmtUpdate->execute()) {
        $stmtUpdate->close();

 
        if ($caminhoFoto && file_exists($caminhoFoto)) {
            unlink($caminhoFoto);
        }

        echo json_encode(["success" => true, "CaminhoFoto" => $caminhoFoto]);

    } else {
        echo json_encode(["success" => false, "message" => "Erro na atualização do banco de dados"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Requisição inválida"]);
}

$mysql->close();
?>
