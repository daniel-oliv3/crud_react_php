<?php

//Cabeçalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");

//Incluir a conexão
include_once 'conexao.php';


$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query_produto = "INSERT INTO produtos (titulo, descricao) VALUES (:titulo, :descricao)";
    $cad_produto = $conn->prepare($query_produto);

    $cad_produto->bindParam(':titulo', $dados['produto']['titulo'], PDO::PARAM_STR);
    $cad_produto->bindParam(':descricao', $dados['produto']['descricao'], PDO::PARAM_STR);

    $cad_produto->execute();

    if($cad_produto->rowCount()){
        $response = [
            "erro" => false,
            "messagem" => "Produto cadastrado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => true,
            "messagem" => "Produto não foi cadastrado!"
        ];
    }

   
}else{
    $response = [
        "erro" => true,
        "messagem" => "Produto não foi cadastrado!"
    ];
}

http_response_code(200);
echo json_encode($response);

?>