
<?php

$hostname = '127.0.0.1';
$bancodados = 'sneakerhouse';
$usuario = 'root';
$senha = '';

$mysql = new mysqli($hostname, $usuario,$senha,$bancodados);

if($mysql->connect_errno){

    echo "Error: " . $mysql->connect_error;
}


?>