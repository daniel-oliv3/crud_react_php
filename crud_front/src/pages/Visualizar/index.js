import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoProd
} from "./styles";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getProduto = async () => {
      await fetch("http://localhost/crud_back/visualizar.php?id=" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          setData(responseJson.produto);
        });
    };
    getProduto();
  }, [id]);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoProd>ID: {data.id}</ConteudoProd>
      <ConteudoProd>Título: {data.titulo}</ConteudoProd>
      <ConteudoProd>Descrição: {data.descricao}</ConteudoProd>
    </Container>
  );
};
