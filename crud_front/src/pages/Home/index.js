import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  Table,
  Titulo,
  ButtonPrimary,
  ButtonWarning,
  ButtonDanger,
  AlertSuccess,
  AlertDanger
} from "./styles";

export const Home = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const getProdutos = async () => {
    fetch("http://localhost/crud_back/index.php")
      .then((response) => response.json())
      .then((responseJson) =>
        //console.log(responseJson),
        setData(responseJson.records)
      );
  };

  const apagarProduto = async (idProduto) =>{
    //console.log(idProduto);
    await fetch("http://localhost/crud_back/apagar.php?id=" + idProduto)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.erro){
        setStatus({
          type: 'erro',
          mensagem: responseJson.mensagem
        });
      }else{
        setStatus({
          type: 'success',
          mensagem: responseJson.mensagem
        });
        getProdutos();
      }
    }).catch(() => {
      setStatus({
        type: 'erro',
        mensagem: "Erro: Produto não foi apagado, tente mais tarde!"
      });
    });
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
      {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.titulo}</td>
              <td>{produto.descricao}</td>
              <td>
                <Link to={"/visualizar/" + produto.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>{" "}
                <Link to={"/editar/" + produto.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>{" "}
                <ButtonDanger onClick={() => apagarProduto(produto.id)}>Apagar</ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
