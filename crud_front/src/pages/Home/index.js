import React, { useState, useEffect } from "react";

import { Table, Titulo } from './styles';

export const Home = () => {
  
  const [data, setData] = useState([]);
  
  const getProdutos = async () => {
    fetch("http://localhost/crud_back/index.php")
    .then((response) => response.json())
    .then((responseJson) => (
      //console.log(responseJson),
      setData(responseJson.records)
    ));
  }
  
  useEffect(() => {
    getProdutos();
  },[])
  
  
  
  return (
    <div>
      <Titulo>Listar</Titulo>
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
          {Object.values(data).map(produto => (
            <tr key={produto.id}>  
              <td>{produto.id}</td>
              <td>{produto.titulo}</td>
              <td>{produto.descricao}</td>
              <td>Visualizar Editor Apagar</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


