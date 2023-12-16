<?php

include "conexao.php";
$conexao = new mysqli($hostname, $usuario, $senha, $bancodados);

try {
 

    if ($conexao->connect_error) {
        die("Erro de Conexão: " . $conexao->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"])) {
     
        $email = $_POST["email"];

        $stmt = $conexao->prepare("SELECT email, telefone, senha, nome, caminhoFoto FROM Usuario WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $stmt->bind_result($resultadoEmail, $telefone, $senha, $nome, $caminhoFoto);
        $stmt->fetch();
        $stmt->close();

        if ($resultadoEmail !== null) {
            $jsonResultado = json_encode([
                "email" => $resultadoEmail,
                "telefone" => $telefone,
                "senha" => $senha,
                "nome" => $nome,
                "caminhoFoto" => $caminhoFoto
            ], JSON_PRETTY_PRINT);

            echo $jsonResultado;
        } else {
            echo json_encode(["error" => "E-mail não encontrado"]);
        }
    } else {
     
        $query = "SELECT email, telefone, senha, nome, caminhoFoto FROM Usuario";
        $resultado = $conexao->query($query);

        if (!$resultado) {
            die("Erro na consulta: " . $conexao->error);
        }

        $resultados = $resultado->fetch_all(MYSQLI_ASSOC);
        $conexao->close();

        $jsonResultados = json_encode($resultados, JSON_PRETTY_PRINT);
        echo $jsonResultados;
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Erro no servidor"]);
}
?>
