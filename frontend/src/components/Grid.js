import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from 'date-fns';

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

`;

const Grid = ({ devs, setDevs, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/developer/${id}`);
      const newArray = devs.filter((dev) => dev.id !== id);
      setDevs(newArray);
      toast.success("Desenvolvedor excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir desenvolvedor.");
      console.error('Erro ao excluir desenvolvedor:', error);
    } finally {
      setOnEdit(null);
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Position</Th>
          <Th>Nome</Th>
          <Th>Genero</Th>
          <Th>Nascimento</Th>
          <Th>Hobby</Th>
        </Tr>
      </Thead>
      <Tbody>
        {devs.map((dev, i) => (
          <Tr key={i}>
            <Td width="20%">{dev.position.position}</Td>
            <Td width="20%">{dev.name}</Td>
            <Td width="20%">{dev.gender}</Td>
            <Td width="20%">{format(new Date(dev.birthday), 'dd/MM/yyyy')}</Td>
            <Td width="20%">{dev.hobby}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(dev)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(dev.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
