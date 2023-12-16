<?php
error_reporting(0); 

include "conexao.php";
header('Content-Type: application/json');

if ($mysql->connect_error) {
    die("Erro de Conexão: " . $mysql->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emailUser = isset($_POST["email-nova-senha"]) ? $_POST["email-nova-senha"] : '';
    $senhaNovaUser = isset($_POST["nova__senha__again"]) ? $_POST["nova__senha__again"] : '';

    if (verificarEmailNaDatabase($mysql, $emailUser)) {
        if (alterarSenhaDaDatabase($mysql, $emailUser, $senhaNovaUser)) {
            echo json_encode(["success" => true, "message" => "Senha Alterada com Sucesso."]);
        } else {
            echo json_encode(["success" => false, "message" => "Falha ao alterar a senha na base de dados."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email inexistente ou incorreto!"]);
    }
}

function alterarSenhaDaDatabase($conexao, $email, $novaSenha)
{
    $senha_hash = password_hash($novaSenha, PASSWORD_BCRYPT);

    $sql = "UPDATE usuario SET Senha = ? WHERE Email = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("ss", $senha_hash, $email);

    return $stmt->execute();
}

function verificarEmailNaDatabase($conexao, $email)
{
    $sql = "SELECT Email FROM usuario WHERE Email = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    return $stmt->num_rows > 0;
}
?>
