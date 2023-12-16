<?php

include "conexao.php";
session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["foto"]) && isset($_POST["email"])) {
    $emailUsuario = $_POST["email"];


    $diretorioFotos = "../diretorioFotos/";
    if (!is_dir($diretorioFotos)) {
        mkdir($diretorioFotos, 0777, true);
    }


    $nomeArquivo = $_FILES["foto"]["name"];


    $caminhoArquivo = $diretorioFotos . $nomeArquivo;
    $_SESSION["caminho-foto"] = $caminhoArquivo;


    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $caminhoArquivo)) {
        
        $stmt = $mysql->prepare("UPDATE Usuario SET CaminhoFoto = ? WHERE Email = ?");
        $stmt->bind_param("ss", $caminhoArquivo, $emailUsuario);
        $stmt->execute();
        $stmt->close();

        echo json_encode(["success" => true, "novaFoto" => $caminhoArquivo]);
        exit;
    } else {
        echo json_encode(["success" => false, "message" => "Falha no upload da foto."]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Requisição inválida."]);

?>
