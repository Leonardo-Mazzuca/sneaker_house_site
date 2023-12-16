
<?php

session_start();
include ("conexao.php");
header('Content-Type: application/json'); 

if($mysql->connect_error) {
    echo "Erro";
    die();
}

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $nomeCartao = isset($_POST["nome-cartao"]) ? $_POST["nome-cartao"] : "";
    $numCartao = isset($_POST["num-cartao"]) ? $_POST["num-cartao"] : "";
    $dataExpiracao = isset($_POST["data-expiracao"]) ? $_POST["data-expiracao"] : "";
    $cvv = isset($_POST["cvv"]) ? $_POST["cvv"] : "";

    $sql = "INSERT INTO DadosCartao (Email, NomeTitular, NumeroCartao, CVV, DataVencimento) VALUES (?, ?, ?, ?, ?)";

    $stmt = $mysql->prepare($sql);
    $stmt->bind_param("sssss",$email, $nomeCartao, $numCartao, $cvv, $dataExpiracao);

    if($stmt->execute()){
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

    $stmt->close();


}

$mysql->close();


?>