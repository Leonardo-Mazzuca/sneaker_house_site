<?php

include "conexao.php";
$conexao = new mysqli($hostname, $usuario, $senha, $bancodados);

try {

    if ($conexao->connect_error) {
        die("Erro de Conexão: " . $conexao->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"])) {

        $email = $_POST["email"];

        $stmt = $conexao->prepare("SELECT u.*, dp.PrimeiroNome, dp.Sobrenome, dp.CPF, dp.RG, dp.Estado, dp.Cidade,
                                          dp.CEP, dp.Logradouro, dp.Endereco, dp.Complemento, dp.Telefone, dp.Email
                                  FROM Usuario u
                                  LEFT JOIN DadosPessoais dp ON u.Email = dp.Email
                                  WHERE u.Email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();

        if ($row !== null) {
            $jsonResultado = json_encode($row, JSON_PRETTY_PRINT);
            echo $jsonResultado;
        } else {
            echo json_encode(["error" => "E-mail não encontrado"]);
        }
    } else {

        $query = "SELECT u.*, dp.PrimeiroNome, dp.Sobrenome, dp.CPF, dp.RG, dp.Estado, dp.Cidade,
                          dp.CEP, dp.Logradouro, dp.Endereco, dp.Complemento, dp.Telefone, dp.Email
                  FROM Usuario u
                  LEFT JOIN DadosPessoais dp ON u.Email = dp.Email";
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
