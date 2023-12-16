<?php

include "conexao.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


function obterComprasPorUsuario($usuarioID)
{
    global $mysql;

    $compras = array();

    $query = "SELECT * FROM Compras WHERE UsuarioID = '$usuarioID' ORDER BY CodigoPedido";
    $result = $mysql->query($query);

    if ($result) {
        $compraAtual = null;

        while ($row = $result->fetch_assoc()) {
            $codigoPedidoAtual = $row['CodigoPedido'];

            if ($compraAtual === null || $compraAtual['CodigoPedido'] !== $codigoPedidoAtual) {
                $compraAtual = array(
                    'PrecoTotal' => $row['PrecoTotal'],
                    'CodigoPedido' => $codigoPedidoAtual,
                    'DataEmissao' => $row['DataEmissao'],
                    'Produtos' => array()
                );

               
            }

            $produto = array(
                'nomeProduto' => $row['nomeProduto'],
                'Tamanho' => $row['Tamanho'],
                'Quantidade' => $row['Quantidade'],
                'corProduto' => $row['corProduto'],
                'PrecoTotal' => $row['PrecoTotal'],
                'ImagemProduto' => $row['ImagemProduto'],
            );

            $compraAtual['Produtos'][] = $produto;
            
            $compras[] = $compraAtual;
        }

        return $compras;
    } else {
        return false;
    }
}


function obterUsuarioId($email)
{
    global $mysql;

    $stmt = $mysql->prepare("SELECT UsuarioID FROM Usuario WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($usuarioID);

    $result = $stmt->fetch();
    $stmt->close();

    if ($result) {
        return $usuarioID;
    } else {
        return false;
    }
}




if (isset($_GET['email-login'])) {
    $email = $_GET['email-login'];

    if ($mysql->connect_error) {
        die("Erro de Conexão: " . $mysql->connect_error);
    }

    $stmt = $mysql->prepare("SELECT nome, Telefone, senha, CaminhoFoto FROM usuario WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($nome, $telefone, $senha, $caminhoFoto);

    if ($stmt->fetch()) {
        $_SESSION['nome'] = $nome;
        $_SESSION['email'] = $email;
        $_SESSION['telefone'] = $telefone;
        $_SESSION['caminhoFoto'] = $caminhoFoto;

        $stmt->close();

        $userId = obterUsuarioId($email);
        $_SESSION["compras"] = obterComprasPorUsuario($userId);

        $mysql->close();
    } else {
        echo "Usuário não encontrado ou dados inválidos.";
    }
}


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sneakerHouse - Página do usuário</title>
</head>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

<link rel="stylesheet" href="../styles/index.css" />

<body>

    <!-- Lembrar de bloquear o acesso sem o login a essa página depois -->




    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmação</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Deseja confirmar a alteração do email?
                </div>
                <div class="modal-footer">
                    <button id="cancelar-btn" type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal">Cancelar</button>
                    <button id="confirmar-btn" type="button" class="btn btn-secondary rounded-0" id="confirmChangeEmail">Confirmar</button>
                </div>
            </div>
        </div>
    </div>

    <section class="row row-cols-1 row-cols-lg-2 row-cols-md-1 bg-night">

        <aside class="user__configure col-lg-3">

            <section>
                <div class="superior__user__configure">

                    <div class="profile-picture">
                        <img src="<?php echo $_SESSION["caminhoFoto"] ? $_SESSION["caminhoFoto"] : "../assets/user-default.png" ?>" alt="Imagem do usuário" style="border-radius: 50%;" class="user-img img-fluid">
                    </div>

                    <div class="user__stats d-flex flex-column">
                        <h2 class="text-light"><?php echo $_SESSION["nome"] ?></h2>
                        <h3 class="text-light"><?php echo $_SESSION["email"] ?></h3>
                    </div>

                </div>


                <div class="user__configure__menu">

                    <ul>

                        <a href="#accordionUserProfile">
                            <p><span><i class="fa-solid fa-house"></i>Minha conta</span> <i class="fa-solid fa-chevron-right"></i> </p>
                        </a>
                        <a href="#accordionPedidos">
                            <p><span><i class="fa-solid fa-truck-fast"></i> Meus pedidos</span><i class="fa-solid fa-chevron-right"></i></p>
                        </a>
                        <a href="../index.html">
                            <p><span><i class="fa-solid fa-hand-point-left"></i>Voltar para a loja</span> <i class="fa-solid fa-chevron-right"></i></p>
                        </a>

                    </ul>
                </div>

            </section>

            <div class="user__logout">
                <button class="btn" id="btn-logout">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>Sair da conta
                </button>
            </div>

        </aside>

        <section class="user__wrapper col-lg-9">

            <div class="accordion" id="accordionUserProfile">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button bg bg-light rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Minha conta
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body rounded-0">

                            <section class="user__main">


                                <div class="user__name">
                                    <?php echo "<h2>Olá <span>$_SESSION[nome]</span></h2>"; ?>
                                </div>
                                <hr>

                                <article class="row row-cols-1 row-cols-lg-2">


                                    <form class="col-lg-4" id="form-photo" action="salvarFoto.php" method="POST" enctype="multipart/form-data">

                                        <div class="img__profile__container d-flex align-items-center flex-column">

                                            <div class="profile-picture" id="profile-picture">
                                                <img src="<?php echo $_SESSION["caminhoFoto"] ? $_SESSION["caminhoFoto"] : "../assets/user-default.png" ?>" alt="Imagem do usuário" style="border-radius: 50%;" class="user-img">
                                            </div>

                                            <div class="btn__container mt-3">
                                                <input type="file" id="upload" style="display: none;" accept="image/*">
                                                <label for="upload" id="upload-label" class="btn p-3 shadow">
                                                    <i class="fa-solid fa-rotate-right"></i>
                                                </label>
                                                <button id="excluir-foto" class="btn mx-3 p-3 shadow">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>


                                        </div>
                                    </form>


                                    <div class="user__profile__datas col-lg-8">

                                        <section>

                                            <h4 class="fs-3 fw-bold">
                                                Informações pessoais
                                            </h4>

                                            <form id="user__datas" action="./alterarDados.php" method="POST">

                                                <div class="user__name__email d-flex align-items-center
                                                 gap-3">

                                                    <div class="d-flex flex-column gap-3">

                                                        <div class="input-container">
                                                            <label for="user-name" class="form-label">Seu nome</label>
                                                            <input type="text" class="form-control" name="user-name" id="user-name" value="<?php echo $_SESSION["nome"]; ?>" readonly>
                                                            <div class="error-name text-danger"></div>

                                                        </div>

                                                        <div class="input-container d-flex gap-3">
                                                            <div>
                                                                <label for="user-email" class="form-label">Seu email</label>
                                                                <input type="email" class="form-control disabled" name="user-email" id="user-email" value="<?php echo $_SESSION["email"]; ?>" readonly>
                                                                <div class="error-email text-danger"></div>
                                                            </div>
                                                            <button type="button" class="btn align-self-end" id="change-email-btn">
                                                                Trocar email
                                                            </button>

                                                        </div>
                                                    </div>

                                                </div>

                                                <hr>

                                                <div class="input-container d-flex flex-column gap-3">
                                                    <div>
                                                        <label for="user-tel" class="form-label">N° de Telefone </label>
                                                        <input type="tel" class="form-control" name="user-tel" id="user-tel" value="<?php echo $_SESSION["telefone"]; ?>" readonly>
                                                        <div class="error-tel text-danger"></div>

                                                    </div>

                                                    <div class="d-flex align-items-center gap-3">

                                                        <div class="w-50">
                                                            <label for="user-pass" class="form-label">Senha</label>
                                                            <input type="password" class="form-control disabled" name="user-pass" id="user-pass" value="<?php echo str_repeat('•', $_SESSION["senha-original-length"])  ?>" readonly>
                                                        </div>

                                                        <a class="mt-4 ms-5" href="../esqueceuSenha.html">Alterar senha</a>

                                                    </div>






                                                </div>


                                                <button class="btn btn-dark rounded-0">
                                                    Salvar
                                                </button>

                                            </form>

                                        </section>


                                    </div>


                                </article>




                            </section>
                        </div>
                    </div>
                </div>

                <div class="accordion mt-3" id="accordionPedidos">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button bg bg-light " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                Meus pedidos
                            </button>
                        </h2>

                        <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionPedidos">
                            <div class="accordion-body p-0 overflow-y-scroll">

                                <div class="card__pedido__container">

                          
                                        <?php

                                        $compras = $_SESSION["compras"];
                                        $valorTotalCompra = 0;
                                        

                                        if ($compras) {
                                            foreach ($compras as $compra) {
                                                $precoTotal = 0;
                                                echo "<div class='card__pedido'>";
                                                $quantidadeTotal = 0;
                                                echo "<div class='itens__wrapper text-dark'>";
                                            
                                            
                                                foreach ($compra['Produtos'] as $produto) {
                                                 
                                                    $quantidadeTotal += $produto['Quantidade'];
                                                    $precoTotal += $produto['PrecoTotal'];

                                                  
                                                    echo "<div class='itens__container'>";
                                                
                                                    echo "<div class='img__container'>";
                                                    echo "<img src='../assets/{$produto['ImagemProduto']}' alt='Imagem do produto {$produto['nomeProduto']}'>";
                                                    echo "</div>";
                                                
                                                    echo "<div class='tenis__card__body'>";
                                                
                                                    echo "<div class='d-flex justify-content-between gap-3'>";
                                                    echo "<p>{$produto['nomeProduto']}</p>";
                                                    echo "<p class='preco'>$ {$produto['PrecoTotal']}</p>";
                                                    echo "</div>";
                                                
                                                    echo "<div class='d-flex gap-3 justify-content-between'>";
                                                    echo "<p>S - {$produto['Tamanho']}</p>";
                                                    echo "<p>Uni - {$produto['Quantidade']}</p>";
                                                    echo "</div>";
                                                
                                                    echo "</div>";
                                                    echo "</div>";
                                                }
                                                
                                           

                                                echo "</div>";
                                               
                                                $ValorTotalCompra = $quantidadeTotal * $precoTotal;

                                                echo "<div class='dados__pedido__container'>";
                                                echo "<p>Total: <span>$$ValorTotalCompra</span></p>";
                                                echo "<div class='d-flex justify-content-between gap-3'>";
                                                echo "<p>Data de emissão: $compra[DataEmissao]</p>";
                                                echo "<p>Código da compra: $compra[CodigoPedido]</p>";
                                                echo "</div>";
                                                echo "</div>";

                                                echo "</div>";
                                            }
                                        } else {
                                            echo "<h2>Você ainda não realizou nenhuma compra</h2>";
                                        }


                                        ?>

                                  




                                </div>

                            </div>
                        </div>

                    </div>
                </div>


        </section>



    </section>




    <script type="module" src="../app/usuario/trocarDados.js"></script>
    <script type="module" src="../app/usuario/controlarFoto.js"></script>
    <script type="module" src="../app/usuario/controlarUsuario.js"></script>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <script>
        function enviarFormulario() {

            document.querySelector("#form-photo").submit();

        }
    </script>
</body>

</html>