<?php

session_start();
include("conexao.php");
header('Content-Type: application/json');

if ($mysql->connect_errno) {
    echo "Error";
    die();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"]) && isset($_POST["compras"])) {
    $email = $_POST["email"];
    $produtosComprados = $_POST["compras"];

    if ($produtosComprados && is_array($produtosComprados)) {
        $result = $mysql->query("SELECT usuarioID FROM Usuario WHERE email = '$email'");

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $usuarioID = $row["usuarioID"];

            $codigoPedido = uniqid();

            foreach ($produtosComprados as $index => $produto) {
                $nome = $produto['nome'];
                $quantidade = $produto['quantidade'];
                $tamanho = $produto['tamanho'];
                $precoUnitario = $produto['preco'];
                $cor = $produto["cor"];
                $imagem = $produto["imagem"];
                $dataEmissao = date('Y-m-d H:i:s');

              
                $precoTotal = $precoUnitario * $quantidade;

                $mysql->query("INSERT INTO Compras (UsuarioID, PrecoTotal, nomeProduto, Tamanho, Quantidade, corProduto, ImagemProduto, codigoPedido, DataEmissao)
                    VALUES ('$usuarioID', '$precoTotal', '$nome', '$tamanho' , '$quantidade' , '$cor', '$imagem', '$codigoPedido' ,'$dataEmissao')");
            }

            echo json_encode(["success" => true, "message" => "Compra realizada com sucesso!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Usuário não encontrado"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao decodificar o JSON"]);
    }
}
?>
