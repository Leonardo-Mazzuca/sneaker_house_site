<?php
include 'conexao.php';
header('Content-Type: application/json');
session_start();

if (isset($_POST['email-login']) && isset($_POST['senha-login'])) {

    $email = $mysql->real_escape_string($_POST['email-login']);
    $senha = $mysql->real_escape_string($_POST['senha-login']);

    if (empty($email) || empty($senha)) {
        echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
    } else {

        $sql = "SELECT Email, Senha FROM usuario WHERE Email = ?";
        $stmt = $mysql->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($db_email, $db_senha);

        if ($stmt->num_rows > 0) {
            $stmt->fetch();

            if (empty($db_senha)) {
                $db_senha = password_hash('senha_padrao', PASSWORD_DEFAULT);
            }

            if (($db_email === $email) && (password_verify($senha, $db_senha))) {
                

                $_SESSION["senha-original-length"] = strlen($senha);

                echo json_encode(["success" => true, "redirect" => "./php/usuarioPage.php?email-login=$email"]);
                
            } else {

                echo json_encode(["success" => false, "senhaCerto" => false, "message" => "A senha inserida está incorreta!"]);
            }
        } else {
  
            echo json_encode(["success" => false, "emailCerto" => false, "message" => "O e-mail inserido é inexistente ou está incorreto!"]);
        }
    }
}

?>
